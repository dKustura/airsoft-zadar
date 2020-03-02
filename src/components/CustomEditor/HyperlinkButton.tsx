import React, { useState, useCallback } from 'react';
import { Range, SetSelectionOperation, Editor } from 'slate';
import { useSlate } from 'slate-react';

// Components
import {
  Button,
  Tooltip,
  TextField,
  IconButton,
  InputAdornment,
} from '@material-ui/core';
import DropdownMenu from 'components/DropdownMenu';
import LinkIcon from '@material-ui/icons/Link';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';

// Styling
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { toolbarButtonStyles as styles } from './styles';

// Helpers
import { MarkFormat, toggleMark, isMarkActive } from './helpers';

interface Props extends WithStyles<typeof styles> {}

// This selection should never be set but is needed to conform the SetSelectionOperation interface
const defaultSelection: Range = {
  anchor: { path: [0, 0], offset: 0 },
  focus: { path: [0, 0], offset: 0 },
};

const HyperlinkButton: React.FC<Props> = ({ classes, ...buttonProps }) => {
  const editor = useSlate();

  const [linkText, setLinkText] = useState('');
  const [isLinkActive, setIsLinkActive] = useState(
    isMarkActive(editor, MarkFormat.Link)
  );

  const [
    editorSelectionState,
    setEditorSelectionState,
  ] = useState<Range | null>(null);

  const menuButton = (
    <Tooltip placement="top" title="Hyperlink">
      <Button
        {...buttonProps}
        color="secondary"
        classes={{
          root: classes.root,
        }}
      >
        <LinkIcon />
      </Button>
    </Tooltip>
  );

  const onOpen = useCallback(() => {
    setEditorSelectionState(editor.selection);

    const marks = Editor.marks(editor);
    const initialLinkText =
      marks && marks[MarkFormat.Href] ? marks[MarkFormat.Href] : '';
    setLinkText(initialLinkText);

    const isInitialLinkActive = isMarkActive(editor, MarkFormat.Link);
    setIsLinkActive(isInitialLinkActive);
  }, [editor.selection]);

  const toggleLink = useCallback(() => {
    toggleMark(editor, MarkFormat.Link);
    editor.addMark(MarkFormat.Href, linkText);
    setIsLinkActive(isMarkActive(editor, MarkFormat.Link));
  }, [editor, linkText]);

  // const onKeyPress = useCallback(
  //   (event: React.KeyboardEvent<HTMLDivElement>) => {
  //     if (event.key === 'Enter') {
  //       event.preventDefault();
  //       setLink();
  //     }
  //   },
  //   [toggleLink]
  // );

  const onFocus = useCallback(
    (event: React.FocusEvent<HTMLDivElement>) => {
      event.preventDefault();
      const setSelectionOperation: SetSelectionOperation = {
        type: 'set_selection',
        properties: null,
        newProperties:
          editor.selection || editorSelectionState || defaultSelection,
      };
      editor.apply(setSelectionOperation);
    },
    [editor, editorSelectionState]
  );

  const onAdornmentClick = useCallback(() => {
    if (isLinkActive) {
      setLinkText('');
    }
    if (linkText) {
      toggleLink();
    }
  }, [isLinkActive, toggleLink]);

  const handleTextChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setLinkText(event.target.value);
    },
    []
  );

  return (
    <DropdownMenu
      menuButton={menuButton}
      wrapInMenuList={false}
      onOpen={onOpen}
    >
      <TextField
        autoFocus
        variant="outlined"
        value={linkText}
        onFocusCapture={onFocus}
        onChange={handleTextChange}
        // onKeyPress={onKeyPress}
        InputProps={{
          classes: { root: classes.dropdownTextfieldInput },
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="insert link"
                onClick={onAdornmentClick}
                edge="end"
              >
                {isLinkActive || !linkText ? <CloseIcon /> : <CheckIcon />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      ></TextField>
    </DropdownMenu>
  );
};

export default withStyles(styles)(HyperlinkButton);
