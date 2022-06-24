# must be built and ran with --platform=linux/arm64 on Apple Silicon
FROM nginx:1.23.0-alpine
ADD build build
RUN mv build/* /usr/share/nginx/html