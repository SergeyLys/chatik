import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import {AuthErrorsState, signIn} from "../../store/auth";
import {RootState} from "../../store";

const mapStateToProps = (state: RootState): {errors: AuthErrorsState} => ({
    errors: state.authorization.errors as AuthErrorsState,
});

const mapDispatchToProps = (dispatch: any) => bindActionCreators({
    signIn
}, dispatch);

export type loginConnectedProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

export const loginConnector = connect(
    mapStateToProps,
    mapDispatchToProps
);
