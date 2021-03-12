import { UserRow } from "@/user/user";
import { lookupUserByEmail, updateRow } from "@/user/user-server";
import { getUrlParameter } from "@/util/util";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getSession, Session } from "next-auth/client";

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    // TODO: Add id to the session in a separate internal getSession method thing
    const session: Session = await getSession({ req });
    try {
        const name: string = getUrlParameter(req, "name");
        const user: UserRow = await lookupUserByEmail(session.user.email);
        if (user.data.name != name) {
            user.data.name = name;
            await updateRow(user);
        }
        res.end();
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

export default handler;
