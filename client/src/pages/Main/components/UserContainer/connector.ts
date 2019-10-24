import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import {User} from "../../../../store/types";
import {RootState} from "../../../../store";
import {userDisconnected, userFetched} from "../../../../store/dialogs/actions";

interface MapState {
    user: User;
}

const mapStateToProps = (state: RootState): MapState => ({
    user: state.authorization.user as User,
});

const mapDispatchToProps = (dispatch: any) => bindActionCreators({
    userFetched,
    userDisconnected,
}, dispatch);

export type UserContainerConnectedProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

export const userContainerConnector = connect(
    mapStateToProps,
    mapDispatchToProps
);
