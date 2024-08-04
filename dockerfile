ARG BUN_VERSION=1.1.21
FROM oven/bun:${BUN_VERSION}-slim
WORKDIR /app
ENV NODE_ENV="production"

COPY package.json bun.lockb ./
RUN bun install --production

COPY . .

CMD ["bun", "run", "start"]
