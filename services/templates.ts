
export const TEMPLATES = {
  OFFER_LETTER: `
    <div style="font-family: 'Helvetica', sans-serif; color: #333;">
      <table width="100%" style="border-bottom: 2px solid #2563eb; padding-bottom: 20px; margin-bottom: 30px;">
        <tr>
          <td valign="bottom">
            <h1 style="margin: 0; font-size: 28px; color: #1e293b; text-transform: uppercase; letter-spacing: 1px;">Offer of Employment</h1>
          </td>
          <td align="right" valign="bottom">
            <p style="margin: 0; font-weight: bold; font-size: 18px;">[Company Name]</p>
            <p style="margin: 5px 0 0; font-size: 12px; color: #64748b;">Strictly Private & Confidential</p>
          </td>
        </tr>
      </table>

      <p style="margin-bottom: 20px;"><strong>Date:</strong> [Date]</p>
      
      <p><strong>To:</strong><br>
      [Recipient Name]<br>
      [Recipient Address, optional]</p>

      <p style="margin-top: 30px;">Dear <strong>[Recipient Name]</strong>,</p>

      <p>We are pleased to offer you the position of <strong>[Position]</strong> at <strong>[Company Name]</strong>. We believe your skills and experience are an excellent match for our company.</p>

      <h3 style="background-color: #f1f5f9; padding: 8px; border-left: 4px solid #2563eb; margin-top: 30px;">Position Details</h3>
      
      <table width="100%" style="border-collapse: collapse; margin-top: 10px; margin-bottom: 20px;">
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold; width: 150px;">Start Date:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">[Start Date]</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Reporting To:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">[Manager Name/Title]</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Employment Type:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">Full-Time</td>
        </tr>
      </table>

      <h3 style="background-color: #f1f5f9; padding: 8px; border-left: 4px solid #2563eb; margin-top: 30px;">Compensation Package</h3>

      <table width="100%" border="1" bordercolor="#e2e8f0" style="border-collapse: collapse; margin-top: 10px;">
        <tr style="background-color: #f8fafc;">
          <th align="left" style="padding: 10px;">Component</th>
          <th align="left" style="padding: 10px;">Details</th>
        </tr>
        <tr>
          <td style="padding: 10px;"><strong>Annual Base Salary</strong></td>
          <td style="padding: 10px;">$[Amount] per annum</td>
        </tr>
        <tr>
          <td style="padding: 10px;"><strong>Performance Bonus</strong></td>
          <td style="padding: 10px;">Up to [Percentage]% of base salary</td>
        </tr>
        <tr>
          <td style="padding: 10px;"><strong>Benefits</strong></td>
          <td style="padding: 10px;">Health, Dental, Vision, 401(k)</td>
        </tr>
      </table>

      <p style="margin-top: 30px;">By signing below, you accept this offer of employment.</p>

      <table width="100%" style="margin-top: 60px;">
        <tr>
          <td width="45%">
            <div style="border-bottom: 1px solid #000; margin-bottom: 5px;"></div>
            <p style="margin: 0; font-size: 12px; color: #666;">[Recipient Name] (Signature)</p>
          </td>
          <td width="10%"></td>
          <td width="45%">
            <div style="border-bottom: 1px solid #000; margin-bottom: 5px;"></div>
            <p style="margin: 0; font-size: 12px; color: #666;">Date</p>
          </td>
        </tr>
      </table>
    </div>
  `,
  WARNING_LETTER: `
    <div style="font-family: 'Times New Roman', serif; color: #000; line-height: 1.5;">
      <div style="text-align: center; margin-bottom: 40px;">
        <h1 style="margin: 0; text-decoration: underline;">OFFICIAL EMPLOYEE WARNING NOTICE</h1>
        <p style="margin: 5px 0 0; font-style: italic;">Confidential Personnel Document</p>
      </div>

      <table width="100%" style="border: 1px solid #000; border-collapse: collapse; margin-bottom: 20px;">
        <tr>
          <td style="padding: 8px; border: 1px solid #000; background: #eee; width: 150px;"><strong>Employee Name:</strong></td>
          <td style="padding: 8px; border: 1px solid #000;">[Recipient Name]</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #000; background: #eee;"><strong>Job Title:</strong></td>
          <td style="padding: 8px; border: 1px solid #000;">[Recipient Title]</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #000; background: #eee;"><strong>Date of Warning:</strong></td>
          <td style="padding: 8px; border: 1px solid #000;">[Date]</td>
        </tr>
      </table>

      <p><strong>Type of Violation (Check all that apply):</strong></p>
      <table width="100%" style="margin-bottom: 20px;">
        <tr>
          <td>[ ] Attendance</td>
          <td>[ ] Insubordination</td>
          <td>[ ] Performance</td>
        </tr>
        <tr>
          <td>[ ] Safety Violation</td>
          <td>[ ] Policy Violation</td>
          <td>[ ] Misconduct</td>
        </tr>
      </table>

      <div style="border: 1px solid #000; padding: 15px; margin-bottom: 20px;">
        <p style="margin-top: 0; font-weight: bold; text-decoration: underline;">Description of Incident / Performance Issue:</p>
        <p>[Custom Notes]</p>
        <br><br>
      </div>

      <div style="border: 1px solid #000; padding: 15px; margin-bottom: 20px;">
        <p style="margin-top: 0; font-weight: bold; text-decoration: underline;">Corrective Action Plan / Requirements:</p>
        <p>The employee is expected to make immediate improvements in the areas listed above. Failure to improve may result in further disciplinary action, up to and including termination.</p>
        <ul style="margin-bottom: 0;">
          <li>Immediate improvement in attendance/performance.</li>
          <li>Adherence to all company policies provided in the handbook.</li>
        </ul>
      </div>

      <table width="100%" style="margin-top: 50px;">
        <tr>
          <td width="40%" valign="top">
            <div style="border-bottom: 1px solid #000; height: 30px;"></div>
            <p style="font-size: 12px;">Manager Signature</p>
          </td>
          <td width="10%"></td>
          <td width="40%" valign="top">
            <div style="border-bottom: 1px solid #000; height: 30px;"></div>
            <p style="font-size: 12px;">Employee Signature (Acknowledgment)</p>
          </td>
        </tr>
      </table>
      <p style="font-size: 10px; margin-top: 5px;">*Employee signature indicates receipt of this notice, not necessarily agreement.</p>
    </div>
  `,
  PIP: `
    <div style="font-family: sans-serif; color: #1f2937;">
      <table width="100%" style="background-color: #f3f4f6; padding: 20px; margin-bottom: 30px;">
        <tr>
          <td>
            <h1 style="margin: 0; color: #dc2626;">Performance Improvement Plan (PIP)</h1>
            <p style="margin: 5px 0 0; color: #6b7280;">Private & Confidential</p>
          </td>
        </tr>
      </table>

      <table width="100%" style="border-collapse: collapse; margin-bottom: 30px;">
        <tr>
          <td width="20%" style="padding: 10px; font-weight: bold; color: #4b5563;">Employee:</td>
          <td width="30%" style="padding: 10px; border-bottom: 1px solid #e5e7eb;">[Recipient Name]</td>
          <td width="20%" style="padding: 10px; font-weight: bold; color: #4b5563;">Review Period:</td>
          <td width="30%" style="padding: 10px; border-bottom: 1px solid #e5e7eb;">30 / 60 / 90 Days</td>
        </tr>
        <tr>
          <td style="padding: 10px; font-weight: bold; color: #4b5563;">Manager:</td>
          <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">[Your Name]</td>
          <td style="padding: 10px; font-weight: bold; color: #4b5563;">Date Issued:</td>
          <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">[Date]</td>
        </tr>
      </table>

      <p>The purpose of this Performance Improvement Plan (PIP) is to define serious areas of concern, gaps in your work performance, reiterate [Company Name]’s expectations, and allow you the opportunity to demonstrate improvement and commitment.</p>

      <h3 style="color: #111827; border-bottom: 2px solid #e5e7eb; padding-bottom: 5px; margin-top: 30px;">1. Areas of Concern</h3>
      <p>[Custom Notes]</p>

      <h3 style="color: #111827; border-bottom: 2px solid #e5e7eb; padding-bottom: 5px; margin-top: 30px;">2. Improvement Goals</h3>
      <table width="100%" border="1" bordercolor="#d1d5db" style="border-collapse: collapse; margin-top: 10px;">
        <tr style="background-color: #e5e7eb;">
          <th width="30%" style="padding: 12px; text-align: left;">Performance Goal</th>
          <th width="40%" style="padding: 12px; text-align: left;">Action Items / Support</th>
          <th width="30%" style="padding: 12px; text-align: left;">Expected Outcome</th>
        </tr>
        <tr>
          <td style="padding: 12px; vertical-align: top;">Improve Attendance</td>
          <td style="padding: 12px; vertical-align: top;">Arrive by 9:00 AM daily.</td>
          <td style="padding: 12px; vertical-align: top;">0 unexcused absences.</td>
        </tr>
        <tr>
          <td style="padding: 12px; vertical-align: top;">Project Delivery</td>
          <td style="padding: 12px; vertical-align: top;">Daily check-ins with manager.</td>
          <td style="padding: 12px; vertical-align: top;">Meet all deadlines.</td>
        </tr>
      </table>

      <h3 style="color: #111827; border-bottom: 2px solid #e5e7eb; padding-bottom: 5px; margin-top: 30px;">3. Acknowledgment</h3>
      <p>I understand that failure to meet the expectations outlined in this plan by the end of the review period may result in further disciplinary action, including termination of employment.</p>

      <table width="100%" style="margin-top: 60px;">
        <tr>
          <td width="45%">
             <div style="border-bottom: 1px solid #000; margin-bottom: 5px;"></div>
             <p style="font-size: 14px;">Employee Signature</p>
          </td>
          <td width="10%"></td>
          <td width="45%">
             <div style="border-bottom: 1px solid #000; margin-bottom: 5px;"></div>
             <p style="font-size: 14px;">Manager Signature</p>
          </td>
        </tr>
      </table>
    </div>
  `,
  RESIGNATION: `
    <div style="font-family: 'Georgia', serif; color: #111; line-height: 1.8;">
      <p style="text-align: right;">[Date]</p>
      
      <p style="margin-top: 40px;">
        <strong>[Manager Name]</strong><br>
        [Recipient Title]<br>
        [Company Name]
      </p>

      <p style="margin-top: 40px;">Dear [Manager Name],</p>

      <p>Please accept this letter as formal notification that I am resigning from my position as <strong>[Position]</strong> at <strong>[Company Name]</strong>. My last day will be <strong>[Date + 2 weeks]</strong>.</p>

      <p>I would like to thank you for the opportunity to have worked in this position for the past [Number] years. I have learned a great deal during my time here and have enjoyed working with my colleagues.</p>

      <p>[Custom Notes]</p>

      <p>I will do everything possible to wrap up my duties and train other team members over the next two weeks to ensure a smooth transition.</p>

      <p style="margin-top: 40px;">Sincerely,</p>

      <br>
      
      <p><strong>[Your Name]</strong></p>
    </div>
  `
};

export const getTemplateList = () => [
  { id: 'OFFER_LETTER', name: 'Offer Letter', description: 'Formal job offer with salary table', icon: 'briefcase' },
  { id: 'WARNING_LETTER', name: 'Warning Notice', description: 'Disciplinary action form', icon: 'alert' },
  { id: 'PIP', name: 'Performance Plan', description: 'Improvement goals and timeline', icon: 'trending' },
  { id: 'RESIGNATION', name: 'Resignation', description: 'Standard resignation letter', icon: 'file' },
];
