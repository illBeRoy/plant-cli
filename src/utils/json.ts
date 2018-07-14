export const fromJson = <T = any>(serializedJson: string): T =>
  JSON.parse(serializedJson) as T;

export const toJson = (jsonObject): string =>
  JSON.stringify(jsonObject, null, 2);
