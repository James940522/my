import { getUserDataPromise } from "@/shared/lib/utils";
import { use } from "react";

// React 19 새로운 기능 데모를 위한 비동기 컴포넌트
const AsyncUserData = ({ userId }: { userId: number }) => {
  // use 훅을 사용한 비동기 데이터 fetch (React 19의 새로운 기능)
  const userData = use(getUserDataPromise(userId));
  
  return (
    <div className="bg-white dark:bg-gray-700 p-4 rounded-lg">
      <h3 className="text-lg font-bold">{userData?.name}</h3>
      <p>{userData?.email}</p>
    </div>
  );
};

export default AsyncUserData;