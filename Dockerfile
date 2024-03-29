FROM node:8-alpine
ARG NPM_TOKEN
RUN mkdir -p /usr/src && apk update && apk add zsh git make && mkdir /root/.zsh && git clone https://github.com/zsh-users/zsh-history-substring-search /root/.zsh/zsh-history-substring-search && git clone https://github.com/zsh-users/zsh-autosuggestions /root/.zsh/zsh-autosuggestions && git clone https://github.com/zsh-users/zsh-syntax-highlighting /root/.zsh/zsh-syntax-highlighting
WORKDIR /usr/src
COPY src /usr/src
RUN npm i
CMD ./node_modules/.bin/standard --verbose && ./node_modules/.bin/mocha --recursive
