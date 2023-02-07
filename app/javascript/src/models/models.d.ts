import { Moment } from "moment";

export interface PipelineStatus {
  id?: number
  passed: boolean
  reportedTime: string | Date | Moment
}

export interface Project {
  id: number
  name: string
  url: string
  pipelineStatuses?: PipelineStatus[]
  users?: User[]
}

export interface User {
  id: number
  username: string
}
