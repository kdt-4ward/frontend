import React, { createContext, useState } from "react";
import { Stack } from "expo-router";

// User 타입 정의
interface User {
  user_id: string;
  name: string;
  email: string;
}

// Context 생성
export const UserContext = createContext<{
  userInfo: User | null;
  setUserInfo: (user: User | null) => void;
}>({
  userInfo: null,
  setUserInfo: () => {},
});

export default function RootLayout() {
  const [userInfo, setUserInfo] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      <Stack screenOptions={{ headerShown: false }}>
        {/* 기본 루트에선 네비게이터 안보임, 각 라우트에서 보여줌 */}
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </UserContext.Provider>
  );
}
