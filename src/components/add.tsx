import { Button, Grid } from "@material-ui/core";
import React, { Dispatch, ReactNode, SetStateAction } from "react";
import { getTasks as loadTasks, Task, writeTasks as saveTasks } from "@/lib/tasks";
import styles from "@/styles/add.module.css";
import { FormButton, FormText } from "@/components/form-button";
import { UseState } from "@/util/util";

export default function AddPage(): JSX.Element {
    const [name, setName]: UseState<string> = React.useState("");
    const [tasks, setTasks]: UseState<Task[]> = React.useState([]);

    // Once the page is mounted, load the tasks from storage
    React.useEffect(() => {
        setTasks(loadTasks());
    }, []);

    // When save is clicked, update the tasks list and write to storage
    const handleSave = () => {
        const newTasks: Task[] = tasks.concat({ name: name });
        setTasks(newTasks);
        saveTasks(newTasks);
    };

    const taskButtons: ReactNode[] = tasks.map((task) => {
        return (
            <Button className={styles.buttonListItem} key={task.name} variant="outlined" color="secondary">
                {task.name}
            </Button>
        );
    });
    taskButtons.push(
        <FormButton key="__addTask__" buttonText="Add Task" handleSave={handleSave}>
            <FormText label="Name" onChange={(event) => setName(event.target.value)} />
        </FormButton>
    );

    return (
        <Grid className={styles.buttonList} container spacing={2}>
            {taskButtons}
        </Grid>
    );
}
