import * as React from 'react';
import { useMemo } from 'react';
import { DateTime } from 'luxon';
import { Node } from 'slate';

// Components
import {
  Typography,
  Grid,
  Link,
  useMediaQuery,
  Theme,
} from '@material-ui/core';
import { useLocale } from 'components/Locale';
import ReadingTime from 'components/ReadingTime';

// Helpers
import { Routes } from 'helpers/constants';
import { useStyles } from './styles';
import { MaterialRouterLink } from 'helpers';

interface Props {
  readonly id: string;
  readonly thumbnail?: string;
  readonly title: string;
  readonly content: Node[];
  readonly lastModifiedAt?: Date;
}

const PostCard: React.FC<Props> = ({
  id,
  thumbnail,
  title,
  content,
  lastModifiedAt,
}) => {
  const classes = useStyles();
  const [locale] = useLocale();

  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('xs')
  );

  const date = useMemo(
    () =>
      lastModifiedAt &&
      DateTime.fromJSDate(lastModifiedAt).setLocale(locale).toLocaleString(),
    [lastModifiedAt, locale]
  );

  return (
    <Link
      underline="none"
      component={MaterialRouterLink}
      to={`${Routes.POST}/${id}`}
    >
      <Grid container className={classes.card}>
        <Grid container>
          <Grid
            container
            justify={isSmallScreen ? 'flex-end' : 'space-between'}
            alignItems="flex-end"
            direction="column"
            className={classes.titleContainer}
          >
            <Grid
              container
              direction={isSmallScreen ? 'row' : 'column'}
              justify="space-between"
              className={classes.metadataContainer}
              spacing={1}
            >
              <Grid item>
                <Typography variant="subtitle1">{date}</Typography>
              </Grid>
              <Grid item>
                <Grid
                  container
                  justify="flex-end"
                  alignItems="center"
                  spacing={2}
                >
                  <ReadingTime content={content} />
                </Grid>
              </Grid>
            </Grid>
            <Grid item className={classes.title}>
              <Typography variant="h4">{title}</Typography>
            </Grid>
          </Grid>
        </Grid>
        {thumbnail && (
          <div className={`${classes.thumbnailContainer} thumbnailContainer`}>
            <img
              src={thumbnail}
              alt="thumbnail"
              className={classes.thumbnailImage}
            />
          </div>
        )}
      </Grid>
    </Link>
  );
};

export default PostCard;
