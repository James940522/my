"use client";

import React, { useState, Suspense, use } from "react";
import { Counter } from "@/entities/counter";
import { UserProfile } from "@/entities/user-profile";
import { fetchUserData } from "@/shared/api/user-data";

// React 19 새로운 기능 데모를 위한 비동기 컴포넌트
const AsyncUserData = ({ userId }: { userId: number }) => {
  // use 훅을 사용한 비동기 데이터 fetch (React 19의 새로운 기능)
  const userData = use(fetchUserData(userId));
  
  return (
    <div className="bg-white dark:bg-gray-700 p-4 rounded-lg">
      <h3 className="text-lg font-bold">{userData.name}</h3>
      <p>{userData.email}</p>
    </div>
  );
};

export default function DemoFeatures() {
  const [activeTab, setActiveTab] = useState<"react" | "next">("react");
  const [userId, setUserId] = useState(1);
  const [showAsyncComponent, setShowAsyncComponent] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex space-x-4 border-b">
        <button
          onClick={() => setActiveTab("react")}
          className={`px-4 py-2 ${
            activeTab === "react" 
              ? "border-b-2 border-blue-500 font-bold" 
              : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          }`}
        >
          React 19 기능
        </button>
        <button
          onClick={() => setActiveTab("next")}
          className={`px-4 py-2 ${
            activeTab === "next" 
              ? "border-b-2 border-blue-500 font-bold" 
              : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          }`}
        >
          Next.js 15 기능
        </button>
      </div>

      {activeTab === "react" && (
        <div className="space-y-6">
          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">React 19의 새로운 기능</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Actions - 간결한 폼 핸들링</h3>
                <form 
                  action={(formData: FormData) => {
                    // formData를 처리하는 액션 (React 19 Actions)
                    const name = formData.get("name");
                    alert(`안녕하세요 ${name}님!`);
                  }}
                  className="flex gap-2"
                >
                  <input 
                    name="name" 
                    type="text" 
                    placeholder="이름을 입력하세요" 
                    className="px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                    required
                  />
                  <button 
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    제출
                  </button>
                </form>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">use() 훅으로 비동기 데이터 처리</h3>
                <p className="mb-2">Suspense와 함께 사용하는 새로운 use() 훅 데모:</p>
                
                <div className="flex gap-2 mb-4">
                  <button
                    onClick={() => setShowAsyncComponent(!showAsyncComponent)}
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                  >
                    {showAsyncComponent ? '숨기기' : '유저 데이터 불러오기'}
                  </button>
                  
                  {showAsyncComponent && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => setUserId((prev) => Math.max(1, prev - 1))}
                        className="px-3 py-1 bg-gray-200 dark:bg-gray-600 rounded-md"
                      >
                        이전
                      </button>
                      <span className="px-3 py-1">유저 ID: {userId}</span>
                      <button
                        onClick={() => setUserId((prev) => prev + 1)}
                        className="px-3 py-1 bg-gray-200 dark:bg-gray-600 rounded-md"
                      >
                        다음
                      </button>
                    </div>
                  )}
                </div>
                
                {showAsyncComponent && (
                  <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    <Suspense fallback={<div className="text-center py-4">로딩 중...</div>}>
                      <AsyncUserData userId={userId} />
                    </Suspense>
                  </div>
                )}
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Document Metadata API</h3>
                <p className="mb-2">
                  React 19는 메타데이터를 더 쉽게 관리할 수 있는 API를 제공합니다. 페이지 상단의 메타데이터를 확인하세요!
                </p>
              </div>
            </div>
          </section>
          
          <Counter />
        </div>
      )}

      {activeTab === "next" && (
        <div className="space-y-6">
          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Next.js 15의 새로운 기능</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Turbopack</h3>
                <p>
                  Next.js 15에서는 Turbopack이 더욱 안정화되어 빠른 개발 환경을 제공합니다. 
                  이 프로젝트는 Turbopack으로 실행되고 있습니다. (package.json의 dev 스크립트 확인)
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">서버 컴포넌트 최적화</h3>
                <p>
                  Next.js 15는 서버 컴포넌트를 더 효율적으로 처리하며, 클라이언트 번들 크기를 줄여줍니다.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Tailwind CSS v4 지원</h3>
                <p>
                  Next.js 15는 새로운 Tailwind CSS v4를 공식 지원합니다.
                  새로운 @theme 규칙과 최적화된 성능을 확인해보세요!
                </p>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div className="p-4 bg-blue-500 text-white rounded-lg">Tailwind v4 예시</div>
                  <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg">
                    그라디언트
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          <UserProfile />
        </div>
      )}
    </div>
  );
} 