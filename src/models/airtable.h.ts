type AirtableThumbnail = {
  width: number
  url: string
  height: number
}

export type AirtableImage = {
  filename: string
  type: string
  url: string
  size: number
  thumbnails: {
    full: AirtableThumbnail
    large: AirtableThumbnail
    small: AirtableThumbnail
  }
}
