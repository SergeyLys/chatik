import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import {RootState} from "../../store";
import {Dialog, Message, User} from "../../store/types";
import {fetchDialog, receiveMessage, sendMessage, userFetched} from "../../store/dialogs/actions";

interface MapState {
    user: User;
    friends: User[];
    dialog: Dialog;
    messages: Message[];
}

const mapStateToProps = (state: RootState): MapState => ({
    user: state.authorization.user as User,
    friends: state.dialogs.friends,
    dialog: state.dialogs.dialog as Dialog,
    messages: state.dialogs.messages
});

const mapDispatchToProps = (dispatch: any) => bindActionCreators({
    userFetched,
    fetchDialog,
    sendMessage,
    receiveMessage
}, dispatch);

export type DashboardConnectedProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

export const dashboardConnector = connect(
    mapStateToProps,
    mapDispatchToProps
);
