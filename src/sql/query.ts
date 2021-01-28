import { Column } from "./column";
import { SqlTable } from "./table";

export class Query {
    table: SqlTable<string>;
    selectColumns: Column[];
    whereExpressions: string[];

    constructor(table: SqlTable<string>) {
        this.table = table;
    }

    select(...columns: Column[]): Query {
        this.selectColumns = columns;
        return this;
    }

    where(...expressions: string[]): Query {
        this.whereExpressions = expressions;
        return this;
    }

    toQuery(): string {
        let selection = "*";
        if (this.selectColumns) {
            selection = this.selectColumns.map((col) => col.name).join(", ");
        }

        let query = "SELECT " + selection;
        query += " FROM " + this.table.name;
        if (this.whereExpressions) {
            query += " WHERE " + this.whereExpressions.join(" AND ");
        }

        return query;
    }
}
