import getLoggingPrefix from '../../src/impl/get-logging-prefix';

describe('getLoggingPrefix', () => {
  it('should return prefix without logger name if logger name is empty or undefined', () => {
    expect(getLoggingPrefix({}, 'INFO')).toBe('[INFO] ');
    expect(getLoggingPrefix({ _name: '' }, 'DEBUG')).toBe('[DEBUG] ');
  });

  it('should return prefix with logger name', () => {
    expect(getLoggingPrefix({ _name: 'MyLogger' }, 'WARN')).toBe('[WARN] MyLogger - ');
    expect(getLoggingPrefix({ _name: 'ModuleA' }, 'ERROR')).toBe('[ERROR] ModuleA - ');
  });
});
