import checkLoggingLevel from '../../src/impl/check-logging-level';

describe('checkLoggingLevel', () => {
  it('should pass for valid logging levels', () => {
    expect(() => checkLoggingLevel('TRACE')).not.toThrow();
    expect(() => checkLoggingLevel('DEBUG')).not.toThrow();
    expect(() => checkLoggingLevel('INFO')).not.toThrow();
    expect(() => checkLoggingLevel('WARN')).not.toThrow();
    expect(() => checkLoggingLevel('ERROR')).not.toThrow();
    expect(() => checkLoggingLevel('NONE')).not.toThrow();
  });

  it('should throw TypeError for non-string values', () => {
    expect(() => checkLoggingLevel(null)).toThrow(TypeError);
    expect(() => checkLoggingLevel(undefined)).toThrow(TypeError);
    expect(() => checkLoggingLevel(123)).toThrow(TypeError);
    expect(() => checkLoggingLevel({})).toThrow(TypeError);
  });

  it('should throw RangeError for unknown logging levels', () => {
    expect(() => checkLoggingLevel('UNKNOWN')).toThrow(RangeError);
    expect(() => checkLoggingLevel('')).toThrow(RangeError);
    expect(() => checkLoggingLevel('debug')).toThrow(RangeError); // Should be uppercase
  });
});
