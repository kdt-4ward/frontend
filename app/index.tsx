import { useContext } from "react";
import { UserContext } from "./_layout";
import { Redirect } from "expo-router";
import React from "react";

export default function Index() {
  const { userInfo } = useContext(UserContext);
  return <Redirect href={userInfo ? "/(tabs)/one" : "/onboarding"} />;
}
