import { PostScheduleData } from "./base.ts"
import { PostGroup } from "./db.ts"
import { Dayjs, mongoose } from "./deps.ts"
import PostManager from "./post_manager.ts"

class Poster {
  postMg: PostManager

  constructor(srcChatId: number) {
    this.postMg = new PostManager(srcChatId)
  }

  async connect(mongoUrl: string) {
    await mongoose.connect(mongoUrl)
  }

  async schedulePost(data: PostScheduleData, groupId?: string) {
    const postId = await this.postMg.schedulePost(data)
    let group: PostGroup
    if (!groupId) group = new PostGroup()
    else group = await PostGroup.get(groupId)
    group.postIds.push(postId)
    return await PostGroup.save(group)
  }

  async deletePostGroup(id: string) {
    const group = await PostGroup.get(id)
    for (const postId of group.postIds) {
      await this.postMg.deletePost(postId)
    }
    await group.deleteOne()
  }

  async reschedulePostGroup(id: string, date: Dayjs) {
    const group = await PostGroup.get(id)
    for (const postId of group.postIds) {
      await this.postMg.reschedulePost(postId, date)
    }
  }
}

export default Poster
