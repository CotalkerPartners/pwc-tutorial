import { cotalkerAPI } from './CotalkerAPI'

export default class Answer {
  public createdAt: Date
  public user: ObjectId
  constructor(
    private cotAnswer: COTAnswer,
  ) {
    this.user = this.cotAnswer.user
    this.createdAt = new Date(this.cotAnswer.createdAt)
  }
  static async fromId(answerId: ObjectId): Promise<Answer> {
    return new Answer(await cotalkerAPI.getAnswer(answerId))
  }

  getString(identifier: string): string {
    return this.cotAnswer.data.find(d => d.identifier === identifier)?.process[0] ?? ''
  }
  getNumber(identifier: string): number {
    return parseFloat(this.cotAnswer.data.find(d => d.identifier === identifier)?.process[0] ?? '') ?? NaN
  }
  getProcess(identifier: string): string[] {
    return this.cotAnswer.data.find(d => d.identifier === identifier)?.process ?? []
  }

  getPropertyResponse<T extends COTProperty>(identifier: string): T|null {
    try {
      const resp = this.cotAnswer.data.find(d => d.identifier === identifier)?.responses[0]
      return  (resp && JSON.parse(resp)) || null
    } catch (error) {
      console.error(error)
      return null
    }
  }

  getIdentifier(identifier: string): COTAnswerData | undefined {
    return this.cotAnswer.data.find(d => d.identifier === identifier)
  }
  async getSubAnswers(identifier: string, waitTime?: number): Promise<Answer[]> {
    const answerData = this.getIdentifier(identifier)
    if (!answerData) return []
    if (answerData.contentType !== 'application/vnd.cotalker.survey+survey') {
      throw new Error(`☠️Answer.getSubAnswer: Identifier ${identifier} is not a survey+survey`)
    }
    if (!answerData.process?.length) return []
    const { uuids } = JSON.parse(answerData.process[0])
    const wait = ((uuids.length > 1) && Math.min(waitTime ?? 100, 100)) || 0
    const subAnswers = []
    for (const uuid of uuids) {
      await new Promise(resolve => setTimeout(resolve, wait))
      subAnswers.push(await Answer.fromId(uuid))
    }
    return subAnswers
  }
  async getUser(): Promise<COTUser> {
    return await cotalkerAPI.getUser(this.user)
  }
}
