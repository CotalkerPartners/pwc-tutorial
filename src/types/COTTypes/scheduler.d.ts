declare interface ScheduleBody {
  code: string; owner: string;
  priority?: number; timeoutMinutes?: number
  runVersion?: 'v1' | 'v2' | 'v3'
  execPath: string
  body?: ScheduleBotBody
  time?: Date,
  hooks: ScheduleHook[]
}

type botNext =
  Record<'DEFAULT',string>|
  Record<'SUCCESS'|'ERROR',string>|
  Record<'CREATED'|'NOT-CREATED',string>|
  Record<'STEP'|'DONE',string>
declare type botStage = {
  name: string
  key: string
  data: Record<string, unknown>
  next: botNext
}

interface SchedulePostResponse {
  _id: ObjectId
}

declare interface ScheduleBotBody {
  start: string
  version: 1 | 2 | 3
  maxIterations: number,
  stages: botStage[]
  data: Record<string, unknown>
}

declare type ScheduleHookEvent = 'on-error' | 'on-success' | 'on-finish' | 'on-start'

declare type ScheduleHook = {
  event: ScheduleHookEvent,
  api: string,
  url: string
}

declare type ScheduleExponentialBackoff = {
  maxRetries?: number
  periodMinutes?: number
  retryCount?: number
}

declare type schedulePBBodyFactoryOptions = {
  timestampCode?: boolean,
  startKey?: string,
  timeoutMinutes?: number,
  runVersion?: 'v1'|'v2',
  maxIterations?: number,
  priority?: number,
  exponentialBackoff?: ScheduleExponentialBackoff | null
  hooks?: ScheduleHook[]
}