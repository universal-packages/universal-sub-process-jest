import { SubProcess } from '@universal-packages/sub-process'
import stripAnsi from 'strip-ansi'

import '../src'

describe('toHaveRun', (): void => {
  it('asserts a command being run', async (): Promise<void> => {
    const subProcess = new SubProcess({ command: 'echo', args: ['test'] })
    await subProcess.run()

    const subProcess2 = new SubProcess({ command: 'echo', args: ['test2'] })
    await subProcess2.run()

    expect(SubProcess).toHaveRun({ command: 'echo', args: ['test'] })
    expect(SubProcess).toHaveRun({ command: 'echo', args: ['test2'] })
    expect(SubProcess).toHaveRun('echo test')
    expect(SubProcess).toHaveRun('echo test2')
    expect(SubProcess).not.toHaveRun({ command: 'echo', args: ['test3'] })
    expect(SubProcess).not.toHaveRun('echo test3')
  })

  it('fails and shows if no commands were run', async (): Promise<void> => {
    let error: Error

    try {
      expect(SubProcess).toHaveRun({ command: 'echo', args: ['test'] })
    } catch (e) {
      error = e
    }

    expect(stripAnsi(error.message)).toBe('expected SubProcess to have run the given command, but no commands were run at all.')
  })

  it('fails and shows the if a command was not run and tells which ones where', async (): Promise<void> => {
    const subProcess = new SubProcess({ command: 'echo', args: ['test'] })
    await subProcess.run()

    const subProcess2 = new SubProcess({ command: 'echo', args: ['test2'] })
    await subProcess2.run()

    let error: Error

    try {
      expect(SubProcess).toHaveRun({ command: 'echo', args: ['test3'] })
    } catch (e) {
      error = e
    }

    expect(stripAnsi(error.message)).toBe(
      `expected SubProcess to have run the given command, but it did not
SubProcesses were:
- Expected
+ Received

  Object {
    "args": Array [
-     "test3",
+     "test",
    ],
    "command": "echo",
  }
- Expected
+ Received

  Object {
    "args": Array [
-     "test3",
+     "test2",
    ],
    "command": "echo",
  }`
    )
  })

  it('fails and shows the if a command was run but it was not expected', async (): Promise<void> => {
    const subProcess = new SubProcess({ command: 'echo', args: ['test'] })
    await subProcess.run()

    let error: Error

    try {
      expect(SubProcess).not.toHaveRun({ command: 'echo', args: ['test'] })
    } catch (e) {
      error = e
    }

    expect(stripAnsi(error.message)).toBe('expected SubProcess to not have run the given command, but it did.')
  })
})
