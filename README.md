# js-logging

[![npm package](https://img.shields.io/npm/v/@qubit-ltd/logging.svg)](https://npmjs.com/package/@qubit-ltd/logging)
[![License](https://img.shields.io/badge/License-Apache-blue.svg)](https://www.apache.org/licenses/LICENSE-2.0)
[![中文文档](https://img.shields.io/badge/文档-中文版-blue.svg)](README.zh_CN.md)
[![CircleCI](https://dl.circleci.com/status-badge/img/gh/Haixing-Hu/js-logging/tree/master.svg?style=shield)](https://dl.circleci.com/status-badge/redirect/gh/Haixing-Hu/js-logging/tree/master)
[![Coverage Status](https://coveralls.io/repos/github/Haixing-Hu/js-logging/badge.svg?branch=master)](https://coveralls.io/github/Haixing-Hu/js-logging?branch=master)

[@qubit-ltd/logging] is a JavaScript library that provides powerful 
logging capabilities through decorators for class methods and properties. 
This library is designed to seamlessly integrate with [Vue.js class components], 
offering an elegant solution for handling logging in your JavaScript projects.

## Features

- 📝 Simple and flexible logging interface with different log levels
- 🔍 Support for formatted log messages with placeholders
- 🎯 Decorators for automatic method logging and class logger integration
- 🔄 Seamless integration with Vue.js class components
- 🎛️ Configurable logging levels and appenders
- 🌐 Global and individual logger management
- 📋 Browser console and custom appender support

## Installation

To install the library, use either npm or yarn:
```sh
npm install @qubit-ltd/logging
```
or
```sh
yarn add @qubit-ltd/logging
```

## The `Logger` Class

The `Logger` class provides a simple yet flexible logging interface.

### Get or create a Logger

You can retrieve a `Logger` instance by calling the static method
`Logger.getLogger(name, options)`, where 
- `name` is the identifier of the logger. If a logger with the same name exists,
  it will be returned; otherwise, a new one will be created.
- `options` (optional) is an object that may include:
  - `appender: object`: specifies the output destination for log messages.
    This object must implement `trace`, `debug`, `info`, `warn` and `error`
    methods. If omitted, the existing appender of the logger will be used, or
    the default appender will be assigned to a new logger.
  - `level: string`: defines the logging level (`TRACE`, `DEBUG`, `INFO`, `WARN`,
    `ERROR`, `NONE`). Case-insensitive. If omitted, the existing logging level
    of the logger will be used, or the default logging level will be assigned to
    a new logger. 

Example:

```javascript
import Logger from '@qubit-ltd/logging';

// Create a logger with default settings
const logger1 = Logger.getLogger('MyLogger');

// Create a logger with custom level
const logger2 = Logger.getLogger('DebugLogger', { level: 'DEBUG' });

// Create a logger with custom appender
const customAppender = {
  trace: (message, ...args) => { /* custom trace implementation */ },
  debug: (message, ...args) => { /* custom debug implementation */ },
  info: (message, ...args) => { /* custom info implementation */ },
  warn: (message, ...args) => { /* custom warn implementation */ },
  error: (message, ...args) => { /* custom error implementation */ },
};
const logger3 = Logger.getLogger('CustomLogger', { appender: customAppender, level: 'INFO' });
```

### Logging Messages

- `logger.trace(message, ...args)`: Logs a trace-level message.
- `logger.debug(message, ...args)`: Logs a debug-level message.
- `logger.info(message, ...args)`: Logs an info-level message.
- `logger.warn(message, ...args)`: Logs a warning-level message.
- `logger.error(message, ...args)`: Logs an error-level message.
- `logger.log(level, message, ...args)`: Logs a message in the specified logging level.

You can use placeholders in log messages to dynamically insert variables:

- `%o` or `%O`: JavaScript object output. Clicking the object name opens
  more information about it in the inspector.
- `%d` or` %i`: Integer output (supports formatting). For example, 
  `logger.info('Foo %.2d', 1.1)` will output the number as two significant
  figures with a leading 0: `Foo 01`.
- `%s`: String output.
- `%f`: Floating-point number output (supports formatting). For example,
  `logger.debug("Foo %.2f", 1.1)` will output the number to 2 decimal
  places: `Foo 1.10`.

Example:

```javascript
import Logger from '@qubit-ltd/logging';

const logger = Logger.getLogger('MyClass');
logger.trace('This is a trace message with argument %s and argument %o', 'foo', { bar: 'baz' });
logger.debug('This is a debug message with argument %s and argument %o', 'foo', { bar: 'baz' });
logger.info('This is an info message with argument %s and argument %o', 'foo', { bar: 'baz' });
logger.warn('This is a warning message with argument %s and argument %o', 'foo', { bar: 'baz' });
logger.error('This is an error message with argument %s and argument %o', 'foo', { bar: 'baz' });
const level = 'info';
logger.log(level, 'This is an %s message with argument %s and argument %o', level, 'foo', { bar: 'baz' });
```

### Set the Logging Level

Adjust the logging level for a logger using `logger.setLevel(level)`.

Available levels (from most to least verbose):
- `TRACE`: Most detailed information for debugging purposes
- `DEBUG`: General debugging information
- `INFO`: General information about application progress
- `WARN`: Warning situations that might require attention
- `ERROR`: Error conditions that need handling
- `NONE`: Completely disable logging

All level names are case-insensitive.

Example:

```javascript
const logger = Logger.getLogger('MyClass');

// Change the level to only show warnings and errors
logger.setLevel('WARN');

// These won't be displayed because they're below the WARN level
logger.trace('This trace message will not be displayed');
logger.debug('This debug message will not be displayed');
logger.info('This info message will not be displayed');

// These will be displayed
logger.warn('This warning message will be displayed');
logger.error('This error message will be displayed');
```

### Set the Logging Appender

Use `logger.setAppender(appender)` to assign a custom appender object that defines:
- `trace(message, ...args)`
- `debug(message, ...args)`
- `info(message ...args)`
- `warn(message, ...args)`
- `error(message, ...args)`

Example:

```javascript
const logger = Logger.getLogger('MyClass');
logger.setAppender(console);    // Outputs log messages to the console.

// Or create a custom appender that adds timestamps to all logs
const timestampAppender = {
  trace: (message, ...args) => console.trace(`[${new Date().toISOString()}] ${message}`, ...args),
  debug: (message, ...args) => console.debug(`[${new Date().toISOString()}] ${message}`, ...args),
  info: (message, ...args) => console.info(`[${new Date().toISOString()}] ${message}`, ...args),
  warn: (message, ...args) => console.warn(`[${new Date().toISOString()}] ${message}`, ...args),
  error: (message, ...args) => console.error(`[${new Date().toISOString()}] ${message}`, ...args),
};
logger.setAppender(timestampAppender);
```

### Enable or Disable Logging

- `logger.enable()`: Enable logging.
- `logger.disable()`: Disable logging.
- `logger.setEnabled(enabled)`: Dynamically control logging.

Example:

```javascript
const logger = Logger.getLogger('MyClass');

// Disable all logging temporarily
logger.disable();
logger.info('This message will not be logged');

// Re-enable logging
logger.enable();
logger.info('This message will be logged');

// Use a condition to control logging
const debugMode = process.env.NODE_ENV === 'development';
logger.setEnabled(debugMode);
```

### Managing Loggers

- `Logger.clearAllLoggers()`: Clears all registered loggers.
- `Logger.getLevel(name)`: Retrieves the logging level for a specific logger.
- `Logger.setLevel(name, level)`: Sets the logging level for a specific logger.

Example:

```javascript
// Create multiple loggers
const apiLogger = Logger.getLogger('API');
const uiLogger = Logger.getLogger('UI');
const dbLogger = Logger.getLogger('Database');

// Change a specific logger's level without accessing its instance
Logger.setLevel('API', 'DEBUG');
Logger.setLevel('Database', 'ERROR');

// Get a logger's current level
const uiLevel = Logger.getLevel('UI');
console.log(`UI Logger level: ${uiLevel}`);

// Clear all loggers when shutting down the application
Logger.clearAllLoggers();
```

### Default Levels and Appenders

The default logging levels and appenders are used when creating a new logger 
without specifying the level or appender.

- `Logger.getDefaultLevel()`: Gets the default logging level.
- `Logger.setDefaultLevel(level)`: Sets the default logging level.
- `Logger.resetDefaultLevel()`: Resets the default logging level to the 
  factory value.
- `Logger.getDefaultAppender()`: Gets the default logging appender.
- `Logger.setDefaultAppender(appender)`: Sets the default logging appender.
- `Logger.resetDefaultAppender()`:  Resets the default logging appender to the 
  factory value.

Example:

```javascript
// Get the current default level
const defaultLevel = Logger.getDefaultLevel();
console.log(`Default logging level: ${defaultLevel}`);

// Change the default level for all new loggers
Logger.setDefaultLevel('DEBUG');

// All new loggers will now have DEBUG level by default
const logger = Logger.getLogger('NewLogger'); // Will have DEBUG level

// Reset to the original factory default level
Logger.resetDefaultLevel();
```

### Global Loggers Management

- `Logger.setAllLevels(level)`: Applies a logging level to all existing loggers.
- `Logger.resetAllLevels()`: Resets the logging level of all existing loggers to
  the default logging level.
- `Logger.setAllAppenders(appender)`: Applies a logging appender to all existing
  loggers.
- `Logger.resetAllAppenders()`: Resets the logging appender of all existing loggers
  to the default logging appender.

Example:

```javascript
// Create several loggers with different levels
const logger1 = Logger.getLogger('Logger1', { level: 'TRACE' });
const logger2 = Logger.getLogger('Logger2', { level: 'INFO' });
const logger3 = Logger.getLogger('Logger3', { level: 'ERROR' });

// Change all loggers to WARNING level at once
Logger.setAllLevels('WARN');

// Now all loggers will only display WARN and ERROR messages
logger1.info('This won't be displayed');
logger2.warn('This will be displayed');
logger3.error('This will be displayed');

// Reset all loggers to use the default level
Logger.resetAllLevels();

// Apply a custom appender to all existing loggers
const fileAppender = { /* ... implementation of logging to a file ... */ };
Logger.setAllAppenders(fileAppender);
```

### Reset to Factory Defaults

- `Logger.reset()`: Resets all loggers to the factory default settings. This
  includes clearing all existing loggers, and resetting the default logging 
  level and the default logging appender.
  
Example:

```javascript
// After making many modifications to loggers and defaults
// This single call resets everything to factory settings
Logger.reset();
```

## The `@Log` Decorator

The `@Log` decorator automatically logs the method signature, including the 
class name, method name, and parameters.

Example:

```javascript
import { Log } from '@qubit-ltd/logging';

class Person {
  @Log
  eat(meal) {
    // method implementation
    return `Eating ${meal.name}`;
  }
  
  // Custom options for the Log decorator
  @Log({ level: 'INFO', withResult: true })
  calculateCalories(food, amount) {
    const calories = food.caloriesPerUnit * amount;
    return calories;
  }
}

const person = new Person();
const meal = { name: 'Breakfast', type: 'healthy' };
person.eat(meal); 
// Logs: "Person.eat({"name":"Breakfast","type":"healthy"})"

const calories = person.calculateCalories({ caloriesPerUnit: 50 }, 4);
// Logs: "Person.calculateCalories({"caloriesPerUnit":50}, 4) => 200"
```

## The `@HasLogger` Decorator

The `@HasLogger` decorator adds a named logger to a class, which is accessible
via the `logger` property.

Example:

```javascript
import { HasLogger } from '@qubit-ltd/logging';

@HasLogger
class MyClass {
  foo() {
    this.logger.debug('This is MyClass.foo()');
  }
  
  bar(param) {
    this.logger.info('Processing with parameter: %o', param);
    // do something with param
    if (param.value < 0) {
      this.logger.warn('Negative value detected: %d', param.value);
    }
    return param.value * 2;
  }
}

const instance = new MyClass();
instance.foo();
instance.bar({ value: -5 });
```

## Using with Vue.js Class Components

You can use the `@Log` and `@HasLogger` decorators with [Vue.js class components]:

```javascript
import { HasLogger, Log } from '@qubit-ltd/logging';
import { Component, toVue } from '@qubit-ltd/vue3-class-component';

@Component({
  template: '<p @click="foo">{{ message }}</p>',
})
@HasLogger
class MyComponent {
  
  message = 'hello world';
  
  @Log
  foo() {
    this.logger.debug('This is MyComponent.foo()');
    this.message = 'clicked at ' + new Date().toLocaleTimeString();
  }
  
  @Log({ level: 'INFO' })
  async fetchData() {
    try {
      this.logger.info('Fetching data from API...');
      const response = await fetch('/api/data');
      const data = await response.json();
      this.logger.info('Data received: %o', data);
      return data;
    } catch (error) {
      this.logger.error('Failed to fetch data: %o', error);
      throw error;
    }
  }
}

export default toVue(MyComponent);
```

**Note**: The `@HasLogger` decorator must be placed **after** the `@Component` decorator. 

## Advanced Usage

### Creating a Custom Appender

You can create custom appenders to direct logs to different destinations:

```javascript
// File logging appender (Node.js example)
import fs from 'fs';

const fileAppender = {
  _writeToFile(level, message, ...args) {
    const formattedArgs = args.map(arg => 
      typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
    );
    const logEntry = `[${new Date().toISOString()}] [${level}] ${message} ${formattedArgs.join(' ')}\n`;
    fs.appendFileSync('application.log', logEntry);
  },
  trace: function(message, ...args) { this._writeToFile('TRACE', message, ...args); },
  debug: function(message, ...args) { this._writeToFile('DEBUG', message, ...args); },
  info: function(message, ...args) { this._writeToFile('INFO', message, ...args); },
  warn: function(message, ...args) { this._writeToFile('WARN', message, ...args); },
  error: function(message, ...args) { this._writeToFile('ERROR', message, ...args); }
};

// Use the custom appender
const logger = Logger.getLogger('AppLogger', { appender: fileAppender });
```

### Conditional Logging

```javascript
import Logger from '@qubit-ltd/logging';

function processData(data, options = {}) {
  const logger = Logger.getLogger('DataProcessor');
  
  // Enable debug logging only when explicitly requested
  if (options.debug) {
    logger.setLevel('DEBUG');
  } else {
    logger.setLevel('INFO');
  }
  
  logger.debug('Processing data with options: %o', options);
  // rest of the function
}
```

## <span id="contributing">Contributing</span>

If you find any issues or have suggestions for improvements, please feel free
to open an issue or submit a pull request to the [GitHub repository].

### Development Setup

```bash
# Clone the repository
git clone https://github.com/Haixing-Hu/js-logging.git
cd js-logging

# Install dependencies
yarn install

# Run tests
yarn test

# Build the library
yarn build
```

## <span id="license">License</span>

[@qubit-ltd/logging] is distributed under the Apache 2.0 license.
See the [LICENSE](LICENSE) file for more details.

[@qubit-ltd/logging]: https://npmjs.com/package/@qubit-ltd/logging
[Vue.js class components]: https://github.com/Haixing-Hu/vue3-class-component/
[GitHub repository]: https://github.com/Haixing-Hu/js-logging
