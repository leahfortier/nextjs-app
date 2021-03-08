import { verifyPassword } from "@/util/auth";
import { tryLogin } from "@/user/user-server";
import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { NextApiRequest, NextApiResponse } from "next-auth/_utils";

const options = {
    providers: [
        Providers.Credentials({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: "Email",
            id: "username-login",
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials: Record<string, string>) => {
                const isValid = await tryLogin(credentials.email, credentials.password);
                if (isValid) {
                    return Promise.resolve({ email: credentials.email });
                } else {
                    return Promise.resolve(null);
                }
            },
        }),
    ],
    pages: {
        // signIn: "/login",
    },
};

export default (req: NextApiRequest, res: NextApiResponse): Promise<void> => NextAuth(req, res, options);
