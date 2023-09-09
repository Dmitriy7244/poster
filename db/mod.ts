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

type Button = { text: string; url: string }
type Buttons = Button[][]

class Post extends Document {
  constructor(
    public chatPosts: ChatPost[] = [],
    public text?: string,
    public buttons?: Buttons,
  ) {
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

async function getLastPost(postGroupId: string) {
  const group = await postGroupRepo.get(postGroupId)
  const postId = group.postIds[group.postIds.length - 1]
  return await postRepo.get(postId)
}

export {
  type Buttons,
  ChatPost,
  chatPostRepo,
  connectToMongo,
  getLastPost,
  Post,
  PostGroup,
  postGroupRepo,
  postRepo,
}
