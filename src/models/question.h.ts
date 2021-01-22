export type QuestionData = Partial<{
  question: string
  id: string
  created: number
  authorId: string
  author: string
  votes: number
  answered: boolean
  userCanVote: boolean
  userCanEdit: boolean
  userCanDelete: boolean
}>
