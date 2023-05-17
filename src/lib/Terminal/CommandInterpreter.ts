import { cat, cd, ls, rm } from "./FakeFiles";
import { goto } from "$app/navigation";

export function interpret(input: string): string {
  const trimmed = input.trim()
  const tokens = tokenize(trimmed)

  if (tokens.length < 1) {
    return ""
  }

  const cmd = tokens[0]
  const [flags, args] = parseArgs(tokens.slice(1))

  switch (cmd) {
    case "echo":
      return args.join(" ")
    case "thecake":
      return aperture
    case "exit":
      goto("/cool_vid").then()
      return ""
    case "reboot":
      location.reload()
      return ""
    case "ls":
      return ls(flags, args)
    case "cat":
      return cat(flags, args)
    case "cd":
      return cd(flags, args)
    case "rm":
      return rm(flags, args)
    default:
      return `command not found: ${cmd}, consult \`help\``
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
