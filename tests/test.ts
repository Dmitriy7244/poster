import { PostScheduleData } from "../src/base.ts"
import { dayjs, log } from "../src/deps.ts"
import { createPosterFromEnv } from "../src/mod.ts"

const poster = await createPosterFromEnv()
const channelIds = [-1001984549268, -1001585027208]
const messageId = 7739
const postGroupId = "64fad1d535783161d64da4c4"
const groupId = -1001315549534

const opts = { sanitizeOps: true, sanitizeResources: true }

Deno.test("schedule", opts, async () => {
  const date = dayjs().add(10, "minutes")
  const data = new PostScheduleData(channelIds, messageId, date)
  const groupId = await poster.schedulePost(data)
  data.repost = true
  await poster.schedulePost(data, groupId)
  log("Posts scheduled", { groupId })
})

Deno.test("reschedule", opts, async () => {
  const date = dayjs().add(100, "minutes")
  await poster.reschedulePostGroup(postGroupId, date)
  log("Post group rescheduled")
})

Deno.test("delete", opts, async () => {
  await poster.deletePostGroup(postGroupId)
  log("Post group deleted")
})

Deno.test("getPostMessageIds", opts, async () => {
  const ids = await poster.getPostMessageIds(groupId, messageId)
  log("Post messages found", { ids })
})
