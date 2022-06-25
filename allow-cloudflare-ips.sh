#!/bin/bash

# this could be ran on any host machine as cloudflare proxies all requests
# TODO: Find out how to make a file with rule ordering

for range in $(curl https://www.cloudflare.com/ips-v4)
do
    ufw allow proto tcp from $range to any port 80,443
done

for range in $(curl https://www.cloudflare.com/ips-v6)
do
    ufw allow proto tcp from $range to any port 80,443
done

ufw deny 80/tcp
ufw deny 443/tcp