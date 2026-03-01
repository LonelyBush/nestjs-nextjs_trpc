import { TRPCMiddleware, MiddlewareOptions } from 'nestjs-trpc';
import { Inject, Injectable, ConsoleLogger } from '@nestjs/common';

@Injectable()
export class LoggedMiddleware implements TRPCMiddleware {
    constructor(
    @Inject(ConsoleLogger) private readonly consoleLogger: ConsoleLogger
  ) {}
  async use(opts: MiddlewareOptions) {
    const start = Date.now();
    const { next, path, type } = opts;
    const result = await next();

    const durationMs = Date.now() - start;
    const meta = { path, type, durationMs }

    result.ok
      ? this.consoleLogger.log('OK request timing:', meta)
      : this.consoleLogger.error('Non-OK request timing', meta);

    return result;
  }
}