import { PostScheduleData } from "../src/base.ts"
import { dayjs, log } from "../src/deps.ts"
import { createPosterFromEnv } from "../src/mod.ts"

const poster = await createPosterFromEnv()
const channelIds = [-1001984549268, -1001585027208]
const messageId = 7417
const postGroupId = "64f0fd47c489137122ede471"

Deno.test("schedule", async () => {
  const date = dayjs().add(10, "minutes")
  const data = new PostScheduleData(channelIds, messageId, date)
  const groupId = await poster.schedulePost(data)
  data.repost = true
  await poster.schedulePost(data, groupId)
  log("Posts scheduled", { groupId })
})

Deno.test("reschedule", async () => {
  const date = dayjs().add(100, "minutes")
  await poster.reschedulePostGroup(postGroupId, date)
  log("Post group rescheduled")
})

Deno.test("delete", async () => {
  await poster.deletePostGroup(postGroupId)
  log("Post group deleted")
})

Deno.test("getPostMessageIds", async () => {
  const ids = await poster.getPostMessageIds(channelIds[1], 1296)
  log("Post messages found", { ids })
})
