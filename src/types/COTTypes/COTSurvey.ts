declare interface COTSurvey {
  chat: QuestionChat[]
  _id: ObjectId
  code: String
}

declare interface QuestionChat {
  contentArray: Question[]
  isActive: boolean
}

declare interface Question {
  identifier: string,
  display: string[]
  contentType: string
  code: string
}