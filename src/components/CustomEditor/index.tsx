import React, { useMemo, useState, useCallback } from 'react';
import { createEditor, Node, Transforms, Editor, Range } from 'slate';
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
  isMarkActive,
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

  const isCaretAfterImage = (editor: Editor) => {
    if (!editor.selection) return false;
    if (!Range.isCollapsed(editor.selection)) return false;

    const firstNodeEntry = Editor.first(editor, editor.selection);
    if (firstNodeEntry) {
      console.log('firstNodeEntry[0]', firstNodeEntry[0]);
    }

    const prevPoint = Editor.before(editor, editor.selection);
    if (!prevPoint) return false;

    const prevNodeEntry = Editor.node(editor, prevPoint);
    if (!prevNodeEntry) return false;

    const prevNode = prevNodeEntry[0];
    const isAfterImage = prevNode.type === BlockFormat.Image;

    return isAfterImage;
  };

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
            onKeyDown={event => {
              // if (event.key === 'p') {
              //   event.preventDefault();
              //   editor.insertBreak();
              // }

              // Alternative approach: On each backspace check if immediate previous element is an Image

              if (event.key === 'Backspace') {
                const prevNodeEntry = Editor.previous(editor);
                const prevNode = prevNodeEntry && prevNodeEntry[0];

                if (isCaretAfterImage(editor)) {
                  event.preventDefault();
                  console.log('IS AFTER!');
                }
              }

              if (isBlockActive(editor, BlockFormat.Image)) {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  Transforms.insertNodes(editor, {
                    type: BlockFormat.Paragraph,
                    children: [{ text: '' }],
                  });
                  // editor.addMark(MarkFormat.Placeholder, true);
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
