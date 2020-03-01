import { Editor, Transforms } from 'slate';

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
}

const isBlockActive = (editor: Editor, format: BlockFormat) => {
  const [match] = Editor.nodes(editor, {
    match: n => n.type === format,
  });

  return !!match;
};

export const isMarkActive = (editor: Editor, format: MarkFormat) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

export const toggleBlock = (editor: Editor, format: BlockFormat) => {
  const isActive = isBlockActive(editor, format);
  // const isList = LIST_TYPES.includes(format)

  // Transforms.unwrapNodes(editor, {
  //   match: n => LIST_TYPES.includes(n.type),
  //   split: true,
  // });

  Transforms.setNodes(editor, {
    // type: isActive ? 'paragraph' : isList ? 'list-item' : format,
    type: isActive ? BlockFormat.Paragraph : format,
  });

  // if (!isActive && isList) {
  //   const block = { type: format, children: [] };
  //   Transforms.wrapNodes(editor, block);
  // }
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
