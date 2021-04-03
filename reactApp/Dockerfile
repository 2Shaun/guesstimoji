FROM nginx:latest
# sets the working director for RUN, CMD, ENTRYPOINT, COPY, and ADD
# this will be a directory ON THE CONTAINER
ADD ./build /usr/share/nginx/html
# takes from <src> and adds them to the filesystem of the 
# container at the path <dest>
# RUN excutes commands in a new layer on top of the current image
# and commits the results
# this committed image will be used for the next step
# may install new version with breaking changes
# <src> = . represents the dir on the host which this Dockerfile is in
# <dest> = . represents the WORKDIR on the container
# I don't think I need it if I'm mounting a volume
# COPY . .
EXPOSE 8080:80