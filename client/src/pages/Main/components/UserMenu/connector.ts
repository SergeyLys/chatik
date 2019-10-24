import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import {signOut} from "../../../../store/auth/actions";
import {RootState} from "../../../../store";
import {User} from "../../../../store/types";

interface MapState {
    user: User;
}

const mapStateToProps = (state: RootState): MapState => ({
    user: state.authorization.user as User,
});

const mapDispatchToProps = (dispatch: any) => bindActionCreators({
    signOut
}, dispatch);

export type UserMenuConnectedProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

export const userMenuConnector = connect(
    mapStateToProps,
    mapDispatchToProps
);
