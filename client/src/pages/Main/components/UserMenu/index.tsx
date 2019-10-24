import React from 'react';
import {withRouter} from 'react-router-dom';
import {RouteComponentProps} from 'react-router';
import {UserMenuConnectedProps, userMenuConnector} from "./connector";
import MenuButton from "../../../../components/MenuButton";
import {Avatar} from "@material-ui/core";

const UserMenuComponent = (props: UserMenuConnectedProps & RouteComponentProps) => {
    const items = [
        {
            title: 'Profile',
            handler: () => {
                props.history.push('/profile');
            }
        },
        {
            title: 'Logout',
            handler: props.signOut
        }
    ];

    return (
        <MenuButton menuItems={items}>
            {props.user.image ? (
                <Avatar src={props.user.image} />
            ) : (
                <Avatar>{ props.user.email.charAt(0).toUpperCase() }</Avatar>
            )}
        </MenuButton>
    );
};

export const UserMenu = withRouter(userMenuConnector(UserMenuComponent));