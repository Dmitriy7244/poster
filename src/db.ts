import { getDocument, getModelForClass, prop, saveDocument } from "./deps.ts"

class ChatPost {
  @prop()
  chatId: number
  @prop({ type: Number })
  messageIds: number[]

  constructor(chatId: number, messageIds: number[]) {
    this.chatId = chatId
    this.messageIds = messageIds
  }
}

export class PostGroup {
  @prop({ type: String })
  postIds: string[]

  constructor() {
    this.postIds = []
  }

  static get(id: string) {
    return getDocument(postGroupModel, id)
  }

  static save(doc: PostGroup) {
    return saveDocument(postGroupModel, doc)
  }
}

export class Post {
  @prop({ type: ChatPost })
  chatPosts: ChatPost[]

  constructor() {
    this.chatPosts = []
  }

  addChatPost(chatId: number, messageIds: number[]) {
    const post = new ChatPost(chatId, messageIds)
    this.chatPosts.push(post)
  }

  async save() {
    const r = await postModel.create(this)
    return String(r.id)
  }

  static get(id: string) {
    return getDocument(postModel, id)
  }
}

const postModel = getModelForClass(Post)
const postGroupModel = getModelForClass(PostGroup)
