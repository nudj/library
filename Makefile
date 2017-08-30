CWD=$(shell pwd)
IMAGEDEV:=nudj/library-dev
BIN:=./node_modules/.bin

.PHONY: build test tdd

build:
	@docker build \
		-t $(IMAGEDEV) \
		.

ssh:
	-@docker rm -f library-dev 2> /dev/null || true
	@docker run --rm -it \
		--name library-dev \
		-v $(CWD)/.zshrc:/root/.zshrc \
		-v $(CWD)/src/lib:/usr/src/lib \
		-v $(CWD)/src/test:/usr/src/test \
		-v ${CWD}/src/.npmignore:/usr/src/.npmignore \
		-v ${CWD}/src/client.js:/usr/src/client.js \
		-v ${CWD}/src/index.js:/usr/src/index.js \
		-v $(CWD)/src/package.json:/usr/src/package.json \
		-v ${CWD}/src/server.js:/usr/src/server.js \
		$(IMAGEDEV) \
		/bin/zsh

test:
	-@docker rm -f library-test 2> /dev/null || true
	@docker run --rm -it \
		--name library-test \
		-v $(CWD)/src/lib:/usr/src/lib \
		-v $(CWD)/src/test:/usr/src/test \
		$(IMAGEDEV) \
		/bin/sh -c './node_modules/.bin/standard && ./node_modules/.bin/mocha --recursive test'
