FROM oven/bun

WORKDIR /app

COPY build /app

CMD [ "bun", "run", "start" ]