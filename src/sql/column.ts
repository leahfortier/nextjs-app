export enum DataType {
    INT = "INT",
    STRING = "VARCHAR(100)",
    JSON = "TEXT",
    DATE = "DATE",
}

function toString(type: DataType, value: string): string {
    if (type == DataType.STRING || type == DataType.JSON) {
        return "'" + value + "'";
    } else {
        return value;
    }
}

export class Column {
    name: string;
    type: DataType;
    key?: boolean;
    auto_inc?: boolean;
    nullable?: boolean;

    constructor(name: string, type: DataType) {
        this.name = name;
        this.type = type;

        this.key = false;
        this.auto_inc = false;
        this.nullable = false;
    }

    asKey(): Column {
        this.key = true;
        return this;
    }

    asAutoKey(): Column {
        this.auto_inc = true;
        return this.asKey();
    }

    asNullable(): Column {
        this.nullable = true;
        return this;
    }

    create(): string {
        let def = this.name + " " + this.type;
        if (!this.nullable) {
            def += " NOT NULL";
        }
        if (this.auto_inc) {
            def += " AUTO_INCREMENT";
        }
        if (this.key) {
            def += " PRIMARY KEY";
        }
        return def;
    }

    toString(value: string): string {
        return toString(this.type, value);
    }

    equals(value: string | number): string {
        return this.name + "=" + this.toString(value.toString());
    }
}
