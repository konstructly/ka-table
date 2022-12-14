import { addElementAttributes, getElementCustomization } from './ComponentUtils';
import { objectToString } from './CommonUtils';

describe('getElementCustomization', () => {
  it('should return content & attributes', () => {
    const contentFunc = () => 'Hello';
    const { content, elementAttributes } = getElementCustomization({
      className: 'customClass'
    }, { propName: 'propNameValue' }, {
      content: contentFunc
    });
    expect(content).toEqual('Hello');
    expect(elementAttributes.className).toEqual('customClass');
  });

  it('should add attributes', () => {
    const contentFunc = () => 'Hello';
    const { content, elementAttributes } = getElementCustomization({
      className: 'customClass'
    }, { propName: 'propNameValue' }, {
      content: contentFunc,
      elementAttributes: () => ({
        className: 'elementAttributesClass',
        tabIndex: 0
      })
    });
    expect(content).toEqual('Hello');
    expect(elementAttributes.className).toEqual('customClass elementAttributesClass');
    expect(elementAttributes.tabIndex).toEqual(0);
  });
});

describe('addElementAttributes', () => {
  it('should merge attributes', () => {
    const props = { propName: 'propNameValue' };
    const childComponent = addElementAttributes({
      className: 'customClass'
    }, props, {
      elementAttributes: (p: any) => ({tabIndex: 2, propNameAttribute: p.propName })
    });
    expect(childComponent.elementAttributes?.(props)).toEqual({
      className: 'customClass',
      tabIndex: 2,
      propNameAttribute: 'propNameValue'
    });
  });
  it('should skip attributes', () => {
    const props = { propName: 'propNameValue' };
    const childComponent = addElementAttributes({
      className: 'customClass'
    }, props, {
    });
    expect(childComponent.elementAttributes?.(props)).toEqual({
      className: 'customClass',
    });
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

    expect(objectToString(test)).toEqual('a:strb:1230:str1:rtsa:1234b:null')
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

    expect(objectToString(test)).toEqual('a:strb:1230:str1:rtsa:1234b:nulla:str0:a1:b2:13:24:35:4a:next')
  })
})
