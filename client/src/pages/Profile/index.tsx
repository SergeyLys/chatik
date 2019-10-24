import React, {ChangeEvent, Fragment} from 'react';
import {withRouter} from 'react-router-dom';
import {RouteComponentProps} from 'react-router';
import {get} from 'lodash';
import { Grid} from "@material-ui/core";
import {ProfileConnectedProps, profileConnector} from "./connector";
import UploadImage from "../../components/UploadImage";


export const ProfileComponent = (props: ProfileConnectedProps & RouteComponentProps) => {
    const onImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
        props.uploadUserImageRequest(get(e.target.files, '0'));
    };

    return (
        <Fragment>
            <Grid
                container
                direction="row"
            >
                Profile
                <UploadImage title="Upload image" onChange={onImageUpload} />
            </Grid>
        </Fragment>
    );
};

export const Profile = withRouter(profileConnector(ProfileComponent));