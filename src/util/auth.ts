import { generate, verify } from "password-hash";

export function verifyPassword(enteredPassword: string, hashedPassword: string): boolean {
    return verify(enteredPassword, hashedPassword);
}

export function createPassword(password: string): string {
    return generate(password);
}
