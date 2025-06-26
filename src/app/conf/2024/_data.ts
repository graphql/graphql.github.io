import "server-only"

import { SchedSpeaker, ScheduleSession } from "../_api/sched-types"
import { readSpeakers } from "../_api/sched-data"

export const schedule: ScheduleSession[] = require("../../../../scripts/sync-sched/schedule-2024.json")
export const speakers: SchedSpeaker[] = readSpeakers(2024)
