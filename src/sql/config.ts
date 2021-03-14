import { Column, DataType } from "./column";
import { SqlTable, TableCols, TableVals } from "./table";

export type UserTableProps = "email" | "data";
export type UserTableCols = TableCols<UserTableProps>;
export type UserTableVals = TableVals<UserTableProps>;

export const UserTable: SqlTable<UserTableProps> = new SqlTable("user_data", {
    id: new Column("id", DataType.INT).asAutoKey(),
    email: new Column("email", DataType.STRING),
    data: new Column("data", DataType.JSON),
});

export type TasksTableProps = "date" | "taskName" | "data";

export const TasksTable: SqlTable<TasksTableProps> = new SqlTable("task_data", {
    id: new Column("id", DataType.INT).asAutoKey(),
    date: new Column("date", DataType.DATE),
    taskName: new Column("task_name", DataType.STRING),
    data: new Column("data", DataType.JSON).asNullable(),
});
