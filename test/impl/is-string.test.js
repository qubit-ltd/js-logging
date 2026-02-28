import isString from '../../src/impl/is-string';

describe('isString', () => {
  it('should return true for primitive strings', () => {
    expect(isString('')).toBe(true);
    expect(isString('hello')).toBe(true);
    expect(isString('123')).toBe(true);
  });

  it('should return true for String objects', () => {
    expect(isString(new String(''))).toBe(true);
    expect(isString(new String('hello'))).toBe(true);
  });

  it('should return false for non-string values', () => {
    expect(isString(null)).toBe(false);
    expect(isString(undefined)).toBe(false);
    expect(isString(123)).toBe(false);
    expect(isString(true)).toBe(false);
    expect(isString({})).toBe(false);
    expect(isString([])).toBe(false);
    expect(isString(() => {})).toBe(false);
    expect(isString(Symbol(''))).toBe(false);
  });
});
