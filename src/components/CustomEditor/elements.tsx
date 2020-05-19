import * as React from 'react';
import { RenderElementProps, useSelected, useFocused } from 'slate-react';
import {
  Typography,
  Grid,
  withStyles,
  WithStyles,
  useTheme,
} from '@material-ui/core';
import { elementStyles } from './styles';

export const HeaderElement = (props: RenderElementProps) => {
  return (
    <Typography variant="h2" {...props.attributes}>
      {props.children}
    </Typography>
  );
};

export const SubheaderElement = (props: RenderElementProps) => {
  return (
    <Typography variant="h4" {...props.attributes}>
      {props.children}
    </Typography>
  );
};

export const QuoteElement = withStyles(elementStyles)(
  (props: RenderElementProps & WithStyles<typeof elementStyles>) => {
    return (
      <div className={props.classes.quoteElement}>
        <Typography variant="h5" {...props.attributes}>
          {props.children}
        </Typography>
      </div>
    );
  }
);

export const DefaultElement = withStyles(elementStyles)(
  (props: RenderElementProps & WithStyles<typeof elementStyles>) => {
    return (
      <div className={props.classes.defaultElement}>
        <Typography {...props.attributes}>{props.children}</Typography>
      </div>
    );
  }
);

export const BulletedListElement = (props: RenderElementProps) => {
  return <ul {...props.attributes}>{props.children}</ul>;
};

export const NumberedListElement = (props: RenderElementProps) => {
  return <ol {...props.attributes}>{props.children}</ol>;
};

export const ListItemElement = (props: RenderElementProps) => {
  return (
    <li {...props.attributes}>
      <Typography>{props.children}</Typography>
    </li>
  );
};

export const ImageElement = withStyles(elementStyles)(
  (props: RenderElementProps & WithStyles<typeof elementStyles>) => {
    const selected = useSelected();
    const focused = useFocused();
    const theme = useTheme();

    return (
      <Grid container justify="center" {...props.attributes}>
        <Grid
          item
          contentEditable={false}
          className={props.classes.imageElement}
        >
          <img
            alt="gsdgsg"
            src={props.element.url}
            style={{
              display: 'block',
              maxWidth: '100%',
              boxShadow:
                selected && focused
                  ? `0 0 0 4px ${theme.palette.primary.light}`
                  : 'none',
            }}
          />
        </Grid>
        {props.children}
      </Grid>
    );
  }
);
