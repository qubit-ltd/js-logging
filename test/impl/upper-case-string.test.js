import upperCaseString from '../../src/impl/upper-case-string';

describe('upperCaseString', () => {
  it('should convert a primitive string to uppercase', () => {
    expect(upperCaseString('hello')).toBe('HELLO');
    expect(upperCaseString('WORLD')).toBe('WORLD');
    expect(upperCaseString('')).toBe('');
  });

  it('should convert a String object to uppercase', () => {
    expect(upperCaseString(new String('hello'))).toBe('HELLO');
  });

  it('should return the original value if it is not a string', () => {
    expect(upperCaseString(null)).toBeNull();
    expect(upperCaseString(undefined)).toBeUndefined();
    expect(upperCaseString(123)).toBe(123);
    expect(upperCaseString(true)).toBe(true);
    expect(upperCaseString({})).toEqual({});
    expect(upperCaseString([])).toEqual([]);
  });
});
