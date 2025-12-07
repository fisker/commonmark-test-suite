import assert from 'node:assert/strict'
import test from 'node:test'
import * as commonmarkTestSuite from './index.js'

const {latest, ...versions} = commonmarkTestSuite

test('latest', () => {
  assert.ok(Object.values(versions).includes(latest))
})

for (const {version, date, testCases} of Object.values(versions)) {
  test(version, () => {
    assert.ok(typeof date === 'string')
    assert.ok(Array.isArray(testCases) && testCases.length !== 0)

    const seenExamples = new Set()
    for (const testCase of testCases) {
      assert.equal(typeof testCase.markdown, 'string')
      assert.equal(typeof testCase.html, 'string')
      assert.equal(typeof testCase.section, 'string')
      assert.equal(typeof testCase.example, 'number')
      assert.ok(!seenExamples.has(testCase.example))
      seenExamples.add(testCase.example)
    }
  })
}
