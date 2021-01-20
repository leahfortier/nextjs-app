import { Button, Dialog } from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField, { TextFieldProps } from "@material-ui/core/TextField";
import React, { PropsWithChildren } from "react";
import styles from "@/styles/add.module.css";

export type FormTextProps = { label: string } & TextFieldProps;
export function FormText(props: FormTextProps): JSX.Element {
    return <TextField autoFocus margin="dense" id="name" type="text" fullWidth {...props} />;
}

export type FormProps = {
    buttonText: string;
    handleSave: () => void;
};

export function FormButton({ buttonText, handleSave, children }: PropsWithChildren<FormProps>): JSX.Element {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div className={styles.buttonListItem}>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                {buttonText}
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{buttonText}</DialogTitle>
                <DialogContent>{children}</DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button
                        onClick={() => {
                            handleSave();
                            handleClose();
                        }}
                        color="primary"
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
