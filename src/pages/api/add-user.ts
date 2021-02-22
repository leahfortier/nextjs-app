import { UserTable } from "@/sql/config";
import { runQuery } from "@/sql/db";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

// type ResponseProps = ValueMap<UserTableProps> | { message: string };
const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    let { email } = req.query;

    try {
        if (!email) {
            return res.status(400).json({ message: "`email` is required" });
        } else if (Array.isArray(email)) {
            email = email[0];
        }

        const query: string = UserTable.add({
            id: undefined,
            email: email,
            data: "{}",
        });
        console.log("QUERY: " + query);

        const results = await runQuery(query);
        return res.json(results);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

export default handler;
