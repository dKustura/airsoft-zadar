import React, { PropsWithChildren } from 'react';
import { UserRole } from 'helpers/roles';

interface Props {
  readonly userRoles?: { [role: string]: boolean };
  readonly authorizedRoles?: UserRole[];
}

const AuthorizationCheck = ({
  userRoles,
  authorizedRoles,
  children,
}: PropsWithChildren<Props>) => {
  if (!authorizedRoles) return <>{children}</>;
  if (!userRoles) return null;
  if (authorizedRoles.some((authorizedRole) => userRoles[authorizedRole])) {
    return <>{children}</>;
  }
  return null;
};

export default AuthorizationCheck;
