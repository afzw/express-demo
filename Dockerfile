FROM node:18

ARG WORKDIR=/app/express-demo

WORKDIR ${WORKDIR}

COPY ./dist/main.js ${WORKDIR}

EXPOSE 10240

CMD ["node", ${WORKDIR}/main.js]