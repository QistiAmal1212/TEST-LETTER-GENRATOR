
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { UserProfile, DocumentAnalysis } from './types';
import Sidebar from './components/Sidebar';
import Editor from './components/Editor';
import { IconFileText, IconDownload, IconPrinter, IconGrid, IconBriefcase, IconAlert, IconTrendingUp, IconSparkles } from './components/Icons';
import { analyzeDocumentType, autoFillTemplate, generateDraft } from './services/ai';
import { TEMPLATES, getTemplateList } from './services/templates';

const INITIAL_PROFILE: UserProfile = {
  fullName: "Alex Johnson",
  position: "Senior Manager",
  companyName: "Acme Corp",
  email: "alex.j@acme.com",
  phone: "(555) 123-4567",
  recipientName: "Sarah Connor",
  recipientTitle: "Software Engineer",
  recipientCompany: "Acme Corp",
  customNotes: "Excessive absenteeism. 3 days missed without notice."
};

// Blank initial content or a placeholder
const INITIAL_CONTENT = `<div style="font-family: sans-serif; color: #9ca3af; text-align: center; margin-top: 100px;">
<p style="font-size: 24px; margin-bottom: 10px;">Welcome to LetterFlow</p>
<p>Select a template from the gallery to get started.</p>
</div>`;

