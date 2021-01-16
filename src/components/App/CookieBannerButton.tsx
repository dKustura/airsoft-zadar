import * as React from 'react';
import { Button } from '@material-ui/core';

const CookieBannerButton = (props: any) => {
  return (
    <Button variant="contained" {...props}>
      {props.children}
    </Button>
  );
};

export default CookieBannerButton;
