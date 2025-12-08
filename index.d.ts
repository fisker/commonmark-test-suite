export type TestCase = {
  readonly markdown: string
  readonly section: string
  readonly html: string
  readonly end_line: number
  readonly start_line: number
  readonly example: number
}

export type Version = {
  readonly version: string
  readonly date: string
  readonly testCases: readonly TestCase[]
}

declare const _: {
  readonly latest: Version
  readonly '0.31.2': Version
  readonly '0.30': Version
  readonly '0.29': Version
  readonly '0.28': Version
  readonly '0.27': Version
  readonly '0.26': Version
  readonly '0.25': Version
  readonly '0.24': Version
  readonly '0.23': Version
  readonly '0.22': Version
  readonly '0.21': Version
  readonly '0.20': Version
  readonly '0.19': Version
  readonly '0.18': Version
  readonly '0.17': Version
  readonly '0.16': Version
  readonly '0.15': Version
  readonly '0.14': Version
  readonly '0.13': Version
}

export default _
