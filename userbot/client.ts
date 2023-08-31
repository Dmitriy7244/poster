import { createHeaders, Method, Result } from "./base.ts"

class Client {
  headers: Record<string, string>

  constructor(private url: string, token: string) {
    this.headers = createHeaders(token)
  }

  async post(method: Method, data: object) {
    console.log("Userbot request", { method, data })
    const body = JSON.stringify(data)
    const r = await fetch(this.url + "/" + method, {
      method: "POST",
      headers: this.headers,
      body,
    })
    const json = (await r.json()) as Result
    if (!json.ok) throw new Error(json.error!)
    console.log("Userbot response", json.result)
    return json.result
  }
}

export default Client
