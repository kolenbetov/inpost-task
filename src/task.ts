export async function dataTree<T, K>(
  getData: () => Promise<{ data: T[] }>,
  processData: (data: T[]) => K[]
): Promise<K[]> {
  const res = await getData();

  if (!res.data) {
    return [];
  }

  return processData(res.data);
}
