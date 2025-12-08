import assert from 'node:assert'
import {inspect} from 'node:util'
import * as cheerio from 'cheerio'
import {outdent} from 'outdent'
import writePrettierFile from 'write-prettier-file'
import {downloadText} from './utilities.js'

const SPEC_URL = 'https://spec.commonmark.org/'

const DATA_DIRECTORY = new URL('../data/', import.meta.url)
const CACHE_DIRECTORY = new URL('../.cache/', import.meta.url)

async function getVersions() {
  const specHtml = await downloadText(
    SPEC_URL,
    new URL('./spec.html', CACHE_DIRECTORY),
  )

  const $ = cheerio.load(specHtml)
  let listItems = [...$('ul > li')]
  assert.ok(listItems.length > 20)

  const versions = listItems
    .map((li) => {
      // Version <=0.10 don't have links
      if (li.children.length < 3) {
        return
      }

      const versionLink = li.children[0]
      const version = $(versionLink).text().trim()
      assert.ok(/^\d+\.\d+(?:\.\d+)?$/.test(version))
      assert.ok(
        versionLink.type === 'tag' &&
          versionLink.name === 'a' &&
          versionLink.attribs.href === `${version}/`,
      )

      // These two versions json file link are broken
      if (version === '0.11' || version === '0.12') {
        return
      }

      const dateTextNode = li.children[1]
      assert.ok(dateTextNode.type === 'text')
      const dateText = dateTextNode.data.trim()
      const {date} = dateText.match(
        /^\((?<date>\d{4}-\d{2}-\d{2})\) \($/,
      ).groups

      const diffLink = li.children[2]
      assert.ok(
        diffLink.type === 'tag' &&
          diffLink.name === 'a' &&
          diffLink.attribs.href === `${version}/changes.html` &&
          $(diffLink).text().trim() === 'view changes',
      )

      assert.ok(
        li.children[3].type === 'text' && li.children[3].data.trim() === '|',
        inspect(li.children[3]),
      )

      const jsonLink = li.children[4]
      assert.ok(
        jsonLink.type === 'tag' &&
          jsonLink.name === 'a' &&
          jsonLink.attribs.href === `${version}/spec.json` &&
          $(jsonLink).text().trim() === 'test cases',
      )

      return {version, date, url: new URL(jsonLink.attribs.href, SPEC_URL)}
    })
    .filter(Boolean)

  assert.ok(versions.length > 15)
  return versions
}

async function getVersion({version, date, url}) {
  const filename = `${version}.js`
  const text = await downloadText(url, new URL(filename, CACHE_DIRECTORY))

  const testCases = JSON.parse(text)

  await writePrettierFile(
    new URL(filename, DATA_DIRECTORY),
    outdent`
      export default ${JSON.stringify({version, date, testCases}, undefined, 2)}
    `,
  )

  return {
    version,
    filename,
    date,
    testCases,
  }
}

const toSpecifier = (name) =>
  name === 'latest' ? name : `$${name.replaceAll('.', '_')}`
const makeImportDeclaration = ({specifiers, source}) => outdent`
  import {
  ${specifiers.map((specifier) => `  default as ${toSpecifier(specifier)},`).join('\n')}
  } from ${JSON.stringify(source)}
`

async function generateIndexFiles(versions) {
  const jsCode = `
    ${versions
      .map(({filename, version}, index) => [
        makeImportDeclaration({
          specifiers: index === 0 ? ['latest', version] : [version],
          source: `./data/${filename}`,
        }),
      ])
      .join('\n')}

    export default {
      latest,
    ${versions.map(({version}) => `  ${JSON.stringify(version)}: ${toSpecifier(version)},`).join('\n')}
    }
  `

  const dtsCode = outdent`
    export type TestCase = {
      readonly markdown: string;
      readonly section: string;
      readonly html: string;
      readonly end_line: number;
      readonly start_line: number;
      readonly example: number;
    }

    export type Version = {
      readonly version: string;
      readonly date: string;
      readonly testCases: readonly TestCase[];
    }

    declare const _: {
      readonly latest: Version,
      ${versions.map(({version}) => `  readonly ${JSON.stringify(version)}: Version,`).join('\n')}
    }

    export default _
  `

  await Promise.all([
    writePrettierFile(new URL('../index.js', import.meta.url), jsCode),
    writePrettierFile(new URL('../index.d.ts', import.meta.url), dtsCode),
  ])
}

const releases = await getVersions()
const versions = await Promise.all(
  releases.map((release) => getVersion(release)),
)

await generateIndexFiles(versions)
