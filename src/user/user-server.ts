import { CacheService } from "@/lib/cache";
import { UserTable, UserTableCols, UserTableProps } from "@/sql/config";
import { runQuery } from "@/sql/db";
import { Query } from "@/sql/query";
import { SqlTable } from "@/sql/table";
import { verifyPassword } from "@/util/auth";
import { getResultsInt } from "@/util/util";
import { UserRow } from "./user";

// Id or Email -> UserRow cache to prevent unnecessary sql queries
const cache: CacheService<UserRow> = new CacheService();

function setCache(userRow: UserRow): UserRow {
    cache.set(userRow.id, userRow);
    cache.set(userRow.email, userRow);
    return userRow;
}

export async function tryLogin(email: string, password: string): Promise<boolean> {
    const user: UserRow = await lookupUserByEmail(email);
    if (!user) {
        return addUser(email, password);
    } else {
        return verifyPassword(password, user.data.hashedPassword);
    }
}

export async function addUser(email: string, password: string): Promise<boolean> {
    // Currently only confirming that email and password are not the empty string, but this could
    // potentially be expanded on in the future to have more intense password requirements etc or
    // check for valid email format
    if (!password || !email) {
        return false;
    }

    const userRow: UserRow = UserRow.fromCredentials(email, password);
    const query: string = UserTable.add(userRow.toProps());

    console.log("Running add query: " + query);
    const results = await runQuery(query);
    const insertId = results["insertId"];
    if (!Number.isInteger(insertId)) {
        throw Error("Unknown response from adding user: " + JSON.stringify(results));
    }

    userRow.id = insertId;
    setCache(userRow);

    return true;
}

export async function lookupUserById(id: number): Promise<UserRow> {
    if (cache.has(id)) {
        return cache.get(id);
    }

    return lookupUser((cols) => cols.id.equals(id));
}

export async function lookupUserByEmail(email: string): Promise<UserRow> {
    if (cache.has(email)) {
        return cache.get(email);
    }

    return lookupUser((cols) => cols.email.equals(email));
}

async function lookupUser(condition: (cols: UserTableCols) => string): Promise<UserRow> {
    const table: SqlTable<UserTableProps> = UserTable;
    const query: string = table.asQuery().where(condition(table.cols)).toQuery();

    console.log("Running lookup query: " + query);
    const results = await runQuery(query);
    if (!Array.isArray(results)) {
        throw Error("Unexpected data type for lookupUser query:" + results);
    } else if (results.length > 1) {
        throw Error("Too many users found????");
    } else if (results.length == 0) {
        // No users found with lookup email
        return null;
    } else {
        const userRow: UserRow = UserRow.fromTable(results[0]);
        return setCache(userRow);
    }
}

export async function updateRow(userRow: UserRow): Promise<void> {
    const query: string = UserTable.update(userRow.toProps());

    console.log("Running update Query: " + query);
    const results = await runQuery(query);

    // Exactly one row should be updated
    const affectedRows: number = getResultsInt("affectedRows", results);
    if (affectedRows == 0) {
        throw Error("Should only call update when there is a change.");
    } else if (affectedRows > 1) {
        throw Error("Multiple rows where updated for a single id!!!!!!");
    }

    setCache(userRow);
}
