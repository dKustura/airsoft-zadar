import * as React from 'react';
import { RenderElementProps, useSelected, useFocused } from 'slate-react';
import { Typography, Grid, useTheme } from '@material-ui/core';
import { useElementStyles } from './styles';

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

export const QuoteElement = (props: RenderElementProps) => {
  const classes = useElementStyles();

  return (
    <div className={classes.quoteElement}>
      <Typography variant="h5" {...props.attributes}>
        {props.children}
      </Typography>
    </div>
  );
};

export const DefaultElement = (props: RenderElementProps) => {
  const classes = useElementStyles();

  return (
    <div className={classes.defaultElement}>
      <Typography variant="body2" {...props.attributes}>
        {props.children}
      </Typography>
    </div>
  );
};

export const BulletedListElement = (props: RenderElementProps) => {
  return <ul {...props.attributes}>{props.children}</ul>;
};

export const NumberedListElement = (props: RenderElementProps) => {
  return <ol {...props.attributes}>{props.children}</ol>;
};

export const ListItemElement = (props: RenderElementProps) => {
  return (
    <li {...props.attributes}>
      <Typography variant="body2">{props.children}</Typography>
    </li>
  );
};

export const ImageElement = (props: RenderElementProps) => {
  const selected = useSelected();
  const focused = useFocused();
  const theme = useTheme();
  const classes = useElementStyles();

  return (
    <Grid container justify="center" {...props.attributes}>
      <Grid item contentEditable={false} className={classes.imageElement}>
        <img
          alt="TODO: replace this"
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
};
