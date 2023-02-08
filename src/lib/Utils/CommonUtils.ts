export const isEmpty = (value: any): boolean => (value == null || value.length === 0);

export const objectToString = (obj: unknown): unknown => {
  const isNotNull = obj !== undefined && isNaN(obj as number) && obj !== null
  
  const isNotPrimitive = typeof obj === 'object'

  const isNotDate = isNotPrimitive && typeof (obj as Date)?.getMonth !== 'function'

  const isObject = isNotNull && isNotPrimitive && isNotDate

  return isObject ? Object.entries(obj as object).reduce((acc, [key, value]) => {
    if (value && (typeof value === 'object' || Array.isArray(value))) {
      return `${acc ? acc + '. ' : ''}${objectToString(value as never)}`
    }

    return `${acc ? acc + ', ' : ''}${key}: ${value}`
  }, '') : obj
}
