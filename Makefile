CWD=$(shell pwd)
IMAGEDEV:=nudj/library-dev
BIN:=./node_modules/.bin

.PHONY: build test tdd

build:
	@docker build \
		-t $(IMAGEDEV) \
		--build-arg NPM_TOKEN=${NPM_TOKEN} \
		.

ssh:
	-@docker rm -f library-dev 2> /dev/null || true
	@docker run --rm -it \
		--name library-dev \
		--env-file $(CWD)/.env \
		-e NPM_TOKEN=${NPM_TOKEN} \
		-v $(CWD)/.zshrc:/root/.zshrc \
		-v $(CWD)/src/lib:/usr/src/lib \
		-v $(CWD)/src/test:/usr/src/test \
		-v $(CWD)/src/.npmrc:/usr/src/.npmrc \
		-v ${CWD}/src/.npmignore:/usr/src/.npmignore \
		-v ${CWD}/src/client.js:/usr/src/client.js \
		-v ${CWD}/src/index.js:/usr/src/index.js \
		-v $(CWD)/src/package.json:/usr/src/package.json \
		-v ${CWD}/src/server.js:/usr/src/server.js \
		-v ${CWD}/src/request.js:/usr/src/request.js \
		-v ${CWD}/src/errors.js:/usr/src/errors.js \
		$(IMAGEDEV) \
		/bin/zsh

test:
	-@docker rm -f library-test 2> /dev/null || true
	@docker run --rm -it \
		--name library-test \
		--env-file $(CWD)/.env \
		-e ENVIRONMENT=test \
		-v $(CWD)/src/lib:/usr/src/lib \
		-v $(CWD)/src/test:/usr/src/test \
		-v ${CWD}/src/client.js:/usr/src/client.js \
		-v ${CWD}/src/index.js:/usr/src/index.js \
		-v ${CWD}/src/server.js:/usr/src/server.js \
		-v ${CWD}/src/request.js:/usr/src/request.js \
		-v ${CWD}/src/errors.js:/usr/src/errors.js \
		$(IMAGEDEV)

tdd:
	-@docker rm -f library-test 2> /dev/null || true
	@docker run --rm -it \
		--name library-test \
		--env-file $(CWD)/.env \
		-e ENVIRONMENT=test \
		-v $(CWD)/src/lib:/usr/src/lib \
		-v $(CWD)/src/test:/usr/src/test \
		-v ${CWD}/src/client.js:/usr/src/client.js \
		-v ${CWD}/src/index.js:/usr/src/index.js \
		-v ${CWD}/src/server.js:/usr/src/server.js \
		-v ${CWD}/src/request.js:/usr/src/request.js \
		-v ${CWD}/src/errors.js:/usr/src/errors.js \
		$(IMAGEDEV) \
		/bin/sh -c './node_modules/.bin/nodemon \
			--quiet \
			--watch ./ \
			--delay 250ms \
			-x "./node_modules/.bin/mocha --recursive test || exit 1"'
