export async function sleep(milis: number) {
  await new Promise((fulfil) => {setTimeout(fulfil, milis)})
}

export function padRight(text: string, size: number, padChar = " "): string {
  if (text.length > size) return text
  return `${text}${padChar.repeat(size-text.length)}`
}

export function padLeft(text: string, size: number, padChar = " "): string {
  if (text.length > size) return text
  return `${padChar.repeat(size-text.length)}${text}`
}