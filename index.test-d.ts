import {expectType} from 'tsd'
import commonmarkTestSuite from './index.js'

for (const version of Object.values(commonmarkTestSuite)) {
  expectType<string>(version.version)
  expectType<string>(version.date)

  for (const testCase of version.testCases) {
    expectType<string>(testCase.markdown)
    expectType<string>(testCase.html)
    expectType<number>(testCase.example)
    expectType<string>(testCase.section)
  }
}
