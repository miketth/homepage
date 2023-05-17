import { Volume } from "memfs-browser";
import { user } from "$lib/Terminal/CommonData"
import { sanitize } from "./Sanitize";


const vol = Volume.fromJSON({
  "welcome.txt": "Welcome to my website!",
  "test/asd.txt": "This is asd",
  "test/test2/lol.txt": "oh hi",
})

export let pwd = "/"

function abs(filename: string): string {
  if (filename.length < 1) return "/"
  if (filename[0] == "/") { // absolute
    return filename
  } else {
    return `${pwd}/${filename}`
  }
}

interface entry {
  name: string,
  isDirectory(): boolean
}

export function ls(flags: string[], args: string[]): string {
  const list = flags.includes("l")
  const all = flags.includes("a")

  try {
    let path = pwd
    if (args.length >= 1) {
      path = abs(args[0])
    }

    const entries: entry[] = []
    if (all) {
      [".", ".."].forEach(name => entries.push({
        name,
        isDirectory: () => true,
      }))
    }

    const folderEntries = vol.readdirSync(path, {withFileTypes: true}) as entry[]

    entries.push( ...folderEntries )


    return entries.map(file => {
      if (!list) {
        return `<span style="color: ${file.isDirectory() ? "#50fa7b" : "#fff" }">${sanitize(file.name)}</span>`
      }

      const mode = file.isDirectory() ? `drwxrwxrwx` : `-rwxrwxrwx`
      const inodes = file.isDirectory() ? 2 : 1

      return `${mode} ${inodes} ${user} ${user} size date <span style="color: ${file.isDirectory() ? "#50fa7b" : "#fff" }">${sanitize(file.name)}</span>`
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
    return vol.readFileSync(abs(args[0]), 'utf-8') as string
  } catch (e) {
    //todo
    return `cat: file ${args[0]} not found`
  }
}

export function rm(flags: string[], args: string[]): string {
  try {
    vol.rmSync(abs(args[0]))
    return ""
  } catch (e) {
    //todo
    return `rm: file ${args[0]} not found`
  }
}

