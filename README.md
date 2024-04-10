# Sub-Process Jest

[![npm version](https://badge.fury.io/js/@universal-packages%2Fsub-process-jest.svg)](https://www.npmjs.com/package/@universal-packages/sub-process-jest)
[![Testing](https://github.com/universal-packages/universal-sub-process-jest/actions/workflows/testing.yml/badge.svg)](https://github.com/universal-packages/universal-sub-process-jest/actions/workflows/testing.yml)
[![codecov](https://codecov.io/gh/universal-packages/universal-sub-process-jest/branch/main/graph/badge.svg?token=CXPJSN8IGL)](https://codecov.io/gh/universal-packages/universal-sub-process-jest)

Jest matchers for [SubProcess](https://github.com/universal-packages/universal-sub-process) testing.

## Install

```shell
npm install @universal-packages/sub-process-jest

npm install @universal-packages/sub-process
```

## Setup

Add the following to your `jest.config.js` or where you configure Jest:

```js
module.exports = {
  setupFilesAfterEnv: ['@universal-packages/sub-process-jest']
}
```

## Matchers

### toHaveRun

```js
import { SubProcess } from '@universal-packages/sub-process'

it('should logged log', async () => {
  const subProcess = new SubProcess({ command: 'echo', args: ['Hello World'] })

  await subProcess.run()

  expect(SubProcess).toHaveRun({ command: 'echo', args: ['Hello World'] })
})
```

### toHaveRunTotal

```js
import { SubProcess } from '@universal-packages/sub-process'

it('should run a total number of commands', async () => {
  const subProcess = new SubProcess({ command: 'echo', args: ['Hello World'] })

  await subProcess.run()

  expect(SubProcess).toHaveRunTotal(1)
})
```

## Typescript

In order for typescript to see the global types you need to reference the types somewhere in your project, normally `./src/globals.d.ts`.

```ts
/// <reference types="@universal-packages/sub-process-jest" />
```

This library is developed in TypeScript and shipped fully typed.

## Contributing

The development of this library happens in the open on GitHub, and we are grateful to the community for contributing bugfixes and improvements. Read below to learn how you can take part in improving this library.

- [Code of Conduct](./CODE_OF_CONDUCT.md)
- [Contributing Guide](./CONTRIBUTING.md)

### License

[MIT licensed](./LICENSE).
