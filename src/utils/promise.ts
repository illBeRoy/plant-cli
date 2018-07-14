export const guardPromise = <T>(promise: Promise<T>, fallback: T = null): Promise<T> => {
  return promise.catch(() => fallback);
};
