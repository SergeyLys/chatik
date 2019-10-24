import React, {ReactElement} from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';

interface OwnProps {
    items: {
        name: string;
        onClick?: (args?: any) => void;
        image?: ReactElement;
    }[]
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
        },
    }),
);

export const SimpleList = (props: OwnProps) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <List component="nav" aria-label="main mailbox folders">
                {props.items.map((item) =>
                    <ListItem key={item.name} button onClick={item.onClick}>
                            {item.image && (
                                <ListItemAvatar>
                                    {item.image}
                                </ListItemAvatar>
                            )}
                        <ListItemText primary={item.name} />
                    </ListItem>
                )}
            </List>
        </div>
    );
};