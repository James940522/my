'use client';

import { useState } from 'react';

type TabType = 'code' | 'output';

interface CodeViewerProps {
  code: string;
  language: string;
  children: React.ReactNode;
  filename?: string;
}

export const CodeViewer = ({ code, language, children, filename }: CodeViewerProps) => {
  const [activeTab, setActiveTab] = useState<TabType>('output');

  return (
    <div className="border rounded-lg overflow-hidden shadow-md mb-8 bg-white dark:bg-gray-800">
      {/* 탭 헤더 */}
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'code'
              ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-b-2 border-blue-500'
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
          }`}
          onClick={() => setActiveTab('code')}
        >
          코드
          {filename && <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">{filename}</span>}
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'output'
              ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-b-2 border-blue-500'
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
          }`}
          onClick={() => setActiveTab('output')}
        >
          결과
        </button>
      </div>
      
      {/* 코드 뷰 */}
      {activeTab === 'code' && (
        <div className="p-4 bg-gray-50 dark:bg-gray-900 font-mono text-sm overflow-auto">
          <pre className="whitespace-pre-wrap break-words">
            <code className={`language-${language}`}>{code}</code>
          </pre>
        </div>
      )}
      
      {/* 결과 뷰 */}
      {activeTab === 'output' && (
        <div className="p-4">{children}</div>
      )}
    </div>
  );
}; 