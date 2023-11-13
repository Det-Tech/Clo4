// next
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

// third-party
import axios from 'utils/axios';

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      name: 'Google',
      clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.REACT_APP_GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code'
        }
      }
    }),
    CredentialsProvider({
      id: 'signin',
      name: 'Signin',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'Enter Email' },
        password: { label: 'Password', type: 'password', placeholder: 'Enter Password' }
      },
      async authorize(credentials) {
        try {
          const res = await axios.post('/api/user/login', {
            password: credentials?.password,
            email: credentials?.email
          });

          // if (res.data && res.data.msg === 'Email verification has sent to your email') {
          //   throw new Error('email not verified');
          // }
          return {
            id: '',
            email: credentials?.email,
            accessToken: res.data?.token,
            fullName: res.data?.username,
            wallet: res.data?.wallet,
            walletData: res.data?.walletData,
          };

        } catch (error: any) {
          throw new Error('Invalid Email or Password');
        }
      }
    }),
    CredentialsProvider({
      id: 'signup',
      name: 'Signup',
      credentials: {
        firstName: { label: 'First Name', type: 'text', placeholder: 'Enter First Name' },
        lastName: { label: 'Last Name', type: 'text', placeholder: 'Enter Last Name' },
        email: { label: 'Email', type: 'text', placeholder: 'Enter Email' },
        password: { label: 'Password', type: 'password', placeholder: 'Enter Password' },
        wallet: { label: 'wallet', type: 'text', placeholder: '' },
        walletData: { label: 'walletData', type: 'text', placeholder: '' }
      },
      async authorize(credentials) {
        try {
          const user = await axios.post('/api/user/register', {
            username: credentials?.firstName + ' ' + credentials?.lastName,
            email: credentials?.email,
            password: credentials?.password,
            wallet: credentials?.wallet,
            wallet_data: credentials?.walletData,
          });

          return {
            id: user.data._id,
            email: user.data.email
          };
        } catch (error: any) {
          var errors;
          if (error.response.data) {
            errors = JSON.stringify(error.response.data.message);
          } else {
            errors = JSON.stringify({ submit: error.message });
          }
          throw new Error(errors);
        }
      }
    }),
    CredentialsProvider({
      id: 'verifyOtp',
      name: 'VerifyOtp',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'Enter Email' },
        otp: { label: 'OTP', type: 'text', placeholder: 'Enter OTP Code' }
      },
      async authorize(credentials) {
        try {
          const user = await axios.post('/api/user/verify-otp', {
            email: credentials?.email,
            otp: credentials?.otp
          });
          return {
            id: '',
            email: credentials?.email,
            accessToken: user.data.token,
            fullName: user.data.username,
            walletAddress: user.data.wallet,
            walletData: user.data.walletData
          };
        } catch (error: any) {
          var errors;
          if (error.response.data) {
            errors = JSON.stringify(error.response.data.message);
          } else {
            errors = JSON.stringify(error.message);
          }
          throw new Error(errors);
        }
      }
    })
  ],
  callbacks: {
    jwt: async ({ token, user, account, trigger, session }) => {
      if (account?.provider === 'google') {
        console.log('\x1b[32m', token);
      }
      if (account?.provider === 'signup' && user) {
        token.id = user.id;
        token.email = user.email;
      }
      if (account?.provider === 'signin' && user) {
        token.email = user.email;
        token.accessToken = (user as any).accessToken;
        token.fullName = (user as any).fullName;
        token.walletAddress = (user as any)?.wallet;
        token.walletData = (user as any)?.walletData;
      }
      console.log("token:", token)
      return token;
    },
    session: ({ session, token }) => {
      console.log("session token:", token)
      if (token) {
        session.token = token;
      }
      return session;
    }
  },
  session: {
    strategy: 'jwt',
    maxAge: Number(process.env.REACT_APP_JWT_TIMEOUT!)
  },
  jwt: {
    secret: process.env.REACT_APP_JWT_SECRET
  },
  pages: {
    signIn: '/signin',
    newUser: '/signup',
    verifyRequest: '/verifyOtp'
  }
};
export default NextAuth(authOptions);
