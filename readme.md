# commonmark-test-suite

[![Npm Version][package_version_badge]][package_link]
[![MIT License][license_badge]][license_link]
[![Coverage][coverage_badge]][coverage_link]

[coverage_badge]: https://img.shields.io/codecov/c/github/fisker/commonmark-test-suite.svg?style=flat-square
[coverage_link]: https://app.codecov.io/gh/fisker/commonmark-test-suite
[license_badge]: https://img.shields.io/npm/l/commonmark-test-suite.svg?style=flat-square
[license_link]: https://github.com/fisker/commonmark-test-suite/blob/main/license
[package_version_badge]: https://img.shields.io/npm/v/commonmark-test-suite.svg?style=flat-square
[package_link]: https://www.npmjs.com/package/commonmark-test-suite

> CommonMark Test Suite.

[CommonMark Spec](https://spec.commonmark.org/) data in JavaScript.

## Install

```bash
yarn add commonmark-test-suite
```

## Usage

Latest version

```js
import commonmarkTestSuite from 'commonmark-test-suite'

console.log(commonmarkTestSuite.latest)
// =>
// {
//   version: '0.31.2',
//   date: '2024-01-28',
//   testCases: [
//     {
//       markdown: '\tfoo\tbaz\t\tbim\n',
//       html: '<pre><code>foo\tbaz\t\tbim\n</code></pre>\n',
//       example: 1,
//       start_line: 355,
//       end_line: 360,
//       section: 'Tabs'
//     },
//     // ...,
//   ]
// }
```

Legacy versions (0.13 ~ latest)

```js
import commonmarkTestSuite from 'commonmark-test-suite'

console.log(commonmarkTestSuite['0.30'])
// =>
// {
//   version: '0.30',
//   date: '2021-06-19',
//   testCases: [
//     {
//       markdown: '\tfoo\tbaz\t\tbim\n',
//       html: '<pre><code>foo\tbaz\t\tbim\n</code></pre>\n',
//       example: 1,
//       start_line: 356,
//       end_line: 361,
//       section: 'Tabs'
//     },
//     // ...,
//   ]
// }
```
