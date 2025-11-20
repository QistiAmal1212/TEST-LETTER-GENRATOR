
import { GoogleGenAI, Type } from "@google/genai";
import { UserProfile, DocumentAnalysis } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const MODEL_NAME = "gemini-2.5-flash";

export const analyzeDocumentType = async (text: string): Promise<DocumentAnalysis> => {
  // Strip HTML tags for analysis to save tokens and reduce noise, or keep them if structure matters.
  // For safety, we'll just use the raw string, Gemini handles HTML fine.
  if (!text || text.length < 10) {
    return { type: "Unknown", sentiment: "neutral", suggestions: [] };
  }

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: `Analyze the following document. Identify the document type (e.g., Warning Letter, Resignation, Cover Letter), the sentiment, and provide 3 short suggestions to improve it.
      
      Document Content: "${text.substring(0, 2000)}..."`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            type: { type: Type.STRING },
            sentiment: { type: Type.STRING, enum: ["positive", "neutral", "negative", "warning"] },
            suggestions: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING } 
            }
          },
          required: ["type", "sentiment", "suggestions"]
        }
      }
    });

    const jsonText = response.text;
    if (!jsonText) throw new Error("No response from AI");
    return JSON.parse(jsonText) as DocumentAnalysis;
  } catch (error) {
    console.error("Error analyzing document:", error);
    return { type: "General Document", sentiment: "neutral", suggestions: ["Could not analyze document structure."] };
  }
};

export const autoFillTemplate = async (templateHtml: string, profile: UserProfile): Promise<string> => {
  try {
    const prompt = `
      You are an expert document editor. 
      I will provide a "User Profile" and a "Document" (in HTML format). 
      Your task is to fill in the placeholders in the document using the profile data. 
      
      Rules:
      1. Maintain the existing HTML structure, styles, classes, and formatting EXACTLY. Do not strip tags.
      2. Scan for placeholders (e.g., "[Name]", "__________", "{DATE}") or generic fields inside the HTML.
      3. Replace them with the corresponding data from the User Profile.
      4. If specific context is needed (e.g. for a warning letter body), use the "customNotes" from the profile.
      5. Return ONLY the updated HTML string. Do not include markdown code fences like \`\`\`html.

      User Profile:
      ${JSON.stringify(profile)}

      Document HTML:
      ${templateHtml}
    `;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
    });

    return response.text?.replace(/^```html|```$/g, '') || templateHtml;
  } catch (error) {
    console.error("Error auto-filling template:", error);
    return templateHtml;
  }
};

export const generateDraft = async (instruction: string, profile: UserProfile): Promise<string> => {
  try {
      const prompt = `
      Write a professional letter based on the following instruction: "${instruction}".
      Use the following user details to sign off or populate relevant fields:
      ${JSON.stringify(profile)}
      
      Format the output as clean, semantic HTML. 
      Use <p> for paragraphs, <b> for emphasis, and <br> for line breaks where appropriate.
      Do not include <html> or <body> tags, just the content suitable for a WYSIWYG editor.
      Return ONLY the HTML string.
      `;
      
      const response = await ai.models.generateContent({
          model: MODEL_NAME,
          contents: prompt
      });
      
      return response.text?.replace(/^```html|```$/g, '') || "";
  } catch (error) {
      console.error(error);
      return "<p>Error generating draft.</p>";
  }
};

export const convertAndFillPdf = async (pdfBase64: string, profile: UserProfile): Promise<string> => {
  try {
    const prompt = `
      You are a pixel-perfect Document Reconstruction Expert.
      Your task is to convert the attached PDF/Image into editable HTML/CSS that replicates the original look 100%.
      
      VISUAL RECONSTRUCTION RULES:
      1. **Layout with Tables**: Use HTML TABLES (<table width="100%">) to structure the document. This is CRITICAL for multi-column layouts (e.g., address on left, logo on right). Do not use complex floats.
      2. **Typography Matching**: Detect the font family. If it looks traditional, use 'font-family: serif' (Times New Roman). If modern, use 'font-family: sans-serif' (Arial). Match font weights (bold headers).
      3. **Spacing fidelity**: Use CSS 'padding' and 'line-height' to match the vertical rhythm of the document.
      4. **Signatures/Borders**: If there are underline fields (e.g. "Signature: _____________"), create them using border-bottom CSS styles, not just underscores.
      5. **No Images**: Do not try to link to external images. Recreate lines and boxes using CSS borders.
      
      DATA AUTO-FILL RULES:
      1. Simultaneously identifying placeholder fields (e.g. "[Candidate Name]", "Date: ....") and filling them with the provided User Profile data.
      2. If the document requires a body paragraph based on context (e.g. a specific warning reason), write it using the 'customNotes' provided, matching the surrounding font style.
      
      OUTPUT:
      - Return ONLY valid HTML code.
      - Inline CSS is required for all styling.
      - No Markdown. No \`\`\`html blocks.
      - The content should be wrapped in a single root <div>.

      User Profile Data:
      ${JSON.stringify(profile)}
    `;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: {
        parts: [
            {
                inlineData: {
                    mimeType: 'application/pdf',
                    data: pdfBase64
                }
            },
            {
                text: prompt
            }
        ]
      }
    });

    return response.text?.replace(/^```html|```$/g, '') || "Could not process PDF.";
  } catch (error) {
    console.error("Error processing PDF:", error);
    return "<p>Error converting PDF. Please try again.</p>";
  }
};
