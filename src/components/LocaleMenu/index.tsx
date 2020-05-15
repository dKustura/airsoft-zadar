import * as React from 'react';

// Components
import { MenuItem, IconButton, Tooltip, Zoom } from '@material-ui/core';
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
import DropdownMenu from 'components/DropdownMenu';

interface Props extends WithStyles<typeof styles> {
  readonly languageCode: string;
  readonly onChange: (languageCode: string) => void;
}

const LocaleMenu: React.FC<Props> = ({ languageCode, onChange, classes }) => {
  const menuButton = (
    <Tooltip TransitionComponent={Zoom} title="Change language">
      <IconButton>
        <FlagIcon
          code={getCountryCodeForLanguage(languageCode)}
          squared
          className={classes.flagIcon}
        />
      </IconButton>
    </Tooltip>
  );

  return (
    <>
      <DropdownMenu menuButton={menuButton}>
        {() =>
          COUNTRY_OPTIONS.map((countryCode) => (
            <MenuItem
              key={countryCode}
              onClick={() => onChange(getLanguageCodeForCountry(countryCode))}
            >
              <FlagIcon
                code={countryCode}
                squared
                size="lg"
                className={classes.flagIcon}
              />
            </MenuItem>
          ))
        }
      </DropdownMenu>
    </>
  );
};

export default withStyles(styles)(LocaleMenu);
