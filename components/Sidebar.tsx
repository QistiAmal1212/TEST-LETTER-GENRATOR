
import React from 'react';
import { UserProfile, DocumentAnalysis } from '../types';
import { IconAlert, IconSparkles, IconChevronLeft, IconChevronRight } from './Icons';

interface SidebarProps {
  userProfile: UserProfile;
  onProfileChange: (key: keyof UserProfile, value: string) => void;
  onAutoFill: () => void;
  analysis: DocumentAnalysis | null;
  isProcessing: boolean;
  isOpen: boolean;
  onToggle: () => void;
}

const InputGroup = ({ label, value, onChange, placeholder }: { label: string, value: string, onChange: (v: string) => void, placeholder?: string }) => (
  <div className="mb-3">
    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">{label}</label>
    <input 
      type="text" 
      value={value} 
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-700 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
    />
  </div>
);

const Sidebar: React.FC<SidebarProps> = ({ userProfile, onProfileChange, onAutoFill, analysis, isProcessing, isOpen, onToggle }) => {
  
  if (!isOpen) {
      return (
          <div className="w-12 bg-white border-l border-gray-200 h-full flex flex-col items-center py-4 shadow-md z-20 transition-all">
              <button onClick={onToggle} className="p-2 rounded-md hover:bg-gray-100 text-gray-500 mb-4" title="Expand Sidebar">
                  <IconChevronLeft className="w-5 h-5" />
              </button>
              <div className="writing-vertical-rl transform rotate-180 text-gray-400 font-bold tracking-widest text-xs mt-4 uppercase">
                  AI Tools
              </div>
          </div>
      )
  }

  return (
    <div className="w-96 bg-white border-l border-gray-200 h-full flex flex-col shadow-xl z-20 transition-all">
      <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-white flex items-center justify-between">
        <div>
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <IconSparkles className="text-indigo-600 w-5 h-5" />
            AI Assistant
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">Manage your data & templates</p>
        </div>
        <button onClick={onToggle} className="p-1.5 rounded-md hover:bg-white hover:shadow-sm text-gray-500">
            <IconChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-5">
        {/* Document Analysis Widget */}
        {analysis && (
           <div className={`mb-6 p-4 rounded-lg border ${
             analysis.sentiment === 'warning' || analysis.sentiment === 'negative' ? 'bg-red-50 border-red-100' : 'bg-green-50 border-green-100'
           }`}>
            <div className="flex items-start gap-3">
              <div className={`mt-1 p-1 rounded-full ${
                 analysis.sentiment === 'warning' ? 'bg-red-200 text-red-700' : 'bg-green-200 text-green-700'
              }`}>
                <IconAlert className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-800">{analysis.type} Detected</h3>
                <p className="text-xs text-gray-600 mt-1 capitalize">Tone: {analysis.sentiment}</p>
                {analysis.suggestions.length > 0 && (
                  <ul className="mt-2 space-y-1">
                    {analysis.suggestions.map((s, i) => (
                      <li key={i} className="text-xs text-gray-600 list-disc list-inside">{s}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
           </div>
        )}

        {/* Sender Info */}
        <div className="mb-6">
          <h3 className="text-sm font-bold text-gray-800 mb-3">Your Information</h3>
          <InputGroup label="Full Name" value={userProfile.fullName} onChange={(v) => onProfileChange('fullName', v)} />
          <InputGroup label="Position" value={userProfile.position} onChange={(v) => onProfileChange('position', v)} />
          <InputGroup label="Company" value={userProfile.companyName} onChange={(v) => onProfileChange('companyName', v)} />
          <div className="grid grid-cols-2 gap-2">
            <InputGroup label="Email" value={userProfile.email} onChange={(v) => onProfileChange('email', v)} />
            <InputGroup label="Phone" value={userProfile.phone} onChange={(v) => onProfileChange('phone', v)} />
          </div>
        </div>

        {/* Recipient Info */}
        <div className="mb-6">
          <h3 className="text-sm font-bold text-gray-800 mb-3">Recipient Details</h3>
          <InputGroup label="Name" value={userProfile.recipientName} onChange={(v) => onProfileChange('recipientName', v)} />
          <InputGroup label="Title" value={userProfile.recipientTitle} onChange={(v) => onProfileChange('recipientTitle', v)} />
          <InputGroup label="Company" value={userProfile.recipientCompany} onChange={(v) => onProfileChange('recipientCompany', v)} />
        </div>

        {/* Context */}
        <div className="mb-6">
           <h3 className="text-sm font-bold text-gray-800 mb-3">Smart Context</h3>
           <div className="mb-3">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Additional Notes / Reason</label>
            <textarea 
              value={userProfile.customNotes} 
              onChange={(e) => onProfileChange('customNotes', e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-700 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors h-24 resize-none"
              placeholder="e.g. Late payment for Invoice #302, First warning for attendance..."
            />
          </div>
        </div>
      </div>

      <div className="p-5 border-t border-gray-200 bg-gray-50">
        <button 
          onClick={onAutoFill}
          disabled={isProcessing}
          className={`w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-4 rounded-lg shadow-sm transition-all
            ${isProcessing ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-md'}
          `}
        >
          <IconSparkles className="w-4 h-4" />
          {isProcessing ? 'Processing...' : 'Auto-Fill Document'}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
