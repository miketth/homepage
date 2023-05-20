import sanitizeHtml from 'sanitize-html'

export function sanitize(text: string): string {
  return sanitizeHtml(text, {
    allowedTags: [],
    allowedAttributes: {},
    disallowedTagsMode: "escape"
  })
}