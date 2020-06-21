import { three } from './justATestFile'

describe('test of index.ts', () => {
  test('const three should be 3', () => {
    expect(three).toBe(3)
  })

  test('const three should in the range between 2 and 4', () => {
    expect(three).toBeGreaterThan(2)
    expect(three).toBeLessThan(4)
  })
})
