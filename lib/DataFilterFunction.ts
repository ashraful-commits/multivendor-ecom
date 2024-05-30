export function filterDuplicates<T>(data: T[], property: keyof T): T[] {
  const uniqueValues: Set<T[keyof T]> = new Set();
  const uniqueData: T[] = [];

  for (const item of data) {
    const value = item[property];
    if (!uniqueValues.has(value)) {
      uniqueValues.add(value);
      uniqueData.push(item);
    }
  }
  return uniqueData;
}
