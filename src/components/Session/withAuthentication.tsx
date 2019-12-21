import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

// Actions
import { setAuthUser } from 'actions/session';

// Components
import { withFirebase, WithFirebaseProps } from 'components/Firebase';

export type WithAuthenticationProps = WithFirebaseProps &
  typeof mapDispatchToProps;

const withAuthentication = <Props extends WithAuthenticationProps>(
  Component: React.ComponentType<Props>
) => {
  class WithAuthentication extends React.Component<Props> {
    private unsubscribe: firebase.Unsubscribe | null = null;

    constructor(props: Props) {
      super(props);

      const storedUser = localStorage.getItem('authUser');
      if (storedUser) {
        this.props.setAuthUser(JSON.parse(storedUser));
      }
    }

    componentDidMount() {
      this.unsubscribe = this.props.firebase.onAuthUserListener(
        authUser => {
          localStorage.setItem('authUser', JSON.stringify(authUser));
          this.props.setAuthUser(authUser);
        },
        () => {
          localStorage.removeItem('authUser');
          this.props.setAuthUser(null);
        }
      );
    }

    componentWillUnmount() {
      if (this.unsubscribe) {
        this.unsubscribe();
      }
    }

    render() {
      return <Component {...this.props} />;
    }
  }

  return compose<any>(
    withFirebase,
    connect(null, mapDispatchToProps)
  )(WithAuthentication);
};

const mapDispatchToProps = { setAuthUser };

export default withAuthentication;
