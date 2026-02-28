import bindWithFunctionBind from '../../src/impl/bind-with-function-bind';
import CustomizedAppender from '../helper/customized-appender';

describe('bindWithFunctionBind', () => {
  it('should bind the logging method with a prefix and \'%s\' pattern', () => {
    const logger = { _name: 'MyLogger' };
    const appender = new CustomizedAppender();
    const method = 'info';
    const level = 'INFO';

    bindWithFunctionBind(logger, method, level, appender);

    expect(typeof logger.info).toBe('function');

    // Call the bound method
    logger.info('test message', 123);

    expect(appender.logs.length).toBe(1);
    expect(appender.logs[0].type).toBe('INFO');
    expect(appender.logs[0].args[0]).toBe('[INFO] MyLogger - %s');
    expect(appender.logs[0].args[1]).toBe('test message');
    expect(appender.logs[0].args[2]).toBe(123);
  });

  it('should bind without logger name if it does not exist', () => {
    const logger = {};
    const appender = new CustomizedAppender();
    const method = 'debug';
    const level = 'DEBUG';

    bindWithFunctionBind(logger, method, level, appender);

    // Call the bound method
    logger.debug('test message');

    expect(appender.logs.length).toBe(1);
    expect(appender.logs[0].type).toBe('DEBUG');
    expect(appender.logs[0].args[0]).toBe('[DEBUG] %s');
    expect(appender.logs[0].args[1]).toBe('test message');
  });
});
