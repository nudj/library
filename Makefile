CWD=$(shell pwd)
BIN:=./node_modules/.bin

.PHONY: build test tdd

build:
	@docker build \
		-t test-image \
		.

test:
	-@docker rm -f test-container 2> /dev/null || true
	@docker run --rm -it \
		--name test-container \
		-v $(CWD)/src/lib:/usr/src/lib \
		-v $(CWD)/src/test:/usr/src/test \
		test-image

tdd:
	-@docker rm -f test-container 2> /dev/null || true
	@docker run --rm -it \
		--name test-container \
    -v $(CWD)/src/lib:/usr/src/lib \
    -v $(CWD)/src/test:/usr/src/test \
		test-image \
		$(BIN)/nodemon \
			--quiet \
			--watch ./ \
			--delay 250ms \
			-x '$(BIN)/standard && $(BIN)/mocha test/*.js || exit 1'
