interface Result {
  ok: boolean
  error: string | null
  result: Record<string, any>
}

function createHeaders(token: string) {
  return {
    token,
    "Content-Type": "application/json",
  }
}

type Method =
  | "copyMessages"
  | "getPostMessages"
  | "reschedulePost"
  | "deletePost"

export { createHeaders }
export type { Method, Result }
