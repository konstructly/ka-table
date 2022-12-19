import { isEmpty, objectToString } from './CommonUtils';

describe('CommonUtils', () => {
  it('isEmpty', () => {
    expect(isEmpty(null)).toStrictEqual(true);
    expect(isEmpty(undefined)).toStrictEqual(true);
    expect(isEmpty('')).toStrictEqual(true);
    expect(isEmpty(false)).toStrictEqual(false);
  });
});

describe('objectToString', () => {
  it('should return a string from an object', () => {
    const test = {
      a: 'str',
      b: 123,
      c: {
        a: ['str', 'rts'],
        b: {
          a: {
            a: 1234
          },
          b: null
        }
      }
    }

    expect(objectToString(test)).toEqual('a: str, b: 123. 0: str, 1: rts. a: 1234, b: null')
  })

  it('should return a string from array', () => {
    const test = [
      {
        a: 'str',
        b: 123,
        c: {
          a: ['str', 'rts'],
          b: {
            a: {
              a: 1234
            },
            b: null
          }
        }
      },
      {
        a: 'str'
      },
      {
        b: ['a', 'b', 1, 2, 3, 4, {
          a: 'next'
        }]
      }
    ]

    expect(objectToString(test)).toEqual('a: str, b: 123. 0: str, 1: rts. a: 1234, b: null. a: str. 0: a, 1: b, 2: 1, 3: 2, 4: 3, 5: 4. a: next')
  })

  it('should return input', () => {
    expect(objectToString('some string')).toEqual('some string');
    expect(objectToString(null)).toEqual(null);
    expect(objectToString(123)).toEqual(123);

    const date = new Date();
    expect(objectToString(date)).toEqual(date);
  });
})
