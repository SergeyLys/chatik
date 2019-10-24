import React, {ChangeEvent, Fragment} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

interface OwnProps {
    title: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
    },
    input: {
        display: 'none',
    },
}));

const UploadImage: React.FC<OwnProps> = (props: OwnProps) => {
    const classes = useStyles();

    return (
        <Fragment>
            <input
                accept="image/*"
                className={classes.input}
                id="contained-button-file"
                multiple
                type="file"
                onChange={props.onChange}
            />
            <label htmlFor="contained-button-file">
                <Button variant="contained" component="span" className={classes.button}>
                    {props.title}
                </Button>
            </label>
        </Fragment>
    )
};

export default UploadImage;
