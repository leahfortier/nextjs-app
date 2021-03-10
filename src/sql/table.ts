import { Column, DataType } from "./column";

export type ColumnMap<Keys extends string> = Record<Keys, Column>;
export type ValueMap<Keys extends string> = Record<Keys, string>;

export class SqlTable<Keys extends string> {
    name: string;
    cols: ColumnMap<"id" | Keys>;

    constructor(table_name: string, cols: ColumnMap<Keys>) {
        this.name = table_name;
        this.cols = {
            id: new Column("id", DataType.INT).asAutoKey(),
            ...cols,
        };
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

    update<K extends Keys>(id: number, values: ValueMap<K>): string {
        const set: string[] = [];
        for (let key in values) {
            const col = this.cols[key];
            const val = values[key];
            set.push(col.equals(val));
        }

        let def = "UPDATE " + this.name;
        def += " SET " + set.join(", ");
        def += " WHERE " + this.cols.id.equals(id.toString());

        return def;
    }
}
