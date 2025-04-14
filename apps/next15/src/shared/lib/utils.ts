import { fetchUserData, UserData } from "../api/user-data";

// 캐시된 Promise를 가져오거나 새로 생성
const userCache = new Map<number, Promise<UserData>>();

export function getUserDataPromise(userId: number): Promise<UserData> {
  if (!userCache.has(userId)) {
    userCache.set(userId, fetchUserData(userId));
  }
  return userCache.get(userId)!;
}
