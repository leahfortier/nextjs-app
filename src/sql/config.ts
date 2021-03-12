import { Column, DataType } from "./column";
import { TableCols, SqlTable, TableVals } from "./table";

export type UserTableProps = "email" | "data";
export type UserTableCols = TableCols<UserTableProps>;
export type UserTableVals = TableVals<UserTableProps>;

export const UserTable: SqlTable<UserTableProps> = new SqlTable("user_data", {
    email: new Column("email", DataType.STRING),
    data: new Column("data", DataType.JSON),
});

export type TasksTableProps = "date" | "task_name" | "data";

export const TasksTable: SqlTable<TasksTableProps> = new SqlTable("task_data", {
    date: new Column("date", DataType.DATE),
    task_name: new Column("task_name", DataType.STRING),
    data: new Column("data", DataType.JSON).asNullable(),
});
