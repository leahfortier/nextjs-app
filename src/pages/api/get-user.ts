import { ColumnMap, SqlTable } from "@/sql/table";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { UserTable, UserTableProps } from "src/sql/config";
import { runQuery } from "src/sql/db";
import { Query } from "src/sql/query";

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    let { email } = req.query;

    try {
        if (!email || email.length == 0) {
            return res.status(400).json({ message: "`email` required!!!!" });
        } else if (Array.isArray(email)) {
            if (email.length > 1) {
                return res.status(400).json({ message: "too many emails!!!!" });
            }
            email = email[0];
        }

        const table: SqlTable<UserTableProps> = UserTable;
        const cols: ColumnMap<UserTableProps> = table.cols;
        const query: string = new Query(UserTable).select(cols.data).where(cols.email.equals(email)).toQuery();
        console.log("QUERY: " + query);

        const results = await runQuery(query);
        return res.json(results);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

export default handler;
