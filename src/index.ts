import { expect } from '@jest/globals'
import { SubProcess, SubProcessOptions, TestEngine } from '@universal-packages/sub-process'

import './globals'

afterEach(() => {
  TestEngine.reset()
})

function toHaveRun(_subProcess: SubProcess, commandOrSubProcess: string | Omit<SubProcessOptions, 'engine' | 'engineOptions'>): jest.CustomMatcherResult {
  const finalSubProcess: SubProcessOptions =
    typeof commandOrSubProcess === 'string' ? { command: commandOrSubProcess.split(' ')[0], args: commandOrSubProcess.split(' ').slice(1) } : commandOrSubProcess

  const subProcessKeys = Object.keys(finalSubProcess)
  const ranSubProcesses = TestEngine.commandHistory.map((inHistorySubProcess) => {
    return Object.keys(inHistorySubProcess).reduce((acc, key) => {
      if (subProcessKeys.includes(key)) {
        acc[key] = inHistorySubProcess[key]
      }

      return acc
    }, {})
  })

  const pass = ranSubProcesses.some((ranSubProcess: SubProcessOptions) => {
    return this.equals(finalSubProcess, ranSubProcess)
  })

  if (pass) {
    return {
      message: () => `expected SubProcess to not have run the given command, but it did.`,
      pass
    }
  } else {
    return {
      message: () => {
        if (ranSubProcesses.length === 0) {
          return `expected SubProcess to have run the given command, but no commands were run at all.`
        } else {
          return `expected SubProcess to have run the given command, but it did not\nSubProcesses were:\n${ranSubProcesses
            .map((ranSubProcess: SubProcessOptions) => this.utils.diff(finalSubProcess, ranSubProcess))
            .join('\n')}`
        }
      },
      pass
    }
  }
}

function toHaveRunTotal(_subProcess: SubProcess, count: number): jest.CustomMatcherResult {
  const pass = TestEngine.commandHistory.length === count

  if (pass) {
    return {
      message: () => `expected SubProcess to not have run a total of ${count} commands, but it did.`,
      pass
    }
  } else {
    return {
      message: () => {
        if (TestEngine.commandHistory.length === 0) {
          return `expected SubProcess to have run a total of ${count} commands, but no commands were run at all.`
        } else {
          return `expected SubProcess to have run a total of ${count} commands, but it ran a total of ${TestEngine.commandHistory.length} commands.`
        }
      },
      pass
    }
  }
}

expect.extend({
  toHaveRun,
  toHaveRunTotal
})
