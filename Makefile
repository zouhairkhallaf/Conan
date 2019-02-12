tag = latest
org = bondco
repo = hamilton-proxy
image = $(org)/$(repo):$(tag)
clean_dirs = node_modules .nyc_output coverage npm-debug.log
NODE_ENV := development

default: help

clean:
	-@rm -rf $(clean_dirs)

build: clean
	-@docker build --build-arg NODE_ENV=$(NODE_ENV) -t $(image) $(PWD)

run-docker: build
	-@docker rm -f $(repo)_$(tag)
	-@docker run --name $(repo)_$(tag) -d -p 8000:8000 $(image)
	-@docker logs -f $(repo)_$(tag)
deploy: build
	-@docker push $(image)

help:
	@echo "Hamilton Proxy Server tools"
	@echo "make"
	@echo "\tdefaults to 'make help'"
	@echo "make help"
	@echo "\tthis info"
	@echo "make build"
	@echo "\tbuilds the docker image for deploy"
	@echo "make deploy"
	@echo "\tbuilds and pushes the docker image"
	@echo "\tNote: does NOT run any linked services (ex: mongodb)"
	@echo "make clean"
	@echo "\tremoves all build files and docker containers"
