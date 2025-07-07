export async function signup(data: {
  name: string;
  email: string;
  nickname: string;
}) {
  const res = await fetch('http://YOUR_BACKEND_URL/api/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Signup failed');
  return res.json();
}
