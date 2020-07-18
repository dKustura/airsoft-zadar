import * as React from 'react';
import { MessageDescriptor, useIntl } from 'react-intl';

// Components
import { MenuItem, IconButton, Tooltip, Zoom } from '@material-ui/core';
import FlagIcon from 'components/FlagIcon';
import DropdownMenu from 'components/DropdownMenu';

// Helpers
import { useStyles } from './styles';
import { COUNTRY_OPTIONS } from './constants';
import {
  getLanguageCodeForCountry,
  getCountryCodeForLanguage,
} from 'helpers/locale';
import messages from './messages';

interface Props {
  readonly languageCode: string;
  readonly onChange: (languageCode: string) => void;
}

const LocaleMenu: React.FC<Props> = ({ languageCode, onChange }) => {
  const intl = useIntl();
  const classes = useStyles();

  const menuButton = (
    <Tooltip
      TransitionComponent={Zoom}
      title={intl.formatMessage(messages.changeLanguage as MessageDescriptor)}
    >
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

export default LocaleMenu;
