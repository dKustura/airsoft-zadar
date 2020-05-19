import * as React from 'react';
import { useEffect, useState, useCallback } from 'react';
import { useIntl, MessageDescriptor } from 'react-intl';
import { Prompt, useHistory, useLocation } from 'react-router-dom';
import { Location } from 'history';

// Components
import PopupDialog from 'components/PopupDialog';

import messages from './messages';

interface Props {
  when?: boolean | undefined;
}

const RouteLeavingGuard: React.FC<Props> = ({ when }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [lastLocation, setLastLocation] = useState<Location | null>(null);
  const [confirmedNavigation, setConfirmedNavigation] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const intl = useIntl();

  const closeModal = useCallback(() => {
    setModalVisible(false);
  }, []);

  const handlePromptBlock = useCallback(
    (nextLocation: Location): boolean => {
      if (nextLocation.pathname !== location.pathname && !confirmedNavigation) {
        setModalVisible(true);
        setLastLocation(nextLocation);
        return false;
      }
      return true;
    },
    [location, confirmedNavigation]
  );

  const handleConfirmNavigationClick = useCallback(() => {
    setModalVisible(false);
    setConfirmedNavigation(true);
  }, []);

  useEffect(() => {
    if (confirmedNavigation && lastLocation) {
      history.push(lastLocation.pathname);
    }
  }, [confirmedNavigation, lastLocation, history]);

  return (
    <>
      <Prompt when={when} message={handlePromptBlock} />
      <PopupDialog
        isOpen={modalVisible}
        title={intl.formatMessage(messages.dialogTitle as MessageDescriptor)}
        description={intl.formatMessage(
          messages.dialogDescription as MessageDescriptor
        )}
        cancelLabel={intl.formatMessage(
          messages.dialogCancel as MessageDescriptor
        )}
        confirmLabel={intl.formatMessage(
          messages.dialogConfirm as MessageDescriptor
        )}
        handleClose={closeModal}
        handleConfirm={handleConfirmNavigationClick}
      />
    </>
  );
};
export default RouteLeavingGuard;
