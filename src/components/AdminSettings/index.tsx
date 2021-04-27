import * as React from 'react';
import { useState, useEffect } from 'react';

import { useFirebase } from 'components/Firebase';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { CustomClaims, GetUserResult } from 'components/Firebase/types';
import { useStyles } from './styles';

const AdminSettings = () => {
  const firebase = useFirebase();
  const classes = useStyles();

  const [users, setUsers] = useState<GetUserResult[]>([]);

  useEffect(() => {
    firebase.doGetAllUsers().then((res) => {
      console.log(`res`, res.users);
      setUsers(res.users);
    });
  }, [firebase]);

  const getUserRole = (customClaims?: CustomClaims) => {
    if (!customClaims) return 'Guest';
    if (customClaims.admin) return 'Admin';
    else if (customClaims.member) return 'Member';
    return 'Guest';
  };

  return (
    <TableContainer component={Paper} className={classes.table}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="left">Name</TableCell>
            <TableCell align="center">Role</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.uid}>
              <TableCell component="th" scope="row" align="left">
                {user.displayName}
              </TableCell>
              <TableCell align="center">
                {getUserRole(user.customClaims)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AdminSettings;
