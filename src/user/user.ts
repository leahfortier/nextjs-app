import CacheService from "@/lib/cache";
import { fetchUrl } from "@/lib/fetcher";
import { UserTableProps } from "@/sql/config";
import { ValueMap } from "@/sql/table";
import { createPassword } from "@/util/auth";
import { getSession, Session } from "next-auth/client";

export type UserData = {
    name?: string;
    hashedPassword: string;
};

export class UserRow {
    id: number;
    email: string;
    data: UserData;

    public static fromCredentials(email: string, password: string): UserRow {
        const data: UserData = {
            hashedPassword: createPassword(password),
        };

        // Id is auto-added when added to the table
        return new UserRow(undefined, email, data);
    }

    public static fromTable(results: ValueMap<"id" | UserTableProps>): UserRow {
        return new UserRow(+results.id, results.email, JSON.parse(results.data));
    }

    private constructor(id: number, email: string, data: UserData) {
        this.id = id;
        this.email = email;
        this.data = data;
    }

    public toProps(): ValueMap<UserTableProps> {
        return {
            email: this.email,
            data: JSON.stringify(this.data),
        };
    }
}

export type User = {
    session: Session;
    userRow: UserRow;
};
