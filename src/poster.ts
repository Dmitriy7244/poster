import { connectToMongo, PostGroup, postGroupRepo } from "../db/mod.ts"
import { PostScheduleData } from "./base.ts"
import { Dayjs, Userbot } from "./deps.ts"
import PostManager from "./post_manager.ts"

class Poster {
  private postMg: PostManager

  constructor(srcChatId: number, userbot: Userbot) {
    this.postMg = new PostManager(srcChatId, userbot)
  }

  static async create(mongoUrl: string, srcChatId: number, userbot: Userbot) {
    const poster = new Poster(srcChatId, userbot)
    await poster.connect(mongoUrl)
    return poster
  }

  private async connect(mongoUrl?: string) {
    await connectToMongo(mongoUrl)
  }

  async schedulePost(data: PostScheduleData, groupId?: string) {
    const postId = await this.postMg.schedulePost(data)
    let group: PostGroup
    if (!groupId) group = new PostGroup()
    else group = await postGroupRepo.get(groupId)
    group.postIds.push(postId)
    return await postGroupRepo.save(group)
  }

  async deletePostGroup(id: string) {
    const group = await postGroupRepo.get(id)
    for (const postId of group.postIds) {
      await this.postMg.deletePost(postId)
    }
    await postGroupRepo.delete(group)
  }

  async reschedulePostGroup(id: string, date: Dayjs) {
    const group = await postGroupRepo.get(id)
    for (const postId of group.postIds) {
      await this.postMg.reschedulePost(postId, date)
    }
  }

  getPostMessageIds(chatId: number, messageId: number) {
    return this.postMg.getPostMessageIds(chatId, messageId)
  }
}

export default Poster
