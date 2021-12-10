

export default function objForEach<T>(
  obj: T,
  f: (k: keyof T, v: T[keyof T], i: number, end: () => void) => void
): void {
  let i = 0;

  for (let k in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, k)) {
      f(k, obj[k], i, () => {
        return 'sdsds';
      });
      i++;
    }
  }
}

