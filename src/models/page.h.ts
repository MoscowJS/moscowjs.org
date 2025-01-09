type PageStatus = 'published' | 'draft' | 'archived'
type PageTemplate =
  | 'page'
  | 'speakers'
  | 'contacts'
  | 'events'
  | 'podcastlist'
  | 'qna'

export type Page = {
  id: string
  title: string
  slug: string
  status: PageStatus
  content: string
  template: PageTemplate
  date_created: Date
}
