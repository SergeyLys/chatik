import React, {Dispatch, FormEvent, Fragment, useEffect, useState} from 'react';
import {isEmpty, get} from 'lodash';
import {Avatar, Button, Grid, Icon, makeStyles, TextField} from "@material-ui/core";
import {DashboardConnectedProps, dashboardConnector} from "./connector";
import {SimpleList} from "../../components/List";
import {socketInstance} from "../../services/socket";
import {Message as IMessage} from "../../store/types";
import {Message} from "../../components";

const useStyles = makeStyles(theme => ({
    chatArea: {
        maxHeight: 'calc(100vh - 200px)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
    },
    chatMessages: {
        flex: '1',
        height:'100%',
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column-reverse'
    },
    chatInput: {
        width: '100%'
    },
    messageWrapper: {
        maxWidth: '50%'
    }
}));

function DashboardComponent(props: DashboardConnectedProps) {
    const [message, setMessage]: [string, Dispatch<string>] = useState('');
    useEffect(() => {
        socketInstance.socket.on('broadcast_message', ({message}: {message: IMessage}) => {
            if (message.dialog === props.dialog.id && message.author !== props.user.id) {
                props.receiveMessage(message);
            }
        });
    }, [props.dialog]);
    const classes = useStyles();
    const handleSelectDialog = (id: number) => {
        props.fetchDialog({partnerId: id});
    };

    const friendsList = props.friends.map((friend) => {
        return {
            name: friend.email,
            image: friend.image ? <Avatar src={friend.image} /> : <Avatar>{ friend.email.charAt(0).toUpperCase() }</Avatar>,
            onClick: handleSelectDialog.bind(null, friend.id)
        }
    });

    const handlePostMessage = (e: FormEvent) => {
        e.preventDefault();
        if (message) {
            props.sendMessage({text: message, dialog: props.dialog.id, author: props.user.id});
            setMessage('');
        }
    };

    return (
        <Fragment>
            <Grid
                container
                direction="row"
            >
                {friendsList.length ? (
                    <SimpleList items={friendsList} />
                ) : (
                    <p>No users online</p>
                )}

                <Grid item xs={8}>
                    <div className={classes.chatArea}>
                        <div className={classes.chatMessages}>
                            <div style={{display: 'flex', flexDirection: 'column'}}>
                                {!isEmpty(props.messages) && props.messages.map((msg) => {
                                    if (msg.author === props.user.id) {
                                        return (
                                            <div key={msg.id} className={classes.messageWrapper} style={{alignSelf: 'flex-end'}}>
                                                <Message
                                                    owner='author'
                                                    date={get(msg, 'createdAt') as string}
                                                    text={msg.text}
                                                />
                                            </div>
                                        )
                                    }
                                    return (
                                        <div key={msg.id} className={classes.messageWrapper}  style={{alignSelf: 'flex-start'}}>
                                            <Message
                                                owner='partner'
                                                date={get(msg, 'createdAt') as string}
                                                text={msg.text}
                                            />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                    {!isEmpty(props.dialog) && (
                        <form onSubmit={handlePostMessage}>
                            <TextField
                                id="standard-bare"
                                margin="normal"
                                inputProps={{ 'aria-label': 'bare' }}
                                onChange={(e) => setMessage(e.target.value)}
                                className={classes.chatInput}
                                value={message}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                type='submit'
                            >
                                Send
                            </Button>
                        </form>
                    )}
                </Grid>
            </Grid>
        </Fragment>
    );
}

export const Dashboard = dashboardConnector(DashboardComponent);