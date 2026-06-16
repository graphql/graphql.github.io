import { writeFile, readFile, rename } from "fs/promises"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

import * as logger from "./logger.ts"

const __dirname = dirname(fileURLToPath(import.meta.url))
const STATE_FILE = resolve(__dirname, "../.sync-state.json")
const TEMP_STATE_FILE = resolve(__dirname, "../.sync-state.json.tmp")

export interface RepositoryState {
  lastCursor?: string
  lastProcessed?: string
  status?: "in-progress" | "error"
}

export interface State {
  version: 1
  repositories: {
    [repository: string]: RepositoryState
  }
}

const initialState: State = {
  version: 1,
  repositories: {},
}

export async function readState(): Promise<State> {
  try {
    const content = await readFile(STATE_FILE, "utf-8")
    const data = JSON.parse(content)
    if (data.version !== 1) {
      logger.warn(
        `State file has unexpected version ${data.version}. Starting fresh.`,
      )
      return initialState
    }
    return data as State
  } catch (error: any) {
    if (error.code === "ENOENT") {
      logger.log("No state file found, starting fresh.")
      return initialState
    }
    logger.error("Error reading state file, starting fresh:", error)
    return initialState
  }
}

export async function writeState(state: State): Promise<void> {
  try {
    const content = JSON.stringify(state, null, 2)
    await writeFile(TEMP_STATE_FILE, content, "utf-8")
    await rename(TEMP_STATE_FILE, STATE_FILE)
  } catch (error: unknown) {
    logger.error("Error writing state file:", error)
  }
}
