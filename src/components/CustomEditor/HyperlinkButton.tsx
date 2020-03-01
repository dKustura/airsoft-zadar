import React, { useState, useCallback, useMemo } from 'react';
import { Range, SetSelectionOperation } from 'slate';
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

// This selection should never be set but is needed to conform
// the SetSelectionOperation interface
const defaultSelection: Range = {
  anchor: { path: [0, 0], offset: 0 },
  focus: { path: [0, 0], offset: 0 },
};

const HyperlinkButton: React.FC<Props> = ({ classes, ...buttonProps }) => {
  const editor = useSlate();
  const [linkText, setLinkText] = useState('');
  const [
    editorSelectionState,
    setEditorSelectionState,
  ] = useState<Range | null>(null);

  const menuButton = (
    <Tooltip placement="top" title="Hyperlink">
      <Button
        {...buttonProps}
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
  }, []);

  const isLinkActive = isMarkActive(editor, MarkFormat.Link);

  const toggleLink = useCallback(() => {
    toggleMark(editor, MarkFormat.Link);
    editor.addMark(MarkFormat.Href, linkText);
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
    [editor.selection, editorSelectionState]
  );

  const onAdornmentClick = useCallback(() => {
    if (isLinkActive) {
      setLinkText('');
    }
    toggleLink();
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
                {isLinkActive ? <CloseIcon /> : <CheckIcon />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      ></TextField>
    </DropdownMenu>
  );
};

export default withStyles(styles)(HyperlinkButton);
