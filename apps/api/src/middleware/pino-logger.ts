import { pinoLogger } from "hono-pino"
import pino from "pino"
import pretty from "pino-pretty"
import env from "@workspace/env-config"

export function pinoLoggerMiddleware() {
  return pinoLogger({
    pino: pino(
      {
        level: env.LOG_LEVEL || "info",
      },
      env.NODE_ENV === "production" ? undefined : pretty()
    ),
    http: {
      reqId: () => crypto.randomUUID(),
    },
  })
}
