
import React, { useEffect, useRef, useState } from 'react';
import { IconBold, IconItalic, IconUnderline, IconAlignLeft, IconAlignCenter, IconAlignRight, IconZoomIn, IconZoomOut } from './Icons';

interface EditorProps {
  content: string;
  onChange: (content: string) => void;
  isProcessing: boolean;
}

const Editor: React.FC<EditorProps> = ({ content, onChange, isProcessing }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const isInternalChange = useRef(false);
  const [zoomLevel, setZoomLevel] = useState(100);

  // Sync content from prop to editable div when it changes externally
  useEffect(() => {
    if (editorRef.current && content !== editorRef.current.innerHTML && !isInternalChange.current) {
      editorRef.current.innerHTML = content;
    }
    isInternalChange.current = false;
  }, [content]);

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    isInternalChange.current = true;
    onChange(e.currentTarget.innerHTML);
  };

  const execCmd = (command: string, value: string | undefined = undefined) => {
    document.execCommand(command, false, value);
    // Ensure focus remains on editor after click
    if (editorRef.current) {
        editorRef.current.focus();
    }
  };

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 10, 150));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 10, 50));

  const ToolbarButton = ({ onClick, icon: Icon, label }: { onClick: () => void, icon: any, label: string }) => (
      <button 
        onMouseDown={(e) => { e.preventDefault(); onClick(); }} // preventDefault keeps focus in editor
        className="p-1.5 text-gray-600 hover:text-indigo-600 hover:bg-gray-100 rounded transition-colors"
        title={label}
      >
          <Icon className="w-4 h-4" />
      </button>
  );

  return (
    <div className="flex flex-col w-full h-full bg-gray-100 relative">
      
      {/* Editor Toolbar - Floating or Fixed Top */}
      <div className="h-12 bg-white border-b border-gray-200 flex items-center justify-between px-4 shadow-sm z-20 flex-shrink-0">
         <div className="flex items-center gap-1 border-r border-gray-200 pr-3 mr-3">
             <ToolbarButton onClick={() => execCmd('bold')} icon={IconBold} label="Bold" />
             <ToolbarButton onClick={() => execCmd('italic')} icon={IconItalic} label="Italic" />
             <ToolbarButton onClick={() => execCmd('underline')} icon={IconUnderline} label="Underline" />
         </div>
         
         <div className="flex items-center gap-1 border-r border-gray-200 pr-3 mr-3">
             <ToolbarButton onClick={() => execCmd('justifyLeft')} icon={IconAlignLeft} label="Align Left" />
             <ToolbarButton onClick={() => execCmd('justifyCenter')} icon={IconAlignCenter} label="Align Center" />
             <ToolbarButton onClick={() => execCmd('justifyRight')} icon={IconAlignRight} label="Align Right" />
         </div>

         <div className="flex items-center gap-2">
            <button onClick={handleZoomOut} className="p-1 hover:bg-gray-100 rounded"><IconZoomOut className="w-4 h-4 text-gray-500" /></button>
            <span className="text-xs font-medium w-10 text-center text-gray-600">{zoomLevel}%</span>
            <button onClick={handleZoomIn} className="p-1 hover:bg-gray-100 rounded"><IconZoomIn className="w-4 h-4 text-gray-500" /></button>
         </div>
      </div>

      {/* Scrollable Canvas */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar p-8 flex flex-col items-center bg-gray-100/50">
        {/* A4 Paper Representation */}
        <div 
          className={`
            bg-white paper-shadow rounded-sm 
            transition-transform duration-200 ease-out origin-top
            relative
          `}
          style={{
              width: '210mm',
              minHeight: '297mm',
              transform: `scale(${zoomLevel / 100})`,
              marginBottom: '100px' // Extra space for scroll
          }}
        >
            {isProcessing && (
            <div className="absolute inset-0 flex items-center justify-center z-10 bg-white/80 backdrop-blur-[2px] transition-all">
                <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
                    <p className="text-indigo-900 font-medium animate-pulse">AI is working...</p>
                </div>
            </div>
            )}
            
            <div
                ref={editorRef}
                contentEditable
                suppressContentEditableWarning
                onInput={handleInput}
                className="w-full h-full outline-none p-[25mm] font-serif text-gray-800 text-lg leading-relaxed empty:before:content-[attr(placeholder)]"
                role="textbox"
                aria-multiline="true"
                data-placeholder="Start typing or drag and drop a template here..."
                style={{ minHeight: '297mm' }}
            />
        </div>
        
        <div className="mt-4 text-gray-400 text-xs">
            Page 1 of 1
        </div>
      </div>
    </div>
  );
};

export default Editor;
