"use client";

import React, { useState, useTransition } from "react";

export function Counter() {
  const [count, setCount] = useState(0);
  const [isPending, startTransition] = useTransition();

  // 카운터를 증가시키는 함수 (transition 사용)
  const handleIncrement = () => {
    startTransition(() => {
      setCount((prev) => prev + 1);
    });
  };

  // 카운터를 감소시키는 함수 (즉시 실행)
  const handleDecrement = () => {
    setCount((prev) => prev - 1);
  };

  // 복잡한 계산을 시뮬레이션하는 함수
  const handleHeavyOperation = () => {
    startTransition(() => {
      // 복잡한 처리 시뮬레이션
      let result = 0;
      for (let i = 0; i < 2000000; i++) {
        result += Math.random();
      }
      
      setCount(Math.floor(result % 100));
    });
  };

  return (
    <section className="bg-white dark:bg-gray-800 p-6 rounded-lg">
      <h2 className="text-xl font-bold mb-4">useTransition 데모</h2>
      <p className="mb-4">React 19의 useTransition을 사용하여 UI를 차단하지 않는 업데이트 예시입니다.</p>
      
      <div className="flex flex-col items-center space-y-4">
        <div className="text-4xl font-bold">
          {isPending ? (
            <span className="text-gray-400">계산 중...</span>
          ) : (
            count
          )}
        </div>
        
        <div className="flex space-x-4">
          <button
            onClick={handleDecrement}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            감소 (즉시)
          </button>
          
          <button
            onClick={handleIncrement}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            증가 (transition)
          </button>
          
          <button
            onClick={handleHeavyOperation}
            className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600"
            disabled={isPending}
          >
            {isPending ? "처리 중..." : "무거운 연산 (transition)"}
          </button>
        </div>
        
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
          &quot;무거운 연산&quot; 버튼은 useTransition을 사용하여 메인 스레드를 차단하지 않고 계산을 수행합니다.
          버튼을 클릭하면 다른 UI 요소가 여전히 반응함을 확인해보세요.
        </p>
      </div>
    </section>
  );
} 