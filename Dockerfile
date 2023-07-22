FROM node:18

ARG WORKDIR=/app/express-demo

WORKDIR ${WORKDIR}

COPY ./dist/ ${WORKDIR}/app

EXPOSE 10240

CMD ["node", "app/src/index.js"]