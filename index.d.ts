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

declare const version: Version

export {
  version as latest,
  version as '0.31.2',
  version as '0.30',
  version as '0.29',
  version as '0.28',
  version as '0.27',
  version as '0.26',
  version as '0.25',
  version as '0.24',
  version as '0.23',
  version as '0.22',
  version as '0.21',
  version as '0.20',
  version as '0.19',
  version as '0.18',
  version as '0.17',
  version as '0.16',
  version as '0.15',
  version as '0.14',
  version as '0.13',
}
