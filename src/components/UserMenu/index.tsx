import React from 'react';
import { withSnackbar, WithSnackbarProps } from 'notistack';

import {
  Paper,
  Button,
  Popper,
  ClickAwayListener,
  MenuList,
  MenuItem,
  Grow,
  Typography,
} from '@material-ui/core';

import { withFirebase, WithFirebaseProps } from 'components/Firebase';

// Styling
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from './styles';
import { FirebaseError } from 'firebase';
import { errorNotification, successNotification } from 'helpers/snackbar';

interface Props
  extends WithStyles<typeof styles>,
    WithFirebaseProps,
    WithSnackbarProps {
  readonly displayName: string;
}

const UserMenu: React.FC<Props> = ({
  displayName,
  firebase,
  classes,
  enqueueSnackbar,
}) => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  // function handleListKeyDown(event: React.KeyboardEvent) {
  //   if (event.key === 'Tab') {
  //     event.preventDefault();
  //     setOpen(false);
  //   }
  // }

  return (
    <div className={classes.root}>
      <div>
        <Button
          classes={{ label: classes.userButtonLabel }}
          color="inherit"
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <Typography>{displayName}</Typography>
        </Button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
          placement="bottom-end"
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom-end' ? 'center top' : 'center bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="menu-list-grow"
                    // onKeyDown={handleListKeyDown}
                  >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem
                      onClick={() =>
                        firebase
                          .doSignOut()
                          .then(() => {
                            enqueueSnackbar('Signed out.', successNotification);
                          })
                          .catch((error: FirebaseError) => {
                            enqueueSnackbar(error.message, errorNotification);
                          })
                      }
                    >
                      Sign out
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
};

export default withFirebase(withSnackbar(withStyles(styles)(UserMenu)));
