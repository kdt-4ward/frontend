import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { UserContext } from "../_layout";

export default function OneScreen() {
  const { userInfo } = useContext(UserContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>홈탭</Text>
      <Text>환영합니다, {userInfo?.name}님!</Text>
      {/* 이 아래에 채팅 등 컴포넌트 추가 */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 12 },
});
