FROM node:18

ARG WORKDIR=/app/express-demo

WORKDIR ${WORKDIR}

COPY ./dist/main.js ${WORKDIR}
COPY ./dist/scripts ${WORKDIR}/scripts

EXPOSE 10240

CMD ["node", "main.js"]