export const isEmpty = (value: any): boolean => (value == null || value.length === 0);

export const objectToString = (obj: object): string => Object.entries(obj).reduce((acc, [key, value]) => {
  if (value && (typeof value === 'object' || Array.isArray(value))) {
    return `${acc}${objectToString(value as never)}`
  }

  return `${acc}${key}:${value}`
}, '')
