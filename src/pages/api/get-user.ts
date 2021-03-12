import { UserRow } from "@/user/user";
import { lookupUserByEmail } from "@/user/user-server";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getSession, Session } from "next-auth/client";

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    // TODO: Would like to set the id on the session if possible
    const session: Session = await getSession({ req });

    try {
        const user: UserRow = await lookupUserByEmail(session.user.email);
        return res.json(user);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

export default handler;
