"use client";

import React, { useState } from "react";

interface ProfileData {
  name: string;
  role: string;
  team: string;
  bio: string;
}

export function UserProfile() {
  const [profile, setProfile] = useState<ProfileData>({
    name: "제임스",
    role: "중니어 개발자",
    team: "프론트엔드",
    bio: "Next.js와 React를 활용한 웹 애플리케이션 개발 전문가입니다."
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<ProfileData>(profile);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSave = () => {
    setProfile(formData);
    setIsEditing(false);
  };
  
  const handleCancel = () => {
    setFormData(profile);
    setIsEditing(false);
  };
  
  return (
    <section className="bg-white dark:bg-gray-800 p-6 rounded-lg">
      <h2 className="text-xl font-bold mb-4">사용자 프로필</h2>
      
      <div className="space-y-4">
        {isEditing ? (
          // 편집 모드
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                이름
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            
            <div>
              <label htmlFor="role" className="block text-sm font-medium mb-1">
                직책
              </label>
              <input
                type="text"
                id="role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            
            <div>
              <label htmlFor="team" className="block text-sm font-medium mb-1">
                팀
              </label>
              <input
                type="text"
                id="team"
                name="team"
                value={formData.team}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            
            <div>
              <label htmlFor="bio" className="block text-sm font-medium mb-1">
                소개
              </label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                저장
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
              >
                취소
              </button>
            </div>
          </div>
        ) : (
          // 보기 모드
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold">{profile.name}</h3>
                <p className="text-gray-600 dark:text-gray-400">{profile.role} @ {profile.team}</p>
              </div>
              <button
                onClick={() => setIsEditing(true)}
                className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm"
              >
                편집
              </button>
            </div>
            
            <div className="border-t pt-4 mt-4">
              <h4 className="text-md font-semibold mb-2">소개</h4>
              <p>{profile.bio}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
} 