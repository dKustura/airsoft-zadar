import { Editor, Transforms, Range, Element, Text } from 'slate';
import { ReactEditor } from 'slate-react';
import { HistoryEditor } from 'slate-history';
import imageExtensions from 'image-extensions';
import isUrl from 'is-url';

type EditorType = Editor & ReactEditor & HistoryEditor;

export enum MarkFormat {
  Bold = 'bold',
  Italic = 'italic',
  Underline = 'underline',
  Strikethrough = 'strikethrough',
  Link = 'link',
  Href = 'href',
}

export enum BlockFormat {
  Header = 'header',
  Subheader = 'subheader',
  Paragraph = 'paragraph',
  BulletedList = 'bulleted-list',
  NumberedList = 'numbered-list',
  ListItem = 'list-item',
  Image = 'image',
}

const isListBlockFormat = (format: BlockFormat) =>
  format === BlockFormat.BulletedList || format === BlockFormat.NumberedList;

export const isBlockActive = (editor: ReactEditor, format: BlockFormat) => {
  const [match] = Editor.nodes(editor, {
    match: n => n.type === format,
  });

  return !!match;
};

export const isMarkActive = (editor: ReactEditor, format: MarkFormat) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

export const toggleBlock = (editor: ReactEditor, format: BlockFormat) => {
  const isActive = isBlockActive(editor, format);
  const isList = isListBlockFormat(format);

  Transforms.unwrapNodes(editor, {
    match: n => isListBlockFormat(n.type),
    split: true,
  });

  Transforms.setNodes(editor, {
    type: isActive
      ? BlockFormat.Paragraph
      : isList
      ? BlockFormat.ListItem
      : format,
  });

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

export const toggleMark = (editor: ReactEditor, format: MarkFormat) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    editor.removeMark(format);
  } else {
    const exclusiveGroup = exclusiveMarkFormatGroupMappings[format];
    if (exclusiveGroup) {
      exclusiveGroup.map(markFormat => editor.removeMark(markFormat));
    }
    editor.addMark(format, true);
  }
};

// Groups of mark formats where only one mark can be active
export const exclusiveMarkFormatGroups = {
  textDecoration: [MarkFormat.Underline, MarkFormat.Strikethrough],
};

// Mappings between mark formats and their exclusive groups
export const exclusiveMarkFormatGroupMappings: {
  [key in MarkFormat]: MarkFormat[] | undefined;
} = {
  [MarkFormat.Bold]: undefined,
  [MarkFormat.Italic]: undefined,
  [MarkFormat.Underline]: exclusiveMarkFormatGroups.textDecoration,
  [MarkFormat.Strikethrough]: exclusiveMarkFormatGroups.textDecoration,
  [MarkFormat.Link]: undefined,
  [MarkFormat.Href]: undefined,
};

export const withImages = (editor: EditorType) => {
  const { insertData, isVoid } = editor;

  editor.isVoid = element => {
    return element.type === BlockFormat.Image ? true : isVoid(element);
  };

  editor.insertData = data => {
    const text = data.getData('text/plain');
    const { files } = data;

    if (files && files.length > 0) {
      for (const file of files) {
        const reader = new FileReader();
        const [mime] = file.type.split('/');

        if (mime === 'image') {
          reader.addEventListener('load', () => {
            const url = reader.result as string;
            insertImage(editor, url);
          });

          reader.readAsDataURL(file);
        }
      }
    } else if (isImageUrl(text)) {
      // TODO If possible, check here if the dropped image is actually dragged from inside the editor,
      // if it is move it instead of copying
      insertImage(editor, text);
    } else {
      insertData(data);
    }
  };

  return editor;
};

const isImageUrl = (url: string) => {
  if (!url) return false;
  if (!isUrl(url)) return false;
  const ext = new URL(url).pathname.split('.').pop();
  return ext && imageExtensions.includes(ext);
};

const insertImage = (editor: EditorType, url: string) => {
  const text = { text: '' };
  const image = { type: 'image', url, children: [text] };
  Transforms.insertNodes(editor, image);
};

export const isCaretAfterImage = (editor: Editor) => {
  if (!editor.selection) return false;
  if (!Range.isCollapsed(editor.selection)) return false;

  const caret = editor.selection.anchor;

  const breakPoint = Editor.before(editor, caret, {
    unit: 'block',
  });
  if (!breakPoint) return false;

  const isBlockStart = caret.offset === 0 && breakPoint.offset === 0;
  if (!isBlockStart) return false;

  const prevNodeEntry = Editor.previous(editor);
  if (!prevNodeEntry) return false;

  const prevNode = prevNodeEntry[0];
  const isAfterImage = prevNode.type === BlockFormat.Image;

  return isAfterImage;
};

export const isCurrentNodeEmpty = (editor: Editor) => {
  if (!editor.selection) return false;

  const currentNodeEntry = Editor.node(editor, editor.selection);
  if (!currentNodeEntry) return false;

  const currentNode = currentNodeEntry[0];
  if (Element.isElement(currentNode)) {
    return Editor.isEmpty(editor, currentNode);
  } else if (Text.isText(currentNode)) {
    return currentNode.text === '';
  }

  return false;
};

export const getPreviousBreakPoint = (editor: Editor) => {
  if (!editor.selection) return null;
  if (!Range.isCollapsed(editor.selection)) return null;

  const caret = editor.selection.anchor;

  const breakPoint = Editor.before(editor, caret, {
    unit: 'block',
  });

  return breakPoint;
};
