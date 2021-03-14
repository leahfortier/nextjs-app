import { Column } from "./column";

export class Query {
    private tableName: string;
    private selectColumns: Column[];
    private whereExpressions: string[];

    public constructor(tableName: string) {
        this.tableName = tableName;
    }

    public select(...columns: Column[]): Query {
        this.selectColumns = columns;
        return this;
    }

    public where(...expressions: string[]): Query {
        this.whereExpressions = expressions;
        return this;
    }

    public toQuery(): string {
        let selection = "*";
        if (this.selectColumns) {
            selection = this.selectColumns.map((col) => col.name).join(", ");
        }

        let query = "SELECT " + selection;
        query += " FROM " + this.tableName;
        if (this.whereExpressions) {
            query += " WHERE " + this.whereExpressions.join(" AND ");
        }

        return query;
    }
}
