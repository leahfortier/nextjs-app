import { UserTableVals } from "@/sql/config";
import { createPassword } from "@/util/auth";

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

    public static fromTable(results: UserTableVals): UserRow {
        return new UserRow(+results.id, results.email, JSON.parse(results.data));
    }

    private constructor(id: number, email: string, data: UserData) {
        this.id = id;
        this.email = email;
        this.data = data;
    }

    public toProps(): UserTableVals {
        return {
            id: this.id.toString(),
            email: this.email,
            data: JSON.stringify(this.data),
        };
    }
}
