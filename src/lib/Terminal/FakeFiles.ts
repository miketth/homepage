import { Volume } from "memfs-browser";
import { user } from "$lib/Terminal/CommonData"
import { sanitize } from "./Sanitize";
import { padLeft } from "$lib/Utils";
import MarkdownIt from "markdown-it";


const vol = Volume.fromJSON({
  "welcome.txt": "Hi, I'm Mike, welcome to my website!",
  "about/me.md": `I am a maker at hearth.
I like creating all kinds of projects, for example:
- Electronics (Arduino, ARM SBCs, sensors)
- Home automation 
- Home lab, testing interesting DevOps tools
- Various kinds of development (Go, Kotlin, JS)`,
  "about/funky.txt": `Since you found this file, I see you must be the curious type as well.
Asides from that, I like going on walks and drinking all kinds of hot beverages, be it coffee or tea.`,
})

export let pwd = "/"

function abs(filename: string): string {
  if (filename.length < 1) return "/"
  if (filename[0] == "/") { // absolute
    return filename
  } else {
    return vol.realpathSync(`${pwd}/${filename}`) as string
  }
}

interface entry {
  name: string,
  isDirectory: boolean,
  size: number,
  created: Date,
  nlink: number,
}

export function ls(flags: string[], args: string[]): string {
  const list = flags.includes("l")
  const all = flags.includes("a")

  try {
    let path = pwd
    if (args.length >= 1) {
      path = abs(args[0])
    }

    const names: string[] = []
    if (all) {
      names.push(".", "..")
    }

    names.push( ... vol.readdirSync(path).map(it => it.toString()) )

    const entries: entry[] = names.map(name => {
      const stats = vol.statSync(`${path}/${name}`)
      return {
        name: name,
        isDirectory: stats.isDirectory(),
        size: stats.size,
        created: stats.birthtime,
        nlink: stats.nlink,
      }
    })

    const sizeChars = (entries.map(e => e.size).sort().findLast(() => true) || 0).toString().length

    return entries.map(file => {
      if (!list) {
        return `<span style="color: ${file.isDirectory ? "#50fa7b" : "#fff" }">${sanitize(file.name)}</span>`
      }

      const mode = file.isDirectory ? `drwxrwxrwx` : `-rwxrwxrwx`

      const size = padLeft(`${file.size}`, sizeChars)
      const month = file.created.toLocaleString('default', { month: 'short' })
      const day = padLeft(`${file.created.getDay()}`, 2)
      const time = `${padLeft(`${file.created.getHours()}`, 2, "0")}:${padLeft(`${file.created.getMinutes()}`, 2, "0")}`

      return `${mode} ${file.nlink} ${user} ${user} ${size} ${month} ${day} ${time} <span style="color: ${file.isDirectory ? "#50fa7b" : "#fff" }">${sanitize(file.name)}</span>`
    }).join(list ? "\n" : " ")
  } catch (e) {
    return "ls: file not found"
  }

}

export function cd(flags: string[], args: string[]): string {
  if (args.length != 1) {
    return sanitize("usage: cd <path>")
  }
  pwd = vol.realpathSync(abs(args[0])) as string
  return ""
}

export function cat(flags: string[], args: string[]): string {
  if (args.length < 1) {
    return "usage: cat <filename> [filenames...]"
  }
  try {
    return sanitize(vol.readFileSync(abs(args[0]), 'utf-8') as string)
  } catch (e) {
    //todo
    return `cat: file ${sanitize(args[0])} not found`
  }
}

export function rm(flags: string[], args: string[]): string {
  try {
    vol.rmSync(abs(args[0]))
    return ""
  } catch (e) {
    //todo
    return `rm: file ${sanitize(args[0])} not found`
  }
}

const md = new MarkdownIt()

export function mdcat(flags: string[], args: string[]): string {
  if (args.length < 1) {
    return "usage: mdcat <filename> [filenames...]"
  }
  try {
    return md.render(vol.readFileSync(abs(args[0]), 'utf-8') as string)
  } catch (e) {
    //todo
    return `mdcat: file ${sanitize(args[0])} not found`
  }
}