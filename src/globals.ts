import { SubProcessOptions } from '@universal-packages/sub-process'

declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveRun(command: string): R
      toHaveRun(subProcess: Omit<SubProcessOptions, 'engine' | 'engineOptions'>): R
      toHaveRun(commandOrSubProcess: string | Omit<SubProcessOptions, 'engine' | 'engineOptions'>): R
      toHaveRunTotal(count: number): R
    }
  }
}

export {}
