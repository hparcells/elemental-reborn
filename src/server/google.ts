import { OAuth2Client } from 'google-auth-library';

export async function verifyGoogleToken(token: string) {
  const client = new OAuth2Client(
    '148901687072-c2otormactiabvs9iqacd751e7f62f9b.apps.googleusercontent.com'
  );
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: '148901687072-c2otormactiabvs9iqacd751e7f62f9b.apps.googleusercontent.com'
    });
    const payload = ticket.getPayload();
    if (payload) {
      const userId = payload.sub;
      return userId;
    }
    return null;
  } catch {
    return null;
  }
}
