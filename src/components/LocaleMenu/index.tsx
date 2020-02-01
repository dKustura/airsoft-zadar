import React from 'react';

// Components
import {
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  MenuList,
  MenuItem,
  IconButton,
  Tooltip,
} from '@material-ui/core';
import FlagIcon from 'components/FlagIcon';

// Styling
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from './styles';

// Helpers
import { COUNTRY_OPTIONS } from './constants';
import {
  getLanguageCodeForCountry,
  getCountryCodeForLanguage,
} from 'helpers/locale';

interface Props extends WithStyles<typeof styles> {
  readonly languageCode: string;
  readonly onChange: (languageCode: string) => void;
}

const LocaleMenu: React.FC<Props> = ({ languageCode, onChange, classes }) => {
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

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  return (
    <>
      <Tooltip title="Change language">
        <IconButton
          color="inherit"
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <FlagIcon
            code={getCountryCodeForLanguage(languageCode)}
            squared
            className={classes.flagIcon}
          />
        </IconButton>
      </Tooltip>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        placement="bottom"
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="menu-list-grow"
                  onKeyDown={handleListKeyDown}
                >
                  {COUNTRY_OPTIONS.map(countryCode => (
                    <MenuItem
                      key={countryCode}
                      onClick={() =>
                        onChange(getLanguageCodeForCountry(countryCode))
                      }
                    >
                      <FlagIcon
                        code={countryCode}
                        squared
                        size="lg"
                        className={classes.flagIcon}
                      />
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};

export default withStyles(styles)(LocaleMenu);
