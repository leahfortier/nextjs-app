import { UserTable, UserTableProps } from "@/sql/config";
import { runQuery } from "@/sql/db";
import { Query } from "@/sql/query";
import { ColumnMap, SqlTable } from "@/sql/table";
import { createPassword, verifyPassword } from "@/util/auth";
import { UserRow } from "./user";

export async function tryLogin(email: string, password: string): Promise<boolean> {
    try {
        const user: UserRow = await lookupUser(email);
        if (!user) {
            return addUser(email, password);
        } else {
            return verifyPassword(password, user.data.hashedPassword);
        }
    } catch (e) {
        console.log("Unexpected error occurred: ", e, e.message);
        return false;
    }
}

export async function addUser(email: string, password: string): Promise<boolean> {
    // Currently only confirming that email and password are not the empty string, but this could
    // potentially be expanded on in the future to have more intense password requirements etc or
    // check for valid email format
    if (!password || !email) {
        return false;
    }

    const userRow: UserRow = {
        id: undefined,
        email: email,
        data: {
            hashedPassword: createPassword(password),
        },
    };

    // TODO: Creating this object should be a method on the UserRow
    const query: string = UserTable.add({
        email: email,
        data: JSON.stringify(userRow.data),
    });

    console.log("Running add query: " + query);
    const results = await runQuery(query);
    const insertId = results["insertId"];
    if (!Number.isInteger(insertId)) {
        throw Error("Unknown response from adding user: " + JSON.stringify(results));
    }

    // Note: I know this isn't returning the userRow anymore but like I don't wanna delete
    // this id validation stuff quite yet
    userRow.id = insertId;
    return true;
}

export async function lookupUser(email: string): Promise<UserRow> {
    const table: SqlTable<UserTableProps> = UserTable;
    const cols: ColumnMap<UserTableProps> = table.cols;
    const query: string = new Query(table).where(cols.email.equals(email)).toQuery();

    console.log("Running lookup query: " + query);
    const results = await runQuery(query);
    if (!Array.isArray(results)) {
        throw Error("Unexpected data type for lookupUser query:" + results);
    } else if (results.length > 1) {
        throw Error("Too many users found????");
    } else if (results.length == 0) {
        // No users found with lookup email
        return null;
        // } else if (!(results[0] as UserRow)) {
        // throw Error("Unexpected data type for lookupUser query:" + results);
    } else {
        const userRow: UserRow = {
            id: +results[0].id,
            email: results[0].email,
            data: JSON.parse(results[0].data),
        };
        return userRow;
    }
}

export async function updateRow(row: UserRow): Promise<void> {
    const query: string = UserTable.update(row.id, {
        data: JSON.stringify(row.data),
    });

    console.log("Running update Query: " + query);
    const results = await runQuery(query);
    console.log("Results: ", JSON.stringify(results));
}
