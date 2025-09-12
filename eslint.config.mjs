////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2024.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////

import config from '@qubit-ltd/eslint-config';
import babelParser from '@babel/eslint-parser';

export default [
  // 继承基础配置
  ...config,

  // 项目特定配置
  {
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          presets: ['@babel/preset-env'],
          plugins: [
            ['@babel/plugin-proposal-decorators', { legacy: true }],
            '@babel/plugin-transform-runtime',
          ],
        },
      },
      globals: {
        // Jest 测试全局变量
        describe: 'readonly',
        it: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        jest: 'readonly',
      },
    },
  },

  // 测试文件特定配置
  {
    files: ['test/**/*.js', 'test/**/*.test.js'],
    rules: {
      'max-classes-per-file': 'off',
    },
  },
];
