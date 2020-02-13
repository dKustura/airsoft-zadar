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
import { Typography, Grid } from '@material-ui/core';

// Styling
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from './styles';
import Toolbar from './Toolbar';

interface Props extends WithStyles<typeof styles> {}

const CustomEditor: React.FC<Props> = ({ classes }) => {
  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState<Node[]>([
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ]);

  const renderElement = useCallback((props: RenderElementProps) => {
    switch (props.element.type) {
      // case 'code':
      //   return <CodeElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  // Define a leaf rendering function that is memoized with `useCallback`.
  const renderLeaf = useCallback(props => {
    return <Leaf {...props} />;
  }, []);

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
            // onKeyDown={event => {
            //   if (event.key === 'p') {
            //     event.preventDefault();
            //     editor.insertBreak();
            //   }
            //   if (!event.ctrlKey) {
            //     return;
            //   }

            //   switch (event.key) {
            //     // When "`" is pressed, keep our existing code block logic.
            //     // case '`': {
            //     //   event.preventDefault()
            //     //   EditorCommands.toggleCodeBlock(editor)
            //     //   break
            //     // }

            //     // When "B" is pressed, bold the text in the selection.
            //     case 'b': {
            //       event.preventDefault();
            //       EditorCommands.toggleBoldMark(editor);
            //       break;
            //     }
            //   }
            // }}
          />
        </Grid>
      </Grid>
    </Slate>
  );
};

export default withStyles(styles)(CustomEditor);

// const CodeElement = (props: RenderElementProps) => {
//   return <code {...props.attributes}>{props.children}</code>;
// };

const DefaultElement = (props: RenderElementProps) => {
  return <Typography {...props.attributes}>{props.children}</Typography>;
};

const Leaf = (props: RenderLeafProps) => {
  return (
    <span
      {...props.attributes}
      style={{ fontWeight: props.leaf.bold ? 'bold' : 'normal' }}
    >
      {props.children}
    </span>
  );
};
