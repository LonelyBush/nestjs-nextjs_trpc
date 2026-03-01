## Запуск

```bash
pnpm install

pnpm trpc:generate

pnpm dev # (api :3000 + web :3001)
```
На фронте по энду /docs - апи документация с ui (как свагер)


## Скрипты

 `pnpm dev`  Запуск api и web параллельно
 `pnpm dev:api`  Только API (NestJS, порт 3000)
 `pnpm dev:web`  Только Web (Next.js, порт 3001)
 `pnpm build`  Сборка всех пакетов
 `pnpm trpc:generate`  Генерация tRPC роутера
