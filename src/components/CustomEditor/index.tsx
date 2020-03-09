import React, { useMemo, useState, useCallback } from 'react';
import { createEditor, Node } from 'slate';
import {
  Slate,
  Editable,
  withReact,
  RenderLeafProps,
  RenderElementProps,
} from 'slate-react';

// Components
import { Typography, Grid, Link } from '@material-ui/core';
import Toolbar from './Toolbar';

// Styling
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from './styles';

// Helpers
import { toggleMark, MarkFormat, BlockFormat } from './helpers';

interface Props extends WithStyles<typeof styles> {}

const CustomEditor: React.FC<Props> = ({ classes }) => {
  const editor = useMemo(() => withReact(createEditor()), []);

  const [value, setValue] = useState<Node[]>([
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ]);

  const renderElement = useCallback(props => <Element {...props} />, []);

  const renderLeaf = useCallback(props => <Leaf {...props} />, []);

  return (
    <Slate editor={editor} value={value} onChange={value => setValue(value)}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Toolbar />
        </Grid>
        <Grid item xs={12}>
          <Editable
            className={classes.editor}
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            placeholder="Enter some text..."
            onKeyDown={event => {
              if (event.key === 'p') {
                event.preventDefault();
                editor.insertBreak();
              }
              if (!event.ctrlKey) {
                return;
              }

              switch (event.key) {
                case 'B':
                case 'b': {
                  event.preventDefault();
                  toggleMark(editor, MarkFormat.Bold);
                  break;
                }
                case 'I':
                case 'i': {
                  event.preventDefault();
                  toggleMark(editor, MarkFormat.Italic);
                  break;
                }
                case 'U':
                case 'u': {
                  event.preventDefault();
                  toggleMark(editor, MarkFormat.Underline);
                  break;
                }
              }
            }}
            spellCheck={false}
          />
        </Grid>
      </Grid>
    </Slate>
  );
};

export default withStyles(styles)(CustomEditor);

const HeaderElement = (props: RenderElementProps) => {
  return (
    <Typography variant="h2" {...props.attributes}>
      {props.children}
    </Typography>
  );
};

const SubheaderElement = (props: RenderElementProps) => {
  return (
    <Typography variant="h4" {...props.attributes}>
      {props.children}
    </Typography>
  );
};

const DefaultElement = (props: RenderElementProps) => {
  return <Typography {...props.attributes}>{props.children}</Typography>;
};

const BulletedListElement = (props: RenderElementProps) => {
  return <ul {...props.attributes}>{props.children}</ul>;
};

const NumberedListElement = (props: RenderElementProps) => {
  return <ol {...props.attributes}>{props.children}</ol>;
};

const ListItemElement = (props: RenderElementProps) => {
  return (
    <li {...props.attributes}>
      <Typography>{props.children}</Typography>
    </li>
  );
};

const Element = (props: RenderElementProps) => {
  switch (props.element.type) {
    case BlockFormat.Header:
      return <HeaderElement {...props} />;
    case BlockFormat.Subheader:
      return <SubheaderElement {...props} />;
    case BlockFormat.ListItem:
      return <ListItemElement {...props} />;
    case BlockFormat.BulletedList:
      return <BulletedListElement {...props} />;
    case BlockFormat.NumberedList:
      return <NumberedListElement {...props} />;
    default:
      return <DefaultElement {...props} />;
  }
};

const Leaf = ({ attributes, children, leaf }: RenderLeafProps) => {
  if (leaf[MarkFormat.Bold]) {
    children = <strong>{children}</strong>;
  }

  if (leaf[MarkFormat.Italic]) {
    children = <em>{children}</em>;
  }

  if (leaf[MarkFormat.Underline]) {
    children = <u>{children}</u>;
  }

  if (leaf[MarkFormat.Strikethrough]) {
    children = <del>{children}</del>;
  }

  if (leaf[MarkFormat.Link]) {
    children = <Link href={leaf[MarkFormat.Href]}>{children}</Link>;
  }

  return <span {...attributes}>{children}</span>;
};
