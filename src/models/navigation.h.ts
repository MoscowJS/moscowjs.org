type NavigationStatus = 'published' | 'draft' | 'archived'

export type Navigation = {
  id: string
  status: NavigationStatus
  title: string
  navigation: string
  order: number
  slug: Array<string>
  customUrl: string
}
