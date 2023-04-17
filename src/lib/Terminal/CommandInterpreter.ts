import rickvid from "$lib/assets/rick.mp4"
import { cat, cd, ls, rm } from "./FakeFiles";
import { goto } from "$app/navigation";

export function interpret(input: string): string {
  const trimmed = input.trim()
  const tokens = trimmed.split(" ")

  if (tokens.length < 1) {
    return ""
  }

  const cmd = tokens[0]
  const args = tokens.slice(1)

  switch (cmd) {
    case "echo":
      return args.join(" ")
    case "thecake":
      return aperture
    case "exit":
      goto("/cool_vid")
      return ""
    case "reboot":
      location.reload()
      return ""
    case "ls":
      return ls(args)
    case "cat":
      return cat(args)
    case "cd":
      return cd(args)
    case "rm":
      return rm(args)
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
