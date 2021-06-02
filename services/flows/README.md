
docker build -t sinny777/edge-flows:1.0.0 .

docker run --rm -it -p 1880:1880 --env-file .env --name flows sinny777/edge-flows_amd64:1.0.0

docker run --rm -it -p 1880:1880 --env-file .env -v `pwd`/data:/data -v `pwd`/certs:/certs  --name flows sinny777/edge-flows_amd64:1.0.0

docker run --rm -p 1880:1880 --env-file .env -v `pwd`/certs:/certs --name flows sinny777/edge-flows_amd64:1.0.0

docker run --rm -it -p 1880:1880 --env-file .env -v `pwd`:/data -v certs:/certs  --name flows sinny777/edge-flows_amd64:1.0.0


