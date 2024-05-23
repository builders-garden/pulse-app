export function TransformArrayTo3x3<T>(channels: T[]) {
  return channels.reduce((acc, curr, index, array) => {
    if (index % 3 === 0) {
      const obj: T[] = [curr];
      if (index + 1 < array.length) {
        obj.push(array[index + 1]);
      }
      if (index + 2 < array.length) {
        obj.push(array[index + 2]);
      }
      acc.push(obj);
    }
    return acc;
  }, [] as T[][]);
}
