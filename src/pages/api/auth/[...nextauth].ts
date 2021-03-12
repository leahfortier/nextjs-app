import { UserSession } from "@/lib/session";
import { UserRow } from "@/user/user";
import { lookupUserByEmail, tryLogin } from "@/user/user-server";
import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { GenericObject, NextApiRequest, NextApiResponse, SessionBase } from "next-auth/_utils";

const options = {
    callbacks: {
        async session(session: SessionBase, token: GenericObject): Promise<UserSession> {
            // Get the id associated with the user and add to the session
            const user: UserRow = await lookupUserByEmail(session.user.email);
            return {
                ...session,
                userId: user.id,
            };
        },
    },
    providers: [
        Providers.Credentials({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: "Email",
            id: "username-login",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials: Record<string, string>): Promise<GenericObject | null> => {
                const isValid: boolean = await tryLogin(credentials.email, credentials.password);
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
