import withAuthentication, {
  WithAuthenticationProps as WithAuthenticationPropsType,
} from './withAuthentication';

// import withAuthorization from './withAuthorization';
import withEmailVerification from './withEmailVerification';

export { withAuthentication, withEmailVerification };

export type WithAuthenticationProps = WithAuthenticationPropsType;
