const files =  {
  "folder": {},
  "welcome.txt": "Welcome to my website!",
}

type Node = Directory|File

class Directory {
  constructor(
    public name: string,
    public files: Map<string, Node>,
  ) {}

  public mode = "drwxrwxrwx"
}

class File {
  constructor(
    public name: string,
    public data: string,
  ) {}

  public mode = "-rwxrwxrwx"
}

function process(name: string, obj: object|string, upper: Directory|null = null): Node {
  if (typeof obj === 'string'){
    return new File(name, obj)
  }

  const dir = new Directory(name, new Map<string, Node>())
  for (const [key, value] of Object.entries(obj)) {
    dir.files.set(key, process(key, value, dir))
  }

  dir.files.set(".", dir)
  dir.files.set("..", upper || dir)

  return dir
}

export let pwd = (() => process("/", files))() as Directory

export function ls(args: string[]): string {
  return Array.from(pwd.files).map(([key, val]) => (`${val.mode} ${key}`)).join("\n")
}

export function cd(args: string[]): string {
  const location = args[0]
  if (!pwd.files.has(location)) return `Folder ${location} not found`
  const node = pwd.files.get(location)
  if (node instanceof Directory) {
    pwd = node
    return ""
  } else {
    return `${location} is not a directory`
  }
}

export function cat(args: string[]): string {
  return "TODO: implement feature"
}

export function rm(args: string[]): string {
  return ""
}