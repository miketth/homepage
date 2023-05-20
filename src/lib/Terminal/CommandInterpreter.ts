import { cat, cd, ls, mdcat, rm } from "./FakeFiles";
import { goto } from "$app/navigation";
import { sanitize } from "$lib/Terminal/Sanitize";
import { padRight } from "$lib/Utils";

type Invokable = (flags: string[], args: string[]) => string

class Command {
  constructor(
    public name: string,
    public call: Invokable,
    public description: string,
    public hidden: boolean = false,
  ) {}
}

const commands = [
  new Command(
    "echo",
    (_, args) => sanitize(args.join(" ")),
    "type out input"
  ),
  new Command(
    "ls",
    ls,
    "list content"
  ),
  new Command(
    "cat",
    cat,
    "type out file contents"
  ),
  new Command(
    "mdcat",
    mdcat,
    "render file as MarkDown"
  ),
  new Command(
    "cd",
    cd,
    "change directory"
  ),
  new Command(
    "rm",
    rm,
    "remove files"
  ),
  new Command(
    "help",
    help,
    "display help"
  ),
  new Command(
    "thecake",
    (_1, _2) => aperture,
    "is a lie"
  ),
  new Command(
    "exit",
    (_1, _2) => { goto("/cool_vid").then(); return "" },
    "close terminal"
  ),
  new Command(
    "reboot",
    (_1, _2) => { location.reload(); return "" },
    "restart site"
  ),
]

function help(_1: string[], _2: string[]): string {
  const longest = commands.map(c => c.name.length).sort().findLast(() => true) || 0
  return commands
    .filter(c => !c.hidden)
    .map(c => `${padRight(c.name+":", longest+1)} ${c.description}`)
    .join("\n")
}

const commandMap = new Map<string, Invokable>(commands.map(c => [c.name, c.call]))

export function interpret(input: string): string {
  const trimmed = input.trim()
  const tokens = tokenize(trimmed)

  if (tokens.length < 1) {
    return ""
  }

  const cmd = tokens[0]
  const [flags, args] = parseArgs(tokens.slice(1))

  const invoke = commandMap.get(cmd)

  if (invoke == undefined) {
    return `command ${sanitize(cmd)} not found, use help for a list of commands`
  } else {
    return invoke(flags, args)
  }
}



const aperture = `              .,-:;//;:=,
          . :H@@@MM@M#H/.,+%;,
       ,/X+ +M@@M@MM%=,-%HMMM@X/,
     -+@MM; $M@@MH+-,;XMMMM@MMMM@+-
    ;@M@@M- XM@X;. -+XXXXXHHH@M@M#@/.
  ,%MM@@MH ,@%=            .---=-=:=,.
  =@#@@@MX .,              -%HX$$%%%+;
 =-./@M@M$                  .;@MMMM@MM:
 X@/ -$MM/                    .+MM@@@M$
,@M@H: :@:                    . =X#@@@@-
,@@@MMX, .                    /H- ;@M@M=
.H@@@@M@+,                    %MM+..%#$.
 /MMMM@MMH/.                  XM@MH; =;
  /%+%$XHH@$=              , .H@@@@MX,
   .=--------.           -%H.,@@@@@MX,
   .%MM@@@HHHXX$$$%+- .:$MMX =M@@MM%.
     =XMMM@MM@MM#H;,-+HMM@M+ /MMMX=
       =%@M@M#@$-.=$@MM@@@M; %M%=
         ,:+$+-,/H#MMMMMMM@= =,
               =++%%%%+/:-.             
<b>Aperture Labs</b>
<i>We do what we must, because we can</i>
`

function tokenize(line: string) {
  let tokens: string[] = [];

  let token = "";
  let parentheses = "";

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (parentheses) {
      const endOfLine = i == line.length;
      const nextChar = endOfLine ? " " : line[i + 1];
      if (char in ["\"", "'"] && nextChar == " ") {
        parentheses = "";
      } else {
        token += char;
      }
      continue;

    }

    if (char in ["\"", "'"] && token.length == 0) {
      parentheses = char;
      continue;

    }

    if (char == " ") {
      tokens.push(token);
      token = "";
      continue;

    }

    token += char;
  }

  tokens.push(token);

  tokens = tokens.filter(token => token.length > 0);

  return tokens;
}

function parseArgs(tokens: string[]): [string[], string[]] {
  let nomoreflag = false;

  const flags: string[] = [];
  const args: string[] = [];

  tokens.forEach(token => {
    if (nomoreflag) {
      args.push(token);
      return;
    }

    if (token == "--") {
      nomoreflag = true;
      return;
    }

    if (token.length >= 2 && token.slice(0, 2) == "--") {
      flags.push(token.slice(2));
      return;
    }

    if (token[0] == "-") {
      token.slice(1).split("").forEach(flag => flags.push(flag));
      return;
    }

    args.push(token);
  });


  return [flags, args];
}
