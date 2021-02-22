import { UserTable, UserTableProps } from "@/sql/config";
import { runQuery } from "@/sql/db";
import { Query } from "@/sql/query";
import { ColumnMap, SqlTable } from "@/sql/table";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    let { email } = req.query;

    try {
        if (!email || email.length == 0) {
            return res.status(400).json({ message: "`email` required!!!!" });
        } else if (Array.isArray(email)) {
            return res.status(400).json({ message: "too many emails!!!!" });
        }

        const table: SqlTable<UserTableProps> = UserTable;
        const cols: ColumnMap<UserTableProps> = table.cols;
        const query: string = new Query(UserTable).where(cols.email.equals(email)).toQuery();
        console.log("QUERY: " + query);

        const results = await runQuery(query);
        return res.json(results);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

export default handler;
