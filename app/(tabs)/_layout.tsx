import React, { useContext } from "react";
import { Tabs, Redirect } from "expo-router";
import { UserContext } from "../_layout";

export default function TabLayout() {
  const { userInfo } = useContext(UserContext);

  // 로그인 안했으면 무조건 온보딩으로
  if (!userInfo) {
    return <Redirect href="/onboarding" />;
  }

  return (
    <Tabs>
      <Tabs.Screen name="one" options={{ title: "홈" }} />
      <Tabs.Screen name="two" options={{ title: "탭2" }} />
    </Tabs>
  );
}
