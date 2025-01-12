import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import bcryptjs from "bcryptjs";
import User, { IUser } from "@/libs/modules/user.model";
import connectMongo from "@/libs/MongoConnect";

// interface UserData={

// }
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Enter Your Email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        await connectMongo();
        try {
          const { email, password } = credentials;
          const user: IUser = (await User.findOne({
            email,
          })) as any;

          // console.log("user", user)

          if (!user) {
            throw new Error("Invalid Username Or Email");
          }
          if (!user.isVerified) {
            throw new Error("Please Verify Your Account Before Login");
          }

          const isMatchedPass = await bcryptjs.compare(password, user.password);

          if (isMatchedPass) {
            return user;
          } else {
            throw new Error("Invalid Password Please Try Again");
          }
        } catch (error: any) {
          throw new Error(error);
        }
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString();
        token.isVerified = user.isVerified;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.isVerified = token.isVerified;
        session.user.username = token.username;
      }
      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
