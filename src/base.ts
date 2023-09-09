import { Dayjs } from "npm:dayjs"
import { Buttons } from "../db/mod.ts"

class PostScheduleData {
  constructor(
    public chatIds: number[],
    public messageId: number,
    public date: Dayjs,
    public noSound = false,
    public repost = false,
    public text?: string,
    public buttons?: Buttons,
  ) {}
}

export { PostScheduleData }
