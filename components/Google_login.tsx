import * as React from 'react';
import { Button, Alert } from 'react-native';
import * as AuthSession from 'expo-auth-session';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';


interface GoogleLoginProps {
  onLoginSuccess: (
    user: { user_id: string; name: string; email: string },
    accessToken: string,
    refreshToken: string
  ) => void;
}

const CLIENT_ID = '20389543951-lp415huk9beqdqainbb9u15iam327qha.apps.googleusercontent.com';
const REDIRECT_URI = 'https://auth.expo.io/@soso12321/frontend'; // https://api.luvtune.site/auth/google/callback // https://auth.expo.io/@soso12321/frontend
const SERVER_LOGIN_API = 'https://api.luvtune.site/auth/google/code';


export default function Google_login({ onLoginSuccess }: GoogleLoginProps) {
  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: CLIENT_ID,
      redirectUri: REDIRECT_URI,
      scopes: ['openid', 'profile', 'email'],
      responseType: 'code',
      usePKCE: false,
    },
    {
      authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
    }
  );

  React.useEffect(() => {
    const sendCodeToServer = async () => {
      if (response?.type === 'success') {
        const { code } = response.params;
        try {
          // ✅ POST로 교환
          const res = await axios.post(`${SERVER_LOGIN_API}`, { code });
          const { user_info, access_token, refresh_token } = res.data;

          // 🔒 토큰 저장
          await SecureStore.setItemAsync('accessToken', access_token);
          await SecureStore.setItemAsync('refreshToken', refresh_token);

          onLoginSuccess(user_info, access_token, refresh_token);
        } catch (err: any) {
          Alert.alert('서버 요청 실패', err.message);
        }
      }
    };
    sendCodeToServer();
  }, [response]);

  return (
    <Button
      title="Google 로그인"
      disabled={!request}
      onPress={() => promptAsync()}
    />
  );
}
