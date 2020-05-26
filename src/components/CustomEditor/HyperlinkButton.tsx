import * as React from 'react';
import { useState, useCallback, useMemo } from 'react';
import { Range, SetSelectionOperation, Editor } from 'slate';
import { useSlate } from 'slate-react';
import { useIntl, MessageDescriptor } from 'react-intl';

// Components
import {
  Button,
  Tooltip,
  TextField,
  IconButton,
  InputAdornment,
  Zoom,
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
import messages from './messages';

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
  const intl = useIntl();

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

  const menuButton = (
    <Tooltip
      TransitionComponent={Zoom}
      placement="top"
      title={intl.formatMessage(messages.hyperlink as MessageDescriptor)}
    >
      <div className={(buttonProps as any).className} style={{ padding: 0 }}>
        <Button
          style={{ height: '100%' }}
          disabled={disabled}
          color="secondary"
          classes={{
            root: classes.root,
          }}
        >
          <LinkIcon />
        </Button>
      </div>
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

  const saveEditorSelection = useCallback(() => {
    const setSelectionOperation: SetSelectionOperation = {
      type: 'set_selection',
      properties: null,
      newProperties:
        editor.selection || editorSelectionState || defaultSelection,
    };
    editor.apply(setSelectionOperation);
  }, [editor, editorSelectionState]);

  const onFocus = useCallback(
    (event: React.FocusEvent<HTMLDivElement>) => {
      event.preventDefault();
      saveEditorSelection();
    },
    [saveEditorSelection]
  );

  const onAdornmentClick = useCallback(
    (setOpen: (isOpen: boolean) => void) => {
      if (!isNewLink) {
        removeLink();
      } else {
        addLink();
      }
      setOpen(false);
    },
    [isNewLink, removeLink, addLink]
  );

  const onKeyPress = useCallback(
    (
      event: React.KeyboardEvent<HTMLDivElement>,
      setOpen: (isOpen: boolean) => void
    ) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        saveEditorSelection();
        if (isNewLink) {
          addLink();
        }
        setOpen(false);
      }
    },
    [isNewLink, addLink, saveEditorSelection]
  );

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
      disabled={disabled}
    >
      {(setOpen) => (
        <TextField
          autoFocus
          variant="outlined"
          value={linkText}
          onFocusCapture={onFocus}
          onChange={handleTextChange}
          onKeyPress={(event) => onKeyPress(event, setOpen)}
          InputProps={{
            classes: { root: classes.dropdownTextfieldInput },
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="insert link"
                  onClick={() => onAdornmentClick(setOpen)}
                  edge="end"
                >
                  {!isNewLink ? <CloseIcon /> : <CheckIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      )}
    </DropdownMenu>
  );
};

export default withStyles(styles)(HyperlinkButton);
