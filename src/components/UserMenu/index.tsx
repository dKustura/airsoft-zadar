import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';

// Components
import { Button, MenuItem, Typography } from '@material-ui/core';
import { useFirebase } from 'components/Firebase';
import DropdownMenu from 'components/DropdownMenu';

// Helpers
import { useStyles } from './styles';
import { errorNotification, successNotification } from 'helpers/snackbar';
import { Routes } from 'helpers/constants';

// i18n
import { FormattedMessage, useIntl, MessageDescriptor } from 'react-intl';
import messages from './messages';

// Types
import { FirebaseError } from 'firebase';
import { Variant } from '@material-ui/core/styles/createTypography';

interface Props {
  readonly displayName: string;
  readonly typographyVariant?: Variant;
}

const UserMenu = ({ displayName, typographyVariant }: Props): JSX.Element => {
  const intl = useIntl();
  const firebase = useFirebase();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();

  // const [open, setOpen] = React.useState(false);
  // const anchorRef = React.useRef<HTMLButtonElement>(null);

  // const handleClose = (event: React.MouseEvent<EventTarget>) => {
  //   if (
  //     anchorRef.current &&
  //     anchorRef.current.contains(event.target as HTMLElement)
  //   ) {
  //     return;
  //   }

  //   setOpen(false);
  // };

  // return focus to the button when we transitioned from !open -> open
  // const prevOpen = React.useRef(open);
  // React.useEffect(() => {
  //   if (prevOpen.current === true && open === false) {
  //     anchorRef.current!.focus();
  //   }

  //   prevOpen.current = open;
  // }, [open]);

  const dropdownButton = (
    <Button classes={{ label: classes.userButtonLabel }} color="inherit">
      <Typography variant={typographyVariant}>{displayName}</Typography>
    </Button>
  );

  return (
    <DropdownMenu menuButton={dropdownButton}>
      <MenuItem
        onClick={() => {
          history.push(Routes.CHANGE_PASSWORD);
        }}
      >
        <FormattedMessage {...messages.changePasswordItem} />
      </MenuItem>
      <MenuItem
        onClick={() =>
          firebase
            .doSignOut()
            .then(() => {
              enqueueSnackbar(
                intl.formatMessage(messages.signedOut as MessageDescriptor),
                successNotification
              );
            })
            .catch((error: FirebaseError) => {
              enqueueSnackbar(error.message, errorNotification);
            })
        }
      >
        <FormattedMessage {...messages.signOutItem} />
      </MenuItem>
    </DropdownMenu>
  );
};

export default UserMenu;
