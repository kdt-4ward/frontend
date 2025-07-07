import React, { useRef, useState, useContext } from 'react';
import { View, Text, Button, StyleSheet, Dimensions, Animated, TouchableOpacity } from 'react-native';
import PagerView from 'react-native-pager-view';
import Google_login from '../../components/Google_login';
import { UserContext } from '../_layout'; // Context 위치 맞게!
import { useRouter } from 'expo-router';

const slides = [
  { text: '오늘\n당신의 연인과 어땠나요?' },
  { text: '연인과 함께 반려펫을 키우며\n말하지 못한 속마음을 몰래 털어놓고' },
  { text: '소중한 연인과\n한걸음 더 가까워지세요' },
];

export default function OnboardingScreen() {
  const pagerRef = useRef<PagerView>(null);
  const [page, setPage] = useState(0);
  const { setUserInfo } = useContext(UserContext);
  const router = useRouter();

  // 페이지 이동
  const goNext = () => {
    if (page < slides.length - 1) pagerRef.current?.setPage(page + 1);
  };
  const goPrev = () => {
    if (page > 0) pagerRef.current?.setPage(page - 1);
  };

  return (
    <View style={styles.container}>
      <PagerView
        style={styles.pager}
        initialPage={0}
        ref={pagerRef}
        onPageSelected={e => setPage(e.nativeEvent.position)}
      >
        {slides.map((item, idx) => (
          <View key={idx} style={styles.slide}>
            <Text style={styles.text}>{item.text}</Text>
            {idx === slides.length - 1 && (
              <Google_login
                onLoginSuccess={(user, accessToken, refreshToken) => {
                  setUserInfo(user);
                  router.push('/(tabs)/one');
                }}
              />
            )}
          </View>
        ))}
      </PagerView>

      {/* 캐러셀 인디케이터 */}
      <View style={styles.pagination}>
        {slides.map((_, idx) => (
          <View
            key={idx}
            style={[
              styles.dot,
              page === idx ? styles.dotActive : styles.dotInactive,
            ]}
          />
        ))}
      </View>

      {/* 이전/다음 버튼 (옵션) */}
      <View style={styles.btnContainer}>
        {page > 0 && (
          <TouchableOpacity style={styles.arrowBtn} onPress={goPrev}>
            <Text style={styles.arrowText}>←</Text>
          </TouchableOpacity>
        )}
        {page < slides.length - 1 && (
          <TouchableOpacity style={styles.arrowBtn} onPress={goNext}>
            <Text style={styles.arrowText}>→</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const DOT_SIZE = 10;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', justifyContent: 'center' },
  pager: { flex: 1 },
  slide: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 22, fontWeight: '600', textAlign: 'center', marginBottom: 32 },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 28,
    marginTop: -16,
  },
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    marginHorizontal: 4,
  },
  dotActive: { backgroundColor: '#4f7cff' },
  dotInactive: { backgroundColor: '#eee' },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 36,
    marginBottom: 28,
    alignItems: 'center',
  },
  arrowBtn: {
    padding: 10,
    borderRadius: 100,
    backgroundColor: '#f4f4f4',
    minWidth: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowText: { fontSize: 24, color: '#4f7cff', fontWeight: 'bold' },
});
