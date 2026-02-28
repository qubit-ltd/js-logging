import LOGGING_LEVELS from '../../src/impl/logging-levels';

describe('LOGGING_LEVELS', () => {
  it('should have correct levels', () => {
    expect(LOGGING_LEVELS.TRACE).toBe(0);
    expect(LOGGING_LEVELS.DEBUG).toBe(1);
    expect(LOGGING_LEVELS.INFO).toBe(2);
    expect(LOGGING_LEVELS.WARN).toBe(3);
    expect(LOGGING_LEVELS.ERROR).toBe(4);
    expect(LOGGING_LEVELS.NONE).toBe(5);
  });

  it('should be frozen', () => {
    expect(Object.isFrozen(LOGGING_LEVELS)).toBe(true);
  });
});
