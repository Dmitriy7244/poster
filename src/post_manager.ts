import { PostScheduleData } from "./base.ts"
import { Post } from "./db.ts"
import { createUserbotFromEnv, Dayjs, Userbot } from "./deps.ts"

class PostManager {
  userbot: Userbot

  constructor(private chatId: number) {
    this.userbot = createUserbotFromEnv()
  }

  async schedulePost(d: PostScheduleData) {
    const messageIds = await this.userbot.getPostMessages(
      this.chatId,
      d.messageId,
    )
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
    await post.deleteOne()
  }

  async reschedulePost(id: string, date: Dayjs) {
    const post = await Post.get(id)
    for (const p of post.chatPosts) {
      await this.userbot.reschedulePost(p.chatId, p.messageIds, date.unix())
    }
  }
}

export default PostManager
