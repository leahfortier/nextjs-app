import { Column, DataType } from "./column";
import { SqlTable } from "./table";

export type UserTableProps = "id" | "email" | "data";

export const UserTable: SqlTable<UserTableProps> = new SqlTable("user_data", {
    id: new Column("id", DataType.INT).asAutoKey(),
    email: new Column("email", DataType.STRING),
    data: new Column("data", DataType.JSON),
});

export type TasksTableProps = "id" | "date" | "task_name" | "data";

export const TasksTable: SqlTable<TasksTableProps> = new SqlTable("task_data", {
    id: new Column("id", DataType.INT).asAutoKey(),
    date: new Column("date", DataType.DATE),
    task_name: new Column("task_name", DataType.STRING),
    data: new Column("data", DataType.JSON).asNullable(),
});
