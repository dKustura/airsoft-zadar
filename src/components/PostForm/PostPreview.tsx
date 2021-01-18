import * as React from 'react';
import { Field, FieldProps } from 'formik';

// Components
import { Grid, Tooltip, IconButton, Zoom } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import PostRead from 'components/PostRead';

// Helpers
import { usePreviewStyles as useStyles } from './styles';

// Types
import { PostSchemaType } from './types';

interface Props {
  readonly onExit: () => void;
}

const PostPreview = ({ onExit }: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <>
      <Grid container justify="flex-end">
        <Grid item>
          <Tooltip
            TransitionComponent={Zoom}
            placement="bottom"
            title="Exit Preview"
          >
            <IconButton
              onClick={onExit}
              color="primary"
              className={classes.previewCloseIconButton}
            >
              <CloseIcon className={classes.previewCloseIcon} />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Field name="content">
          {({ form }: FieldProps<PostSchemaType>) => (
            <PostRead title={form.values.title} content={form.values.content} />
          )}
        </Field>
      </Grid>
    </>
  );
};

export default PostPreview;
