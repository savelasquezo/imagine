import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      username: string;
      email: string;
      accessToken: string;
      refreshToken: string;
    };
  }
}
