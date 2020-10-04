import { storage as storageNamespace } from 'firebase/app';
import { Node } from 'slate';
import validDataUrl from 'valid-data-url';
import Firebase from 'components/Firebase';
import { BlockFormat } from 'components/CustomEditor/helpers';

export const uploadAndReplaceImages = (
  nodes: Node[],
  firebase: Firebase,
  onError?: (error: Error) => void,
  onComplete?: () => void
) => {
  const newNodesPromises = nodes.map((node) => {
    return new Promise<Node>(function (resolve, reject) {
      if (node.type === BlockFormat.Image && validDataUrl(node.url)) {
        const uploadTask = firebase.doUploadImage(node.url);

        uploadTask.on(
          storageNamespace.TaskEvent.STATE_CHANGED,
          null,
          (error) => {
            if (onError) {
              onError(error);
            }
            reject(error);
          },
          async () => {
            if (onComplete) {
              onComplete();
            }
            const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
            const newNode: Node = { ...node, url: downloadURL };

            resolve(newNode);
          }
        );
      } else {
        resolve(node);
      }
    });
  });

  return Promise.all(newNodesPromises);
};
