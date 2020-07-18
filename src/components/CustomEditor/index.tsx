import * as React from 'react';
import { useMemo, useCallback } from 'react';
import { createEditor, Node, Transforms } from 'slate';
import {
  Slate,
  Editable,
  withReact,
  RenderLeafProps,
  RenderElementProps,
} from 'slate-react';
import { withHistory } from 'slate-history';
import { FieldInputProps } from 'formik';

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
  QuoteElement,
} from './elements';

// Helpers
import { useStyles } from './styles';
import {
  toggleMark,
  MarkFormat,
  BlockFormat,
  withImages,
  isBlockActive,
  isCaretAfterImage,
  isCurrentNodeEmpty,
  getPreviousBreakPoint,
} from './helpers';

interface Props extends Omit<FieldInputProps<Node[]>, 'onChange' | 'onBlur'> {
  readonly onChange?: (value: Node[]) => void;
  readonly onBlur?: (event: React.FocusEvent<any>) => void;
  readonly error?: boolean;
  readonly readOnly?: boolean;
}

const readOnlyHandler = () => null;

const CustomEditor: React.FC<Props> = ({
  value,
  onChange,
  error,
  onBlur,
  readOnly,
}) => {
  const classes = useStyles();

  const editor = useMemo(
    () => withImages(withHistory(withReact(createEditor()))),
    []
  );

  const renderElement = useCallback((props) => <Element {...props} />, []);

  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={readOnly || !onChange ? readOnlyHandler : onChange}
      onBlur={readOnly || !onBlur ? readOnlyHandler : onBlur}
    >
      <Grid container spacing={1}>
        {!readOnly && (
          <Grid item xs={12}>
            <Toolbar />
          </Grid>
        )}
        <Grid item xs={12}>
          <Editable
            onBlur={onBlur}
            className={
              error
                ? classes.errorEditor
                : readOnly
                ? undefined
                : classes.editor
            }
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            readOnly={readOnly}
            onKeyDown={(event) => {
              // if (event.key === 'p') {
              //   event.preventDefault();
              //   editor.insertBreak();
              // }

              if (event.key === 'Backspace') {
                if (isCaretAfterImage(editor)) {
                  event.preventDefault();
                  if (isCurrentNodeEmpty(editor)) {
                    Transforms.removeNodes(editor);
                  } else {
                    const breakPoint = getPreviousBreakPoint(editor);
                    if (breakPoint) {
                      Transforms.setSelection(editor, {
                        anchor: breakPoint,
                      });
                    }
                  }
                }
              }

              if (isBlockActive(editor, BlockFormat.Image)) {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  Transforms.insertNodes(editor, {
                    type: BlockFormat.Paragraph,
                    children: [{ text: '' }],
                  });
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

export default CustomEditor;

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
    case BlockFormat.Quote:
      return <QuoteElement {...props} />;
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
