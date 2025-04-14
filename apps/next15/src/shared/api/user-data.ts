export interface UserData {
  id: number;
  name: string;
  email: string;
  role: string;
}

// 테스트용 샘플 유저 데이터
const SAMPLE_USERS: UserData[] = [
  { id: 1, name: "홍길동", email: "hong@example.com", role: "관리자" },
  { id: 2, name: "김철수", email: "kim@example.com", role: "개발자" },
  { id: 3, name: "이영희", email: "lee@example.com", role: "디자이너" },
  { id: 4, name: "박지민", email: "park@example.com", role: "마케팅" },
  { id: 5, name: "최유진", email: "choi@example.com", role: "고객 지원" },
];

// 비동기 유저 데이터 조회 (가상 API)
export async function fetchUserData(userId: number): Promise<UserData> {
  // 실제 환경에서는 API 호출
  await new Promise((resolve) => setTimeout(resolve, 1000)); // 로딩 시뮬레이션
  
  console.log("fetchUserData", userId);

  const user = SAMPLE_USERS.find((user) => user.id === userId);
  
  if (!user) {
    throw new Error(`User ID ${userId} not found`);
  }
  
  return user;
} 