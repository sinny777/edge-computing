# Make targets for building the IBM example helloworld edge service

# This imports the variables from horizon/hzn.json. You can ignore these lines, but do not remove them.
-include /Users/gurvindersingh/Documents/personal/Technical/hukam/repository/edge-computing/services/mongodb/horizon/.hzn.json.tmp.mk

# Default ARCH to the architecture of this machines (as horizon/golang describes it)
export ARCH ?= $(shell hzn architecture)

# Build the docker image for the current architecture
build:
	docker build -t $(DOCKER_IMAGE_BASE)_$(ARCH):$(SERVICE_VERSION) -f ./Dockerfile.$(ARCH) .

# Build the docker image for 3 architectures
build-all-arches:
	ARCH=amd64 $(MAKE) build
	ARCH=arm $(MAKE) build
	ARCH=arm64 $(MAKE) build

clean:
	-docker rmi $(DOCKER_IMAGE_BASE)_$(ARCH):$(SERVICE_VERSION) 2> /dev/null || :

clean-all-archs:
	ARCH=amd64 $(MAKE) clean
	ARCH=arm $(MAKE) clean
	ARCH=arm64 $(MAKE) clean

## This imports the variables from horizon/hzn.json. You can ignore these lines, but do not remove them.
/Users/gurvindersingh/Documents/personal/Technical/hukam/repository/edge-computing/services/mongodb/horizon/.hzn.json.tmp.mk: /Users/gurvindersingh/Documents/personal/Technical/hukam/repository/edge-computing/services/mongodb/horizon/hzn.json
	hzn util configconv -f $< > $@

.PHONY: build clean