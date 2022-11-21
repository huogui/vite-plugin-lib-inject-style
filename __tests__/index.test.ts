import { describe, expect, it } from 'vitest'
import fg from 'fast-glob'
import {promises as  fs} from 'fs'
describe('happy path', () => {
  it('transform', async() => {
    const files = await fg('__tests__/src/**',{
      absolute: true
    })
    console.log(files)
  })
})
