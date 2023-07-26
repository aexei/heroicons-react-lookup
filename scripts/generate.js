const { glob } = require("glob")
const fs = require("fs").promises

async function getIcons(style) {
  // get all icons files
  let files = await glob(`${__dirname}/../node_modules/@heroicons/react/24/${style}/*.js`)

  // remove index.js
  files = files.filter((file) => !file.includes("index.js"))

  // extract icon names
  files = files.map((file) => file.split("/").pop().replace(/\.js$/, ""))

  // sort alphabetically
  files = files.sort()

  return files
}

async function writePossibleIcons(icons) {
  let data = `/**
* All the possible icons of a lookup as literal union type
*/

export type PossibleIcons =
`

  data += icons.map((icon) => `  | "${icon}"`).join("\n")

  data += `
/**
* All the possible icons of a lookup as an array
*/
    
export const PossibleIconsArray = [    
`

  data += icons.map((icon) => `  "${icon}"`).join(",\n")

  data += `
]
`

  await fs.writeFile(`./src/possibleIcons.ts`, data)
}

async function writeIcons(icons, style, baseStyle) {
  let data = `import * as Icons from "@heroicons/react/${baseStyle}"
import { Lookup } from "./types"
export const lookup: Lookup = {
`

  data += icons.map((icon) => `  ${icon}: Icons.${icon},`).join("\n")

  data += `
}
`

  await fs.writeFile(`./src/${style}Icons.ts`, data)
}

async function main() {
  await Promise.all([
    fs.rm(`./src/possibleIcons.ts`, { force: true }),
    fs.rm(`./src/solidIcons.ts`, { force: true }),
    fs.rm(`./src/miniIcons.ts`, { force: true }),
    fs.rm(`./src/outlineIcons.ts`, { force: true }),
  ])

  const icons = await getIcons("solid")

  await writePossibleIcons(icons)
  await writeIcons(icons, "solid", "24/solid")
  await writeIcons(icons, "mini", "20/solid")
  await writeIcons(icons, "outline", "24/outline")
}

main()
