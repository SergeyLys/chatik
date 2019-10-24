import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import {AuthErrorsState, signup} from "../../store/auth";
import {RootState} from "../../store";

const mapStateToProps = (state: RootState): {errors: AuthErrorsState} => ({
    errors: state.authorization.errors as AuthErrorsState,
});

const mapDispatchToProps = (dispatch: any) => bindActionCreators({
    signup
}, dispatch);

export type signupConnectedProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

export const signupConnector = connect(
    mapStateToProps,
    mapDispatchToProps
);
