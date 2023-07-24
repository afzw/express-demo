FROM node:18

ARG WORKDIR=/app/express-demo

WORKDIR ${WORKDIR}

COPY ./dist/ ${WORKDIR}/

EXPOSE 9000

CMD ["node", "src/index.js"]