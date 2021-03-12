import { getUserSession, UserSession } from "@/lib/session";
import { UserRow } from "@/user/user";
import { lookupUserById } from "@/user/user-server";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    const session: UserSession = await getUserSession(req);

    try {
        const user: UserRow = await lookupUserById(session.userId);
        return res.json(user);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

export default handler;
