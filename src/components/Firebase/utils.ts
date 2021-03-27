import firebase from 'firebase/app';
import { OptionalArgTuple } from 'types';
import { all, Collection } from 'typesaurus';

export const createFunction = <
  T = undefined,
  R = firebase.functions.HttpsCallableResult
>(
  functions: firebase.functions.Functions,
  name: string
): ((...data: OptionalArgTuple<T>) => Promise<R>) => {
  const callable = functions.httpsCallable(name);
  return async (...data: OptionalArgTuple<T>) => (await callable(data)).data;
};

export const getAll = <T>(collection: Collection<T>) =>
  all(collection).then((snapshot) => {
    const dataArray: T[] = [];
    snapshot.forEach((doc) => {
      const data: T = {
        id: doc.ref.id,
        ...doc.data,
      };
      dataArray.push(data);
    });
    return dataArray;
  });
