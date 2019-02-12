FROM node:alpine

ARG NODE_ENV
ENV NODE_ENV ${NODE_ENV:-development}
RUN echo "-------------------------------------------------------------->" ${NODE_ENV}
ENV APP_PATH /bbwraper
RUN echo "-------------------------------------------------------------->" ${APP_PATH}
RUN mkdir -p $APP_PATH
ADD package.json $APP_PATH
WORKDIR $APP_PATH
RUN ["rm", "-rf", "node_modules"]

RUN apk add -U --no-cache \
      alpine-sdk \
      python \
      openssl \
      bash \
      git \
    && echo "Fixing PhantomJS" \
    && curl -Ls "https://github.com/dustinblackman/phantomized/releases/download/2.1.1/dockerized-phantomjs.tar.gz" | tar xz -C / \
    && npm install \
    && npm rebuild bcrypt --build-from-source\
    && apk del --purge \
      alpine-sdk \
      git

ADD . $APP_PATH

ENTRYPOINT ["npm"]
CMD ["start"]



EXPOSE 8000