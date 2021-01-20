import { Color } from "@material-ui/core";

export type Task = {
    name: string;
    color?: Color;
};

// TODO: Just using local storage in the browswer for now until tables and such are ready
export function getTasks(): Task[] {
    const jsonTasks: string = localStorage.getItem("tasks");
    if (jsonTasks == null) {
        return [];
    } else {
        return JSON.parse(jsonTasks);
    }
}

export function writeTasks(tasks: Task[]) {
    const jsonTasks = JSON.stringify(tasks);
    localStorage.setItem("tasks", jsonTasks);
    console.log("Write Tasks: " + jsonTasks);
}
