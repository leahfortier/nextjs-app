import { UserRow } from "@/user/user";
import { lookupUser } from "@/user/user-server";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getSession, Session } from "next-auth/client";

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    const session: Session = await getSession({ req });

    try {
        const user: UserRow = await lookupUser(session.user.email);
        return res.json(user);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

export default handler;
