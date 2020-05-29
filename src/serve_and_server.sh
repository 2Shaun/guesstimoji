#!/bin/bash
#
# a script like this should be started on the webserver
# it should not be started with a crontab @reboot
# it should be started with a systemd service
# this is because it should be started
# after the network is ready
# this is done with the After directive in the [Unit]
# configuration of the service file, i.e.,
#   [Unit]
#   After=network.target
#
# the service file should be located in:
# /etc/systemd/system/
# of the webserver
cd /var/www/html
node server.js &
# do not run serve in the background with &
serve -l 80
# TODO: try running on both http and https ports