const App: React.FC = () => {
  const [content, setContent] = useState<string>(INITIAL_CONTENT);
  const [userProfile, setUserProfile] = useState<UserProfile>(INITIAL_PROFILE);
  const [isProcessing, setIsProcessing] = useState(false);
  const [analysis, setAnalysis] = useState<DocumentAnalysis | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(true); // Open by default
  
  // Handle profile updates
  const handleProfileChange = (key: keyof UserProfile, value: string) => {
    setUserProfile(prev => ({ ...prev, [key]: value }));
  };

  // Analyze content for type detection
  const performAnalysis = useCallback(async (text: string) => {
    if (text.length > 50) {
        const result = await analyzeDocumentType(text);
        setAnalysis(result);
    }
  }, []);

  // Handle Auto Fill
  const handleAutoFill = async () => {
    setIsProcessing(true);
    const filled = await autoFillTemplate(content, userProfile);
    setContent(filled);
    setIsProcessing(false);
  };
  
  // Handle Generate New Draft
  const handleGenerate = async () => {
      if (!userProfile.customNotes) {
          alert("Please add some notes in 'Smart Context' so I know what to write about!");
          return;
      }
      setIsProcessing(true);
      const draftHtml = await generateDraft(userProfile.customNotes, userProfile);
      setContent(draftHtml);
      
      const plainText = draftHtml.replace(/<[^>]*>?/gm, '');
      performAnalysis(plainText);
      
      setIsProcessing(false);
  }

  const handleSelectTemplate = async (templateId: string) => {
    setIsTemplateModalOpen(false);
    
    const templateHtml = TEMPLATES[templateId as keyof typeof TEMPLATES];
    if (!templateHtml) return;

    // Set raw template first
    setContent(templateHtml);
    
    // Auto-fill immediately for better UX
    setIsProcessing(true);
    try {
       // Small delay to let UI update
       await new Promise(resolve => setTimeout(resolve, 100));
       const filledHtml = await autoFillTemplate(templateHtml, userProfile);
       setContent(filledHtml);
       
       const plainText = filledHtml.replace(/<[^>]*>?/gm, '');
       performAnalysis(plainText);
    } catch(e) {
       console.error("Auto-fill on load failed", e);
    } finally {
       setIsProcessing(false);
    }
  };
  
  const handlePrint = () => {
      window.print();
  }

  const handleDownload = () => {
      const element = document.createElement("a");
      const fullHtml = `
        <html>
        <head><title>Document</title></head>
        <body style="font-family: sans-serif; width: 210mm; margin: 0 auto;">
          ${content}
        </body>
        </html>
      `;
      const file = new Blob([fullHtml], {type: 'text/html'});
      element.href = URL.createObjectURL(file);
      element.download = "letterflow_doc.html";
      document.body.appendChild(element);
      element.click();
  }

  const templateList = getTemplateList();

  return (
    <div className="flex flex-col h-screen overflow-hidden font-sans text-gray-900">
      
      {/* Template Gallery Modal */}
      {isTemplateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
             <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Select a Template</h2>
                  <p className="text-gray-500 mt-1">Choose a professional layout to get started. AI will auto-fill your data.</p>
                </div>
                <button onClick={() => setIsTemplateModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                  <span className="text-2xl">&times;</span>
                </button>
             </div>
             
             <div className="p-8 overflow-y-auto bg-gray-50/50">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                   {templateList.map((t) => (
                     <button 
                       key={t.id} 
                       onClick={() => handleSelectTemplate(t.id)}
                       className="group flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg hover:border-indigo-500 transition-all duration-200 text-left"
                     >
                        <div className="h-32 bg-gray-100 flex items-center justify-center group-hover:bg-indigo-50 transition-colors">
                           {t.icon === 'briefcase' && <IconBriefcase className="w-10 h-10 text-gray-400 group-hover:text-indigo-600" />}
                           {t.icon === 'alert' && <IconAlert className="w-10 h-10 text-gray-400 group-hover:text-indigo-600" />}
                           {t.icon === 'trending' && <IconTrendingUp className="w-10 h-10 text-gray-400 group-hover:text-indigo-600" />}
                           {t.icon === 'file' && <IconFileText className="w-10 h-10 text-gray-400 group-hover:text-indigo-600" />}
                        </div>
                        <div className="p-4">
                           <h3 className="font-bold text-gray-800">{t.name}</h3>
                           <p className="text-sm text-gray-500 mt-1">{t.description}</p>
                        </div>
                     </button>
                   ))}
                </div>
             </div>
             
             <div className="p-4 bg-white border-t border-gray-100 text-center text-sm text-gray-500">
                Don't see what you need? <button onClick={() => { setIsTemplateModalOpen(false); handleGenerate(); }} className="text-indigo-600 font-medium hover:underline">Generate from scratch</button>
             </div>
          </div>
        </div>
      )}

      {/* Header / Toolbar */}
      <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 z-30 shadow-sm flex-shrink-0 relative">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 p-2 rounded-lg text-white">
            <IconFileText className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-lg tracking-tight text-gray-800">LetterFlow</h1>
            <span className="text-xs text-gray-500 font-medium">AI-Powered Document Builder</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 mr-4 hidden md:inline-block">
                {isProcessing ? 'AI Processing...' : 'Changes saved locally'}
            </span>
            
            <button 
              onClick={() => setIsTemplateModalOpen(true)}
              className="flex items-center gap-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-sm font-medium py-2 px-3 rounded-md transition-colors mr-2"
            >
                <IconGrid className="w-4 h-4" />
                <span className="hidden sm:inline">Templates</span>
            </button>

            <div className="h-6 w-px bg-gray-300 mx-2 hidden sm:block"></div>

            <button onClick={handleDownload} className="p-2 hover:bg-gray-100 rounded-md text-gray-600 transition-colors" title="Download HTML">
                <IconDownload className="w-5 h-5" />
            </button>
            <button onClick={handlePrint} className="p-2 hover:bg-gray-100 rounded-md text-gray-600 transition-colors" title="Print / Save PDF">
                <IconPrinter className="w-5 h-5" />
            </button>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex flex-1 overflow-hidden relative">
        
        {/* Sidebar (Left) */}
        <Sidebar 
          userProfile={userProfile} 
          onProfileChange={handleProfileChange} 
          onAutoFill={handleAutoFill}
          analysis={analysis}
          isProcessing={isProcessing}
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        {/* Editor Area (Center/Right) */}
        <main 
            className="flex-1 bg-gray-100 relative flex flex-col overflow-hidden"
        >
           <Editor 
             content={content} 
             onChange={setContent} 
             isProcessing={isProcessing}
           />
        </main>
      </div>
    </div>
  );
};

export default App;
