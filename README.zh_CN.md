# js-logging

[![npm package](https://img.shields.io/npm/v/@qubit-ltd/logging.svg)](https://npmjs.com/package/@qubit-ltd/logging)
[![License](https://img.shields.io/badge/License-Apache-blue.svg)](https://www.apache.org/licenses/LICENSE-2.0)
[![English Document](https://img.shields.io/badge/Document-English-blue.svg)](README.md)
[![CircleCI](https://dl.circleci.com/status-badge/img/gh/Haixing-Hu/js-logging/tree/master.svg?style=shield)](https://dl.circleci.com/status-badge/redirect/gh/Haixing-Hu/js-logging/tree/master)
[![Coverage Status](https://coveralls.io/repos/github/Haixing-Hu/js-logging/badge.svg?branch=master)](https://coveralls.io/github/Haixing-Hu/js-logging?branch=master)

[@qubit-ltd/logging] 是一个 JavaScript 库，通过装饰器为类方法和属性提供强大的日志记录功能。
该库旨在与[Vue.js 类组件]无缝集成，为处理 JavaScript 项目中的日志记录提供了优雅的解决方案。

## 特性

- 📝 简单灵活的日志接口，支持不同的日志级别
- 🔍 支持带占位符的格式化日志消息
- 🎯 自动方法日志记录和类日志集成的装饰器
- 🔄 与Vue.js类组件无缝集成
- 🎛️ 可配置的日志级别和输出器
- 🌐 全局和单独的日志记录器管理
- 📋 支持浏览器控制台和自定义输出器

## 安装

使用 npm 或 yarn 安装该库：
```sh
npm install @qubit-ltd/logging
```
或
```sh
yarn add @qubit-ltd/logging
```

## `Logger` 类

`Logger` 类提供了一个简单而灵活的日志记录接口。

### 获取或创建 Logger

你可以通过调用静态方法 `Logger.getLogger(name, options)` 获取一个 `Logger` 实例，其中：
- `name` 是 logger 的标识符。如果已经存在具有相同名称的 logger，则返回该实例；否则将创建一个新的 logger。
- `options`（可选）是一个对象，可能包括：
    - `appender: object`：指定日志消息的输出目的地。此对象必须实现 `trace`、`debug`、`info`、`warn` 和 `error` 方法。
      如果省略，将使用 logger 的现有 appender，或者为新创建的 logger 分配默认 appender。
    - `level: string`：定义日志记录级别（`TRACE`、`DEBUG`、`INFO`、`WARN`、`ERROR`、`NONE`）。不区分大小写。
      如果省略，将使用 logger 的现有日志级别，或者为新创建的 logger 分配默认日志级别。

示例：

```javascript
import Logger from '@qubit-ltd/logging';

// 创建一个使用默认设置的logger
const logger1 = Logger.getLogger('MyLogger');

// 创建一个自定义日志级别的logger
const logger2 = Logger.getLogger('DebugLogger', { level: 'DEBUG' });

// 创建一个带自定义输出器的logger
const customAppender = {
  trace: (message, ...args) => { /* 自定义trace实现 */ },
  debug: (message, ...args) => { /* 自定义debug实现 */ },
  info: (message, ...args) => { /* 自定义info实现 */ },
  warn: (message, ...args) => { /* 自定义warn实现 */ },
  error: (message, ...args) => { /* 自定义error实现 */ },
};
const logger3 = Logger.getLogger('CustomLogger', { appender: customAppender, level: 'INFO' });
```

### 记录日志消息

- `logger.trace(message, ...args)`：记录一个 trace 级别的消息。
- `logger.debug(message, ...args)`：记录一个 debug 级别的消息。
- `logger.info(message, ...args)`：记录一个 info 级别的消息。
- `logger.warn(message, ...args)`：记录一个警告级别的消息。
- `logger.error(message, ...args)`：记录一个错误级别的消息。
- `logger.log(level, message, ...args)`：以指定的日志级别记录消息。

你可以在日志消息中使用占位符动态插入变量：

- `%o` 或 `%O`：JavaScript 对象输出。点击对象名称可以在检查器中查看更多信息。
- `%d` 或 `%i`：整数输出（支持格式化）。例如，`logger.info('Foo %.2d', 1.1)` 将数字输出为两位有效数字并带有前导0：
  `Foo 01`。
- `%s`：字符串输出。
- `%f`：浮点数输出（支持格式化）。例如，`logger.debug("Foo %.2f", 1.1)` 将数字输出为两位小数：`Foo 1.10`。

示例：

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

### 设置日志级别

使用 `logger.setLevel(level)` 调整 logger 的日志级别。

可用的日志级别（从最详细到最简略）：
- `TRACE`：用于调试目的的最详细信息
- `DEBUG`：一般调试信息
- `INFO`：关于应用程序进度的一般信息
- `WARN`：可能需要注意的警告情况
- `ERROR`：需要处理的错误条件
- `NONE`：完全禁用日志记录

所有级别名称不区分大小写。

示例：

```javascript
const logger = Logger.getLogger('MyClass');

// 将级别更改为只显示警告和错误
logger.setLevel('WARN');

// 这些不会显示，因为它们低于WARN级别
logger.trace('这条跟踪消息不会显示');
logger.debug('这条调试消息不会显示');
logger.info('这条信息消息不会显示');

// 这些会显示
logger.warn('这条警告消息会显示');
logger.error('这条错误消息会显示');
```

### 设置日志 Appender

使用 `logger.setAppender(appender)` 为 logger 分配一个自定义的 appender 对象，该对象定义了以下方法：
- `trace(message, ...args)`
- `debug(message, ...args)`
- `info(message ...args)`
- `warn(message, ...args)`
- `error(message, ...args)`

示例：

```javascript
const logger = Logger.getLogger('MyClass');
logger.setAppender(console);    // 将日志消息输出到控制台

// 或者创建一个为所有日志添加时间戳的自定义输出器
const timestampAppender = {
  trace: (message, ...args) => console.trace(`[${new Date().toISOString()}] ${message}`, ...args),
  debug: (message, ...args) => console.debug(`[${new Date().toISOString()}] ${message}`, ...args),
  info: (message, ...args) => console.info(`[${new Date().toISOString()}] ${message}`, ...args),
  warn: (message, ...args) => console.warn(`[${new Date().toISOString()}] ${message}`, ...args),
  error: (message, ...args) => console.error(`[${new Date().toISOString()}] ${message}`, ...args),
};
logger.setAppender(timestampAppender);
```

### 启用或禁用日志记录

- `logger.enable()`：启用日志记录。
- `logger.disable()`：禁用日志记录。
- `logger.setEnabled(enabled)`：动态控制日志记录的启用与禁用。

示例：

```javascript
const logger = Logger.getLogger('MyClass');

// 暂时禁用所有日志
logger.disable();
logger.info('此消息不会被记录');

// 重新启用日志
logger.enable();
logger.info('此消息会被记录');

// 使用条件控制日志记录
const debugMode = process.env.NODE_ENV === 'development';
logger.setEnabled(debugMode);
```

### 管理日志记录器

- `Logger.clearAllLoggers()`：清除所有已注册的日志记录器。
- `Logger.getLevel(name)`：获取特定日志记录器的日志级别。
- `Logger.setLevel(name, level)`：设置特定日志记录器的日志级别。

示例：

```javascript
// 创建多个日志记录器
const apiLogger = Logger.getLogger('API');
const uiLogger = Logger.getLogger('UI');
const dbLogger = Logger.getLogger('Database');

// 在不访问实例的情况下更改特定日志记录器的级别
Logger.setLevel('API', 'DEBUG');
Logger.setLevel('Database', 'ERROR');

// 获取日志记录器的当前级别
const uiLevel = Logger.getLevel('UI');
console.log(`UI Logger级别: ${uiLevel}`);

// 关闭应用程序时清除所有日志记录器
Logger.clearAllLoggers();
```

### 默认级别和 Appender

当创建一个新日志记录器时，如果没有指定级别或 appender，将使用默认的日志级别和 appender。

- `Logger.getDefaultLevel()`：获取默认日志级别。
- `Logger.setDefaultLevel(level)`：设置默认日志级别。
- `Logger.resetDefaultLevel()`：将默认日志级别重置为出厂值。
- `Logger.getDefaultAppender()`：获取默认日志 appender。
- `Logger.setDefaultAppender(appender)`：设置默认日志 appender。
- `Logger.resetDefaultAppender()`：将默认日志 appender 重置为出厂值。

示例：

```javascript
// 获取当前默认级别
const defaultLevel = Logger.getDefaultLevel();
console.log(`默认日志级别: ${defaultLevel}`);

// 为所有新的日志记录器更改默认级别
Logger.setDefaultLevel('DEBUG');

// 所有新的日志记录器现在默认将具有DEBUG级别
const logger = Logger.getLogger('NewLogger'); // 将具有DEBUG级别

// 重置为原始的工厂默认级别
Logger.resetDefaultLevel();
```

### 全局日志管理

- `Logger.setAllLevels(level)`：将指定日志级别应用于所有现有日志记录器。
- `Logger.resetAllLevels()`：将所有现有日志记录器的日志级别重置为默认日志级别。
- `Logger.setAllAppenders(appender)`：将指定日志 appender 应用于所有现有日志记录器。
- `Logger.resetAllAppenders()`：将所有现有日志记录器的日志 appender 重置为默认 appender。

示例：

```javascript
// 创建几个具有不同级别的日志记录器
const logger1 = Logger.getLogger('Logger1', { level: 'TRACE' });
const logger2 = Logger.getLogger('Logger2', { level: 'INFO' });
const logger3 = Logger.getLogger('Logger3', { level: 'ERROR' });

// 一次将所有日志记录器更改为WARN级别
Logger.setAllLevels('WARN');

// 现在所有日志记录器将只显示WARN和ERROR消息
logger1.info('这不会显示');
logger2.warn('这会显示');
logger3.error('这会显示');

// 将所有日志记录器重置为使用默认级别
Logger.resetAllLevels();

// 将自定义输出器应用于所有现有的日志记录器
const fileAppender = { /* ... 记录到文件的实现 ... */ };
Logger.setAllAppenders(fileAppender);
```

### 重置日志记录器

- `Logger.reset()`：将日志记录器重置为出厂状态。这将清除所有已注册的日志记录器、重置默认日志级别和默认日志 appender。

示例：

```javascript
// 在对日志记录器和默认设置进行多次修改后
// 这一个调用将一切重置为工厂设置
Logger.reset();
```

## `@Log` 装饰器

`@Log` 装饰器会自动记录方法签名，包括类名、方法名和参数。

示例：

```javascript
import { Log } from '@qubit-ltd/logging';

class Person {
  @Log
  eat(meal) {
    // 方法实现
    return `正在吃${meal.name}`;
  }
  
  // Log装饰器的自定义选项
  @Log({ level: 'INFO', withResult: true })
  calculateCalories(food, amount) {
    const calories = food.caloriesPerUnit * amount;
    return calories;
  }
}

const person = new Person();
const meal = { name: '早餐', type: '健康' };
person.eat(meal); 
// 记录: "Person.eat({"name":"早餐","type":"健康"})"

const calories = person.calculateCalories({ caloriesPerUnit: 50 }, 4);
// 记录: "Person.calculateCalories({"caloriesPerUnit":50}, 4) => 200"
```

## `@HasLogger` 装饰器

`@HasLogger` 装饰器会为类添加一个命名的日志记录器，可以通过 `logger` 属性访问。

示例：

```javascript
import { HasLogger } from '@qubit-ltd/logging';

@HasLogger
class MyClass {
  foo() {
    this.logger.debug('这是MyClass.foo()');
  }
  
  bar(param) {
    this.logger.info('使用参数处理: %o', param);
    // 使用param做一些事情
    if (param.value < 0) {
      this.logger.warn('检测到负值: %d', param.value);
    }
    return param.value * 2;
  }
}

const instance = new MyClass();
instance.foo();
instance.bar({ value: -5 });
```

## 与 Vue.js 类组件一起使用

你可以在[Vue.js 类组件]中使用 `@Log` 和 `@HasLogger` 装饰器：

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
    this.logger.debug('这是MyComponent.foo()');
    this.message = '点击于 ' + new Date().toLocaleTimeString();
  }
  
  @Log({ level: 'INFO' })
  async fetchData() {
    try {
      this.logger.info('从API获取数据...');
      const response = await fetch('/api/data');
      const data = await response.json();
      this.logger.info('接收到数据: %o', data);
      return data;
    } catch (error) {
      this.logger.error('获取数据失败: %o', error);
      throw error;
    }
  }
}

export default toVue(MyComponent);
```

**注意**：`@HasLogger` 装饰器必须放在 `@Component` 装饰器的**后面**。

## 高级用法

### 创建自定义输出器

你可以创建自定义输出器将日志定向到不同的目的地：

```javascript
// 文件日志输出器（Node.js示例）
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

// 使用自定义输出器
const logger = Logger.getLogger('AppLogger', { appender: fileAppender });
```

### 条件日志记录

```javascript
import Logger from '@qubit-ltd/logging';

function processData(data, options = {}) {
  const logger = Logger.getLogger('DataProcessor');
  
  // 仅在明确请求时启用调试日志
  if (options.debug) {
    logger.setLevel('DEBUG');
  } else {
    logger.setLevel('INFO');
  }
  
  logger.debug('使用选项处理数据: %o', options);
  // 函数的其余部分
}
```

## <span id="contributing">贡献</span>

如果您发现任何问题或有改进建议，请随时在[GitHub 仓库]上提交 issue 或 pull request。

### 开发设置

```bash
# 克隆仓库
git clone https://github.com/Haixing-Hu/js-logging.git
cd js-logging

# 安装依赖
yarn install

# 运行测试
yarn test

# 构建库
yarn build
```

## <span id="license">许可证</span>

[@qubit-ltd/logging] 根据 Apache 2.0 许可证分发。详情请参阅 [LICENSE](LICENSE) 文件。

[@qubit-ltd/logging]: https://npmjs.com/package/@qubit-ltd/logging
[Vue.js 类组件]: https://github.com/Haixing-Hu/vue3-class-component/
[GitHub 仓库]: https://github.com/Haixing-Hu/js-logging
