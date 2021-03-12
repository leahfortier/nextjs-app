import { getUserSession, UserSession } from "@/user/session";
import { UserRow } from "@/user/user";
import { lookupUserById, updateRow } from "@/user/user-server";
import { getUrlParameter } from "@/util/util";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    const session: UserSession = await getUserSession(req);
    try {
        const name: string = getUrlParameter(req, "name");
        const user: UserRow = await lookupUserById(session.userId);
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
