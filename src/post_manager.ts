import { Post, postRepo } from "../db/mod.ts"
import { PostScheduleData } from "./base.ts"
import { Dayjs, Userbot } from "./deps.ts"

class PostManager {
  constructor(private chatId: number, private userbot: Userbot) {}

  getPostMessageIds(chatId: number, messageId: number) {
    return this.userbot.getPostMessages(chatId, messageId)
  }

  async schedulePost(d: PostScheduleData) {
    const messageIds = await this.getPostMessageIds(this.chatId, d.messageId)
    const post = new Post([], d.text, d.buttons)
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
    return await postRepo.save(post)
  }

  async deletePost(id: string) {
    const post = await postRepo.get(id)
    for (const p of post.chatPosts) {
      await this.userbot.deletePost(p.chatId, p.messageIds)
    }
    await postRepo.delete(post)
  }

  async reschedulePost(id: string, date: Dayjs) {
    const post = await postRepo.get(id)
    for (const p of post.chatPosts) {
      await this.userbot.reschedulePost(p.chatId, p.messageIds, date.unix())
    }
  }
}

export default PostManager
