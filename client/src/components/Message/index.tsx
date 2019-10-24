import React, {Fragment, ReactElement} from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import {get} from 'lodash';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';

interface OwnProps {
    date: string;
    owner: string;
    text: string;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        message: {
            padding: '5px',
            margin: '0 5px 0 5px',
            borderRadius: '5px'
        },
        author: {
            backgroundColor: '#F6DCA3'
        },
        partner: {
            backgroundColor: '#5DBCD2'
        }
    }),
);

export const Message = (props: OwnProps) => {
    const classes = useStyles();

    const date = new Date(props.date).toLocaleDateString('en', {
        day: 'numeric',
        year: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });

    return (
        <Fragment>
            {date}
            <div className={[classes.message, get(classes, props.owner)].join(' ')}>
                {props.text}
            </div>
        </Fragment>
    );
};