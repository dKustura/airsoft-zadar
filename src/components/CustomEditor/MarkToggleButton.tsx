import * as React from 'react';
import GenericToggleButton, { BasicProps } from './GenericToggleButton';

// Helpers
import { isMarkActive, MarkFormat, toggleMark } from './helpers';

const BlockToggleButton = (props: BasicProps<MarkFormat>) => {
  return (
    <GenericToggleButton<MarkFormat>
      {...props}
      isActive={isMarkActive}
      toggle={toggleMark}
    />
  );
};

export default BlockToggleButton;
