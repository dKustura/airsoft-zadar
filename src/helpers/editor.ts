import { Node } from 'slate';

// Workaround for the Formik issue https://github.com/jaredpalmer/formik/issues/805
// ISSUE: Formik turns all empty strings to `undefined` which screws up the Node.string method
export const getNodeString = (node: Node): string => {
  if (isTextNode(node)) {
    return node.text;
  } else {
    return node.children.map(getNodeString).join('');
  }
};

// This is probably not very good considering we should never add a property to Text node named `children`
export const isTextNode = (node: Node) =>
  !node.hasOwnProperty('children') && node.hasOwnProperty('text');

export const getNodesLength = (nodes: Node[]) =>
  nodes
    .map((node) => getNodeString(node))
    .reduce(
      (accumulator, nextNodeString) => accumulator + nextNodeString.length,
      0
    );

export const getAllNodesText = (nodes: Node[]) =>
  nodes
    .map((node) => getNodeString(node))
    .reduce((acc, next) => acc + ' ' + next, '');
