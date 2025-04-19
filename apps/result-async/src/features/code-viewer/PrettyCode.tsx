'use client';

import { useState, useEffect, useRef } from 'react';

interface PrettyCodeProps {
  code: string;
  language: string;
  fileName?: string;
  lineNumbers?: boolean;
  showCopyButton?: boolean;
  highlightLines?: number[];
}

export const PrettyCode = ({
  code,
  language,
  fileName,
  lineNumbers = false,
  showCopyButton = true,
  highlightLines = [],
}: PrettyCodeProps) => {
  const [copied, setCopied] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  // 다크모드 감지
  useEffect(() => {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(isDark);

    const darkModeListener = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
    };

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', darkModeListener);

    return () => {
      mediaQuery.removeEventListener('change', darkModeListener);
    };
  }, []);

  // 코드 복사 기능
  const copyToClipboard = async () => {
    if (navigator.clipboard && code) {
      try {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('클립보드 복사 실패:', err);
      }
    }
  };

  // 간단한 구문 강조를 위한 토큰화 함수
  const tokenize = (code: string, language: string) => {
    const lines = code.split('\n');
    
    return lines.map((line, lineIndex) => {
      // 기본적인 구문 강조 패턴
      let tokens = [];
      let remaining = line;
      
      // 주석 강조
      if (remaining.includes('//')) {
        const parts = remaining.split('//');
        if (parts[0]) {
          tokens.push({ type: 'normal', content: parts[0] });
        }
        tokens.push({ type: 'comment', content: '//' + parts.slice(1).join('//') });
        remaining = '';
      } else if (remaining.includes('/*') && remaining.includes('*/')) {
        const start = remaining.indexOf('/*');
        const end = remaining.indexOf('*/') + 2;
        
        if (start > 0) {
          tokens.push({ type: 'normal', content: remaining.substring(0, start) });
        }
        
        tokens.push({ type: 'comment', content: remaining.substring(start, end) });
        
        if (end < remaining.length) {
          tokens.push({ type: 'normal', content: remaining.substring(end) });
        }
        
        remaining = '';
      }
      
      // 남은 텍스트에 대한 간단한 강조
      if (remaining) {
        // 문자열 강조
        const stringRegex = /(["'`])(.*?)\1/g;
        const keywordRegex = /\b(const|let|var|function|return|import|export|from|class|interface|type|extends|implements|new|this|if|else|for|while|switch|case|break|continue|try|catch|throw|async|await)\b/g;
        const numberRegex = /\b\d+\b/g;
        
        let match;
        let lastIndex = 0;
        const tempTokens = [];
        
        // 문자열 찾기
        while ((match = stringRegex.exec(remaining)) !== null) {
          if (match.index > lastIndex) {
            tempTokens.push({ 
              type: 'normal', 
              content: remaining.substring(lastIndex, match.index) 
            });
          }
          
          tempTokens.push({ type: 'string', content: match[0] });
          lastIndex = match.index + match[0].length;
        }
        
        if (lastIndex < remaining.length) {
          tempTokens.push({ 
            type: 'normal', 
            content: remaining.substring(lastIndex) 
          });
        }
        
        // 나머지 토큰화가 없는 경우 원래 텍스트 추가
        if (tempTokens.length === 0) {
          tempTokens.push({ type: 'normal', content: remaining });
        }
        
        // 키워드와 숫자 강조
        tokens = tempTokens.map(token => {
          if (token.type === 'normal') {
            const content = token.content
              .replace(keywordRegex, match => `<span class="text-blue-600 dark:text-blue-400">${match}</span>`)
              .replace(numberRegex, match => `<span class="text-amber-600 dark:text-amber-400">${match}</span>`);
            
            return { ...token, content };
          }
          return token;
        });
      }
      
      const isHighlighted = highlightLines.includes(lineIndex + 1);
      
      return {
        tokens,
        isHighlighted,
        lineNumber: lineIndex + 1
      };
    });
  };

  const tokenizedLines = tokenize(code, language);

  return (
    <div className="relative group">
      {/* 파일명이 있는 경우 헤더 표시 */}
      {fileName && (
        <div className="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-gray-800 border-b dark:border-gray-700">
          <div className="text-sm font-medium text-gray-600 dark:text-gray-300">{fileName}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">{language}</div>
        </div>
      )}
      
      {/* 코드 복사 버튼 */}
      {showCopyButton && (
        <button
          onClick={copyToClipboard}
          className="absolute top-2 right-2 p-1.5 rounded-md bg-white/10 border border-gray-200 dark:border-gray-700 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-opacity opacity-0 group-hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          title="코드 복사"
          aria-label="코드 복사"
        >
          {copied ? (
            <svg className="h-4 w-4 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          ) : (
            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
          )}
        </button>
      )}
      
      {/* 코드 블록 */}
      <pre
        ref={preRef}
        className={`p-4 overflow-auto text-sm font-mono ${
          isDarkMode ? 'text-gray-200 bg-gray-900' : 'text-gray-800 bg-gray-50'
        }`}
      >
        <code className={`language-${language}`}>
          <table className="border-collapse w-full">
            <tbody>
              {tokenizedLines.map((line, index) => (
                <tr
                  key={index}
                  className={`${
                    line.isHighlighted
                      ? 'bg-yellow-100/30 dark:bg-yellow-900/20'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800/50'
                  }`}
                >
                  {lineNumbers && (
                    <td className="text-right pr-4 select-none text-gray-400 dark:text-gray-600 border-r border-gray-200 dark:border-gray-700 w-10">
                      {line.lineNumber}
                    </td>
                  )}
                  <td className="pl-4 whitespace-pre">
                    {line.tokens.map((token, tokenIndex) => {
                      if (token.type === 'normal') {
                        // 이미 HTML로 변환된 내용을 안전하게 삽입
                        return (
                          <span
                            key={tokenIndex}
                            dangerouslySetInnerHTML={{ __html: token.content }}
                          />
                        );
                      } else if (token.type === 'comment') {
                        return (
                          <span
                            key={tokenIndex}
                            className="text-gray-500 dark:text-gray-400"
                          >
                            {token.content}
                          </span>
                        );
                      } else if (token.type === 'string') {
                        return (
                          <span
                            key={tokenIndex}
                            className="text-green-600 dark:text-green-400"
                          >
                            {token.content}
                          </span>
                        );
                      }
                      return null;
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </code>
      </pre>
    </div>
  );
}; 