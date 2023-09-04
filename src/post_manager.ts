import { Post } from "../db/mod.ts"
import { PostScheduleData } from "./base.ts"
import { Dayjs, Userbot } from "./deps.ts"

class PostManager {
  constructor(private chatId: number, private userbot: Userbot) {}

  getPostMessageIds(chatId: number, messageId: number) {
    return this.userbot.getPostMessages(chatId, messageId)
  }

  async schedulePost(d: PostScheduleData) {
    const messageIds = await this.getPostMessageIds(this.chatId, d.messageId)
    const post = new Post()
    for (const chatId of d.chatIds) {
      post.addChatPost(
        chatId,
        await this.userbot.copyMessages(
          chatId,
          this.chatId,
          messageIds,
          d.date.unix(),
          d.repost,
          d.noSound,
        ),
      )
    }
    return await post.save()
  }

  async deletePost(id: string) {
    const post = await Post.get(id)
    for (const p of post.chatPosts) {
      await this.userbot.deletePost(p.chatId, p.messageIds)
    }
    await post.delete()
  }

  async reschedulePost(id: string, date: Dayjs) {
    const post = await Post.get(id)
    for (const p of post.chatPosts) {
      await this.userbot.reschedulePost(p.chatId, p.messageIds, date.unix())
    }
  }
}

export default PostManager
