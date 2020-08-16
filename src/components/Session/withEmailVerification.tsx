import * as React from 'react';
import { connect } from 'react-redux';

// Components
import { selectAuthUser } from './selectors';

import { User } from 'firebase';
import { RootState } from 'types';
import EmailConfirmation from 'components/EmailConfirmation';

const needsEmailVerification = (authUser: User | null) =>
  authUser &&
  !authUser.emailVerified &&
  authUser.providerData
    .map((provider) => provider?.providerId)
    .includes('password');

type Props = ReturnType<typeof mapStateToProps>;

const withEmailVerification = (Component: React.ComponentType<any>) => {
  class WithEmailVerification extends React.Component<Props> {
    render() {
      const { authUser, ...restProps } = this.props;

      return needsEmailVerification(authUser) ? (
        <EmailConfirmation />
      ) : (
        <Component {...restProps} />
      );
    }
  }

  return connect(mapStateToProps)(WithEmailVerification);
};

const mapStateToProps = (state: RootState) => {
  return {
    authUser: selectAuthUser(state),
  };
};

export interface WithAuthenticationProps {}

export default withEmailVerification;
