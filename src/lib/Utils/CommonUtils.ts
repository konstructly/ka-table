export const isEmpty = (value: any): boolean => (value == null || value.length === 0);

export const objectToString = (obj: unknown): unknown => {
  const isNotPrimitive = typeof obj !== 'object'

  const isNotDate = typeof obj === 'object' && typeof (obj as Date)?.getMonth !== 'function'

  const isObject = isNotPrimitive && isNotDate

  return isObject ? Object.entries(obj as object).reduce((acc, [key, value]) => {
    if (value && (typeof value === 'object' || Array.isArray(value))) {
      return `${acc ? acc + '. ' : ''}${objectToString(value as never)}`
    }

    return `${acc ? acc + ', ' : ''}${key}: ${value}`
  }, '') : obj
}
