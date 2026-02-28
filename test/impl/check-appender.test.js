import checkAppender from '../../src/impl/check-appender';

describe('checkAppender', () => {
  it('should pass for valid appenders', () => {
    const validAppender = {
      trace: jest.fn(),
      debug: jest.fn(),
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    };
    expect(() => checkAppender(validAppender)).not.toThrow();
  });

  it('should throw TypeError for null or non-object', () => {
    expect(() => checkAppender(null)).toThrow(TypeError);
    expect(() => checkAppender(undefined)).toThrow(TypeError);
    expect(() => checkAppender(123)).toThrow(TypeError);
    expect(() => checkAppender('appender')).toThrow(TypeError);
  });

  it('should throw Error if a required method is missing', () => {
    const invalidAppender = {
      trace: jest.fn(),
      debug: jest.fn(),
      info: jest.fn(),
      // warn is missing
      error: jest.fn(),
    };
    expect(() => checkAppender(invalidAppender)).toThrow(Error);
  });

  it('should throw Error if a required method is not a function', () => {
    const invalidAppender = {
      trace: jest.fn(),
      debug: jest.fn(),
      info: jest.fn(),
      warn: 'not a function',
      error: jest.fn(),
    };
    expect(() => checkAppender(invalidAppender)).toThrow(Error);
  });
});
