import { NextApiRequest } from "next";
import { Dispatch, SetStateAction } from "react";

export type UseState<S> = [S, Dispatch<SetStateAction<S>>];

// TODO: Do some really intense stuff with this like for the tables and set a 400 bad request
export function getUrlParameter(req: NextApiRequest, key: string): string {
    let param: string | string[] = req.query[key];
    if (!param) {
        throw Error("Missing required parameter " + key);
    } else if (Array.isArray(param)) {
        throw Error("Incorrect format for parameter " + key);
    } else {
        return param as string;
    }
}

export function getResultsInt(key: string, results): number {
    const value = results[key];
    if (!Number.isInteger(value)) {
        throw Error("Unknown response for " + key + ": " + JSON.stringify(results));
    } else {
        return value;
    }
}
