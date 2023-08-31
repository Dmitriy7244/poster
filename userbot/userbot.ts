import Client from "./client.ts"

class Userbot {
  private client: Client

  constructor(url: string, token: string) {
    this.client = new Client(url, token)
  }

  async copyMessages(
    chat_id: number,
    from_chat_id: number,
    message_ids: number[],
    date: number,
    as_forward = false,
    no_sound = false,
  ) {
    const result = await this.client.post("copyMessages", {
      chat_id,
      from_chat_id,
      message_ids,
      as_forward,
      no_sound,
      schedule_date: date,
    })
    const messageIds = result.message_ids
    if (!messageIds) throw new Error("Bad result")
    return messageIds as number[]
  }

  async getPostMessages(chat_id: number, message_id: number) {
    const data = { chat_id, message_id }
    return (await this.client.post("getPostMessages", data)) as number[]
  }

  async reschedulePost(
    chat_id: number,
    message_ids: number[],
    date: number,
  ) {
    const data = { chat_id, message_ids, date }
    await this.client.post("reschedulePost", data)
  }

  async deletePost(chat_id: number, message_ids: number[]) {
    const data = { chat_id, message_ids }
    await this.client.post("deletePost", data)
  }
}

export default Userbot
