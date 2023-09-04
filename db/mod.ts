import { createClient, Document } from "./deps.ts"

class ChatPost extends Document {
  constructor(public chatId: number, public messageIds: number[]) {
    super()
  }
}

class PostGroup extends Document {
  constructor(public postIds: string[] = []) {
    super()
  }
}

class Post extends Document {
  constructor(public chatPosts: ChatPost[] = []) {
    super()
  }

  addChatPost(chatId: number, messageIds: number[]) {
    const post = new ChatPost(chatId, messageIds)
    this.chatPosts.push(post)
  }
}

async function connectToMongo(mongoUrl?: string) {
  await createClient([ChatPost, Post, PostGroup], mongoUrl)
}

export { ChatPost, connectToMongo, Post, PostGroup }
