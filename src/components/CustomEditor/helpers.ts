import { Editor, Text } from 'slate';

export enum MarkFormat {
  Bold = 'bold',
  Italic = 'italic',
  Underline = 'underline',
  Linetrough = 'linetrough',
}

export const isMarkActive = (editor: Editor, format: MarkFormat) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

export const toggleMark = (editor: Editor, format: MarkFormat) => {
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
  textDecoration: [MarkFormat.Underline, MarkFormat.Linetrough],
};

// Mappings between mark formats and their exclusive groups
export const exclusiveMarkFormatGroupMappings: {
  [key in MarkFormat]: MarkFormat[] | undefined;
} = {
  [MarkFormat.Bold]: undefined,
  [MarkFormat.Italic]: undefined,
  [MarkFormat.Underline]: exclusiveMarkFormatGroups.textDecoration,
  [MarkFormat.Linetrough]: exclusiveMarkFormatGroups.textDecoration,
};

export const getTextDecoration = (leaf: Text) => {
  if (leaf[MarkFormat.Underline]) {
    return 'underline';
  } else if (leaf[MarkFormat.Linetrough]) {
    return 'line-through';
  }
  return 'none';
};
