import { SubProcess } from '@universal-packages/sub-process'
import stripAnsi from 'strip-ansi'

import '../src'

describe('toHaveRunTotal', (): void => {
  it('asserts the total count of commands', async (): Promise<void> => {
    const subProcess = new SubProcess({ command: 'echo', args: ['test'] })
    await subProcess.run()

    const subProcess2 = new SubProcess({ command: 'echo', args: ['test2'] })
    await subProcess2.run()

    expect(SubProcess).toHaveRunTotal(2)
  })

  it('fails and shows if no commands were run', async (): Promise<void> => {
    let error: Error

    try {
      expect(SubProcess).toHaveRunTotal(1)
    } catch (e) {
      error = e
    }

    expect(stripAnsi(error.message)).toBe('expected SubProcess to have run a total of 1 commands, but no commands were run at all.')
  })

  it('fails and shows the if the count does not match the total count', async (): Promise<void> => {
    const subProcess = new SubProcess({ command: 'echo', args: ['test'] })
    await subProcess.run()

    const subProcess2 = new SubProcess({ command: 'echo', args: ['test2'] })
    await subProcess2.run()

    let error: Error

    try {
      expect(SubProcess).toHaveRunTotal(1)
    } catch (e) {
      error = e
    }

    expect(stripAnsi(error.message)).toBe('expected SubProcess to have run a total of 1 commands, but it ran a total of 2 commands.')
  })

  it('fails and shows the if the count does match but it was not expected', async (): Promise<void> => {
    const subProcess = new SubProcess({ command: 'echo', args: ['test'] })
    await subProcess.run()

    const subProcess2 = new SubProcess({ command: 'echo', args: ['test2'] })
    await subProcess2.run()

    let error: Error

    try {
      expect(SubProcess).not.toHaveRunTotal(2)
    } catch (e) {
      error = e
    }

    expect(stripAnsi(error.message)).toBe('expected SubProcess to not have run a total of 2 commands, but it did.')
  })
})
