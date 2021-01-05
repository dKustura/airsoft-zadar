import * as React from 'react';
import GenericToggleButton, { BasicProps } from './GenericToggleButton';

// Helpers
import { toggleBlock, isBlockActive, BlockFormat } from './helpers';

const BlockToggleButton = (props: BasicProps<BlockFormat>) => {
  return (
    <GenericToggleButton<BlockFormat>
      {...props}
      isActive={isBlockActive}
      toggle={toggleBlock}
    />
  );
};

export default BlockToggleButton;
