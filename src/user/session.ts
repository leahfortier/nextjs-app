import { NextApiRequest } from "next";
import { getSession, Session } from "next-auth/client";

export type UserSession = Session & { userId: number };

// UserId should be set during login, this method just confirms and returns
export async function getUserSession(req: NextApiRequest): Promise<UserSession> {
    const session: Session = await getSession({ req });
    if (!session.userId) {
        throw Error("User ID not set on the session!");
    }

    return {
        ...session,
        userId: session.userId,
    };
}
