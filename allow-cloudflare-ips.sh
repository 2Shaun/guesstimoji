#!/bin/bash

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