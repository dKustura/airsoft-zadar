import React, { useMemo, useState, useCallback } from 'react';
import { createEditor, Node, Transforms } from 'slate';
import {
  Slate,
  Editable,
  withReact,
  RenderLeafProps,
  RenderElementProps,
} from 'slate-react';
import { withHistory } from 'slate-history';

// Components
import { Grid, Link } from '@material-ui/core';
import Toolbar from './Toolbar';
import {
  DefaultElement,
  HeaderElement,
  SubheaderElement,
  ListItemElement,
  BulletedListElement,
  NumberedListElement,
  ImageElement,
} from './elements';

// Styling
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from './styles';

// Helpers
import {
  toggleMark,
  MarkFormat,
  BlockFormat,
  withImages,
  isBlockActive,
} from './helpers';

interface Props extends WithStyles<typeof styles> {}

const CustomEditor: React.FC<Props> = ({ classes }) => {
  const editor = useMemo(
    () => withImages(withHistory(withReact(createEditor()))),
    []
  );

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
              // if (event.key === 'p') {
              //   event.preventDefault();
              //   editor.insertBreak();
              // }

              console.log('event.key', event.key);

              // TODO: If current node is Paragraph and is empty -> on backspace removeNode and preventDefault
              if (isBlockActive(editor, BlockFormat.Placeholder)) {
                Transforms.removeNodes(editor);

                if (event.key !== 'Backspace') {
                  Transforms.insertNodes(editor, {
                    type: BlockFormat.Paragraph,
                    children: [{ text: '' }],
                  });
                } else {
                  event.preventDefault();
                }
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
    case BlockFormat.Image:
      return <ImageElement {...props} />;
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
