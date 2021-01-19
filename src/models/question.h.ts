export type QuestionData = Partial<{
  question: string
  id: string
  created: number
  authorId: string
  author: string
  votes: number
  userCanVote: boolean
  userCanEdit: boolean
}>  
