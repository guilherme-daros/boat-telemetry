docker kill web_server
docker container rm web_server
docker build -t web-image:v1 .
docker run -d --name web_server -p 80:80 web-image:v1
