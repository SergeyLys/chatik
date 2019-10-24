import React, {ChangeEvent, Dispatch, useState} from 'react';
import {Link as RouterLink} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {loginConnectedProps, loginConnector} from "./connector";
import {FormControl, FormHelperText} from "@material-ui/core";
import {AuthTypes} from "../../store/auth/constants";

const useStyles = makeStyles(theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    formControl: {
        width: '100%'
    }
}));

function LoginComponent(props: loginConnectedProps) {
    const [email, handleChangeEmail]: [string, Dispatch<string>] = useState('');
    const [password, handleChangePassword]: [string, Dispatch<string>] = useState('');
    const classes = useStyles();

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        switch (e.target.name) {
            case 'email': handleChangeEmail(e.target.value);
            break;
            case 'password': handleChangePassword(e.target.value);
            break;
        }
    };

    const handleSignIn = async () => {
        props.signIn({email, password});
    };

    const isNotFound = props.errors[AuthTypes.SIGNIN_FAILURE] &&
        props.errors[AuthTypes.SIGNIN_FAILURE].status === 404;

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form}>
                    <FormControl className={classes.formControl} error={isNotFound}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={onInputChange}
                        />
                        {isNotFound && (
                            <FormHelperText>{props.errors[AuthTypes.SIGNIN_FAILURE].message}</FormHelperText>
                        )}
                    </FormControl>

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={onInputChange}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSignIn}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item>
                            <RouterLink to='/register'>
                                Don't have an account? Sign Up
                            </RouterLink>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}

export const Login = loginConnector(LoginComponent);