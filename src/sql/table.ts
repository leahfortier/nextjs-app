import { Column } from "./column";

export type ColumnMap<Keys extends string> = Record<Keys, Column>;
export type ValueMap<Keys extends string> = Record<Keys, string>;

export class SqlTable<Keys extends string> {
    name: string;
    cols: ColumnMap<Keys>;

    constructor(table_name: string, cols: ColumnMap<Keys>) {
        this.name = table_name;
        this.cols = cols;
    }

    create(): string {
        let def = "CREATE TABLE IF NOT EXISTS " + this.name + " (\n";
        def += Object.keys(this.cols)
            .map((col) => this.cols[col].create())
            .join(",\n");
        def += "\n)";
        return def;
    }

    add(values: ValueMap<Keys>): string {
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
}
