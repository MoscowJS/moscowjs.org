export type QuestionData = Partial<{
  // from database
  question: string
  votes: number
  created: number
  authorId: string
  id: string
  answered: boolean
  published: boolean
  author: string
  talk: string

  // generated
  userCanVote: boolean
}>
