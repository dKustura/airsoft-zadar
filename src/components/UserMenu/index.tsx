import React from 'react';
import { withSnackbar, WithSnackbarProps } from 'notistack';

// Components
import { Button, MenuItem, Typography } from '@material-ui/core';
import { withFirebase, WithFirebaseProps } from 'components/Firebase';
import DropdownMenu from 'components/DropdownMenu';

// Styling
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from './styles';

// Helpers
import { errorNotification, successNotification } from 'helpers/snackbar';

// i18n
import { FormattedMessage } from 'react-intl';
import messages from './messages';

// Types
import { FirebaseError } from 'firebase';

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

  const dropdownButton = (
    <Button classes={{ label: classes.userButtonLabel }} color="inherit">
      <Typography>{displayName}</Typography>
    </Button>
  );

  return (
    <DropdownMenu menuButton={dropdownButton}>
      {() => (
        <>
          <MenuItem onClick={handleClose}>
            <FormattedMessage {...messages.profileItem} />
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <FormattedMessage {...messages.settingsItem} />
          </MenuItem>
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
            <FormattedMessage {...messages.signOutItem} />
          </MenuItem>
        </>
      )}
    </DropdownMenu>
  );
};

export default withFirebase(withSnackbar(withStyles(styles)(UserMenu)));
