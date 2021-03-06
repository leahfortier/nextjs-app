import { Column } from "./column";
import { Query } from "./query";

export type TableCols<Keys extends string> = Record<"id" | Keys, Column>;
export type TableVals<Keys extends string> = Record<"id" | Keys, string>;

export class SqlTable<Keys extends string> {
    name: string;
    cols: TableCols<Keys>;

    constructor(table_name: string, cols: TableCols<Keys>) {
        this.name = table_name;
        this.cols = cols;
    }

    public asQuery(): Query {
        return new Query(this.name);
    }

    public create(): string {
        let def = "CREATE TABLE IF NOT EXISTS " + this.name + " (\n";
        def += Object.keys(this.cols)
            .map((col) => this.cols[col].create())
            .join(",\n");
        def += "\n)";
        return def;
    }

    public add(values: TableVals<Keys>): string {
        const cols: string[] = [];
        const vals: string[] = [];
        for (let key in values) {
            const val = values[key];
            if (val) {
                const col = this.cols[key];
                cols.push(col.name);
                vals.push(col.toString(val));
            }
        }

        let def = "INSERT INTO `" + this.name + "`";
        def += " (" + cols.join(", ") + ")";
        def += " VALUES (" + vals.join(", ") + ")";

        return def;
    }

    public update(values: TableVals<Keys>): string {
        const set: string[] = [];
        for (let key in values) {
            const col = this.cols[key];
            const val = values[key];
            set.push(col.equals(val));
        }

        let def = "UPDATE " + this.name;
        def += " SET " + set.join(", ");
        def += " WHERE " + this.cols.id.equals(values.id);

        return def;
    }
}
