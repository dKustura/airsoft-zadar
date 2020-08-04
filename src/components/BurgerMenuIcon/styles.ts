import { createStyles, Theme, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    line: {
      fill: 'none',
      transition: 'stroke-dasharray 400ms, stroke-dashoffset 400ms',
      stroke: theme.palette.text.primary,
      strokeWidth: 5.5,
      strokeLinecap: 'round',
    },
  })
);
