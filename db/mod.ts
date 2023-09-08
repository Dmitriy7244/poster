import { connectClient, Document, DocumentRepo } from "./deps.ts"

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

const chatPostRepo = new DocumentRepo(ChatPost)
const postRepo = new DocumentRepo(Post)
const postGroupRepo = new DocumentRepo(PostGroup)

async function connectToMongo(mongoUrl?: string) {
  await connectClient([chatPostRepo, postRepo, postGroupRepo], mongoUrl)
}

export {
  ChatPost,
  chatPostRepo,
  connectToMongo,
  Post,
  PostGroup,
  postGroupRepo,
  postRepo,
}
