function formatMessage(message: string, context?: unknown): unknown[] {
  const timestamp = new Date().toLocaleTimeString()
  const prefix = ""
  if (context) {
    if (typeof context === "object" && context !== null) {
      if (context instanceof Error) {
        return [`${timestamp} | ${context.message} | ${message}`, error]
      } else {
        return [`${timestamp} | ${message}`, context]
      }
    } else {
      return [`${timestamp} | ${context} | ${message}`]
    }
  }
  return [`${prefix} ${message}`]
}

export function log(message: string, context?: unknown): void {
  console.log(...formatMessage(message, context))
}

export function warn(message: string, context?: unknown): void {
  console.warn(...formatMessage(message, context))
}

export function error(message: string, context?: unknown): void {
  console.error(...formatMessage(message, context))
}
