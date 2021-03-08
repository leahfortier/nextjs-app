import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";

export type Password = {
    hashedPassword: string;
    salt: string;
};

export async function verifyPassword(enteredPassword: string, userPassword: Password): Promise<boolean> {
    if (!userPassword) {
        return false;
    }

    const passwordHash = this.hashPasswordWithSalt(enteredPassword, userPassword.salt);
    return userPassword.hashedPassword == passwordHash;
}

export function createPassword(password: string): Password {
    const salt = generateNewSalt();
    const hashedPassword = hashPasswordWithSalt(password as string, salt);

    return {
        hashedPassword,
        salt,
    };
}

export function hashPasswordWithSalt(password: string, salt: string): string {
    return crypto
        .createHash("sha256")
        .update(password + salt)
        .digest()
        .toString();
}

export function generateNewSalt(): string {
    return uuidv4();
}
