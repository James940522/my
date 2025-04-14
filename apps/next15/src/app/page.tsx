import Image from "next/image";
import React from "react";
import DemoFeatures from "@/widgets/features/demo-features";
import ThemeToggle from "@/shared/ui/theme-toggle";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "React 19 & Next.js 15 데모",
  description: "React 19와 Next.js 15의 새로운 기능을 소개하는 데모 웹사이트",
}

export default function Home() {
  return (
    <div className="min-h-screen p-8 flex flex-col">
      <header className="w-full flex justify-between items-center mb-10">
        <div className="flex items-center gap-4">
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={120}
            height={30}
            priority
          />
          <span className="text-2xl font-bold">+</span>
          <span className="text-2xl font-bold">React 19</span>
        </div>
        <ThemeToggle />
      </header>

      <main className="flex-1 flex flex-col gap-8">
        <section className="mb-8">
          <h1 className="text-4xl font-bold mb-4">React 19 & Next.js 15 데모</h1>
          <p className="text-lg">
            이 데모는 React 19와 Next.js 15의 새로운 기능을 소개하고 Feature-Sliced Design(FSD) 아키텍처를 보여줍니다.
          </p>
        </section>

        <DemoFeatures />
        
        <section className="mt-8 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">FSD 아키텍처</h2>
          <p className="mb-4">
            이 프로젝트는 Feature-Sliced Design 아키텍처를 기반으로 구성되었습니다:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>app</strong> - 애플리케이션 초기화 및 라우팅</li>
            <li><strong>widgets</strong> - 페이지의 독립적인 블록들</li>
            <li><strong>features</strong> - 사용자 시나리오를 구현하는 기능</li>
            <li><strong>entities</strong> - 비즈니스 로직의 객체</li>
            <li><strong>shared</strong> - 재사용 가능한 컴포넌트, 유틸리티, API</li>
          </ul>
        </section>
      </main>

      <footer className="mt-12 border-t pt-6 text-center text-sm text-gray-500">
        <p>React 19 & Next.js 15 데모 © 2024</p>
      </footer>
    </div>
  );
}
