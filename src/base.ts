import { Dayjs } from "npm:dayjs"

class PostScheduleData {
  constructor(
    public chatIds: number[],
    public messageId: number,
    public date: Dayjs,
    public noSound = false,
    public repost = false,
  ) {}
}

export { PostScheduleData }
