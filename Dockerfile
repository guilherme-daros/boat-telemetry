FROM nginx:alpine
COPY public/ /usr/share/nginx/html
COPY src/ /usr/share/nginx/html/src
