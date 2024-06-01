FROM node:18

ARG WORKDIR=/app/express-server

WORKDIR ${WORKDIR}

COPY ./build/ ${WORKDIR}/

EXPOSE 9000

CMD ["node", "src/main.js"]
