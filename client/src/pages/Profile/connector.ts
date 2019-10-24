import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import {get} from 'lodash';
import {checkUserRequest, uploadUserImageRequest} from "../../store/auth/actions";
import {RootState} from "../../store";
import {AuthTypes} from "../../store/auth/constants";
import {User} from "../../store/types";

interface MapState {
    user: User;
    loading?: boolean;
}

const mapStateToProps = (state: RootState): MapState => ({
    user: state.authorization.user as User,
    loading: get(state.authorization.loading, AuthTypes.CHECK_USER_REQUEST)
});

const mapDispatchToProps = (dispatch: any) => bindActionCreators({
    uploadUserImageRequest
}, dispatch);

export type ProfileConnectedProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

export const profileConnector = connect(
    mapStateToProps,
    mapDispatchToProps
);
