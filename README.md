# hamilton-proxy-server

### Deployment

Please make use of the make file to run and deploy your docker image:

## 1 - Create a Docker Image:

You can either create a Docker image with clear cash or without.

a - With clear cash use:

docker build --force-rm --no-cache --build-arg NODE_ENV=development -t bondco/hamilton-proxy:v1.0.1-hamilton-dev.51 .

b - Without clearing the cash use the make file as follow:

maker run-docker

## 2- Push to the Cloud

docker push bondco/hamilton-proxy:v1.0.1-hamilton-dev.51

OR

make run docker tag=v1.0.1-hamilton-dev.51


