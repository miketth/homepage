import { Volume } from 'memfs-browser'


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

export function ls(args: string[]): string {
  try {
    let path = pwd
    if (args.length >= 1) {
      path = abs(args[0])
    }

    return vol.readdirSync(path, {withFileTypes: true}).map(file => {
      if (file.isDirectory()) {
        return `drwxrwxrwx ${file.name}`
      } else {
        return `-rwxrwxrwx ${file.name}`
      }
    }).join("\n")
  } catch (e) {
    return "ls: file not found"
  }

}

export function cd(args: string[]): string {
  if (args.length != 1) {
    return "usage: cd <path>"
  }
  pwd = vol.realpathSync(abs(args[0]))
  return ""
}

export function cat(args: string[]): string {
  if (args.length < 1) {
    return "usage: cat <filename> [filenames...]"
  }
  try {
    return vol.readFileSync(abs(args[0]), 'utf-8')
  } catch (e) {
    //todo
    return "cat: file not found"
  }
}

export function rm(args: string[]): string {
  return ""
}