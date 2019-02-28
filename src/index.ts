interface Debounce {
  (this: any, ...args: any[]): () => any;
  flush: () => void;
  cancel: () => void;
}

export default function debounce(fn: (...args: any[]) => any, delay: number = 0,
                                 immediate?: boolean): Debounce {
  let timerId: number | undefined,
      currArgs: any[],
      context: any,
      result: any;

  const db: Debounce = <Debounce>function (this: any, ...args: any[]) {
      currArgs = args;
      context = this;
      if (immediate && timerId === undefined) {
        timerId = 0;
        result = fn.apply(context, currArgs);
      }
      clearTimeout(timerId);
      timerId = setTimeout(() => {
          if (!immediate && timerId) {
            result = fn.apply(context, currArgs);
          }
          timerId = undefined;
      }, delay);

      return result;
  };

  db.flush = function (): void {
      if (!immediate && timerId) {
          fn.apply(context, currArgs);
          timerId = undefined;
      }
  };

  db.cancel = function (): void {
      clearTimeout(timerId);
      timerId = undefined;
  };

  return db;
}
