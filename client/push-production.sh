#!/bin/bash

# assumes you're in root folder of the project
cd client
# uncomment any commented import socket
sed -i "s/\/\/import socket/import socket/g" src/pages/game/game.page.js
sed -i "s/\/\/import socket/import socket/g" src/pages/home/home.page.js
# comment out line beginning with: import socket from '../../socketl
sed -i "s/import socket from '..\/..\/socketl/\/\/import socket from '..\/..\/socketl/g" src/pages/game/game.page.js
sed -i "s/import socket from '..\/..\/socketl/\/\/import socket from '..\/..\/socketl/g" src/pages/home/home.page.js
npm run build
cd build
# might want to change this to rsync
scp -r ./* tommy@157.245.254.196:/var/www/html/
cd ..
scp -r ../server/server.js tommy@157.245.254.196:/var/www/html/
# uncomment any commented import socket
sed -i "s/\/\/import socket/import socket/g" src/pages/game/game.page.js
sed -i "s/\/\/import socket/import socket/g" src/pages/home/home.page.js
# comment out line beginning with: import socket from '../../socket'
sed -i "s/import socket from '..\/..\/socket'/\/\/import socket from '..\/..\/socket'/g" src/pages/game/game.page.js
sed -i "s/import socket from '..\/..\/socket'/\/\/import socket from '..\/..\/socket'/g" src/pages/home/home.page.js
cd ..