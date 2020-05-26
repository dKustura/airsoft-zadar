import * as React from 'react';
import { useCallback } from 'react';
import { useSlate } from 'slate-react';
import { useIntl, MessageDescriptor } from 'react-intl';

// Components
import { Tooltip, Zoom } from '@material-ui/core';
import FormatClearIcon from '@material-ui/icons/FormatClear';

// Helpers
import { MarkFormat } from './helpers';
import ToolbarToggleButton from './ToolbarToggleButton';
import messages from './messages';

interface Props {}

const MarksRemoveButton: React.FC<Props> = ({ ...other }) => {
  const editor = useSlate();
  const intl = useIntl();

  const removeMarks = useCallback(() => {
    Object.values(MarkFormat).map((format) => editor.removeMark(format));
  }, [editor]);

  return (
    <Tooltip
      TransitionComponent={Zoom}
      placement="top"
      title={intl.formatMessage(messages.removeFormatting as MessageDescriptor)}
    >
      <ToolbarToggleButton
        {...other}
        value="removeStyle"
        selected={false}
        onChange={removeMarks}
      >
        <FormatClearIcon />
      </ToolbarToggleButton>
    </Tooltip>
  );
};

export default MarksRemoveButton;
