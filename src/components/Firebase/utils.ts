import firebase from 'firebase';

export const createFunction = <
  T = any,
  R = firebase.functions.HttpsCallableResult
>(
  name: string
): ((data: T) => Promise<R>) => {
  const callable = firebase.functions().httpsCallable(name);
  return async (data: T) => (await callable(data)).data;
};
