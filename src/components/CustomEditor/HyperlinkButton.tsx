import React, { useState, useCallback, useMemo } from 'react';
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
import { MarkFormat } from './helpers';

interface Props extends WithStyles<typeof styles> {
  readonly disabled?: boolean;
}

// This selection should never be set but is needed to conform the SetSelectionOperation interface
const defaultSelection: Range = {
  anchor: { path: [0, 0], offset: 0 },
  focus: { path: [0, 0], offset: 0 },
};

const HyperlinkButton: React.FC<Props> = ({
  disabled,
  classes,
  ...buttonProps
}) => {
  const editor = useSlate();

  const [linkText, setLinkText] = useState('');
  const [currentHref, setCurrentHref] = useState('');

  const isNewLink = useMemo(() => linkText && currentHref !== linkText, [
    linkText,
    currentHref,
  ]);

  const [
    editorSelectionState,
    setEditorSelectionState,
  ] = useState<Range | null>(null);

  // TODO: Fix tooltip when button is disabled
  const menuButton = (
    <Tooltip placement="top" title="Hyperlink">
      <Button
        {...buttonProps}
        disabled={disabled}
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
    setCurrentHref(initialLinkText);
  }, [editor]);

  const addLink = useCallback(() => {
    if (linkText) {
      editor.addMark(MarkFormat.Link, true);
      editor.addMark(MarkFormat.Href, linkText);
      setCurrentHref(linkText);
    }
  }, [editor, linkText]);

  const removeLink = useCallback(() => {
    editor.removeMark(MarkFormat.Link);
    editor.removeMark(MarkFormat.Href);
    setLinkText('');
    setCurrentHref('');
  }, [editor]);

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
    if (!isNewLink) {
      removeLink();
    } else {
      addLink();
    }
  }, [isNewLink, removeLink, addLink]);

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
                {!isNewLink ? <CloseIcon /> : <CheckIcon />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      ></TextField>
    </DropdownMenu>
  );
};

export default withStyles(styles)(HyperlinkButton);
