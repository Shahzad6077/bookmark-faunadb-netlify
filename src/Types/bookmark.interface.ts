export interface BOOKMARK_DATA {
  id?: string
  userId: string
  title: string
  link: string
  ts?: number
}

export type BOOKMARK_LIST_TYPE = BOOKMARK_DATA[]
export type BOOKMARK_VARIENT = "CREATE" | "UPDATE"
