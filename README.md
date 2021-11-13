# guesstim😎ji

Multiplayer emoji guessing game made with MERN Stack, GraphQL, and WebSockets. [You can view the demo here (may not be playable).](http://www.guesstimoji.com/)

## Instructions

_Setup_

1. Select a board
2. Click play
3. Give the room ID for your friend to join

_Gameplay_

1. Pick an emoji
2. Wait for your friend to ask you a yes/no question about your emoji
3. Answer yes/no
4. Ask your friend a yes/no question about their emoji
5. Click to hide emojis which violate your friend's answer
6. Repeat from step 2

_Winning condition_  
The first player to **_guesstimate_** the other emoji in chat wins

## Technical details

### Front end

State is managed using `react-redux`. The `store` provided by `redux` is made up of the following slices:

-   `roomSlice`
    -   handles room ID, whether the room is full, selected board, and the random emoji that shows in the title
-   `opponentBoardSlice`
    -   handles when opponent hides emojis
-   `gameLogSlice`
    -   handles game log
-   `playersSlice`
    -   handles whether player picked their emoji yet

There is a correspondence between action types and server events, i.e.,  
`room/roomJoined`↔`client:room/roomJoined`,`server:room/roomJoined`.

### Back end

The game logic layer runs on a `node.js` instance. Player picks are stored server side. The server groups client sockets into rooms using `socket.io` and emits game events exclusive to that room. Game state is stored in the `roomHashTable` at this layer.  
The data access/service layer is managed with `mongoose` and the controller layer is managed with `GraphQL`. When the game ends, data from the `roomHashTable` is stored in a `mongodb` collection called `games` in the `guesstimoji` database. Here is an example of a game log stored there:
```
"gameLog": [
    {
        "time": "2020-08-26T03:00:03Z",
        "username": "Player 2",
        "message": "🐙"
    },
    {
        "time": "2020-08-26T02:59:40Z",
        "username": "Player 2",
        "message": "No."
    },
    {
        "time": "2020-08-26T02:59:38Z",
        "username": "Player 1",
        "message": "does it live in water"
    },
    {
        "time": "2020-08-26T02:59:23Z",
        "username": "Player 1",
        "message": "Yes."
    },
    {
        "time": "2020-08-26T02:59:22Z",
        "username": "Player 2",
        "message": "does it have tentacles"
    },
    {
        "time": "2020-08-26T02:58:45Z",
        "username": "Player 2",
        "message": "No."
    },
    {
        "time": "2020-08-26T02:58:14Z",
        "username": "Player 1",
        "message": "is it a bug"
    },
    {
        "time": "2020-08-26T02:57:59Z",
        "username": "Player 1",
        "message": "Yes."
    },
    {
        "time": "2020-08-26T02:57:57Z",
        "username": "Player 2",
        "message": "does it live in water"
    }
]
```

### Running locally

In the root directory, run `npm install` in the `reactApp`, `gameApi`, and `graphQl` directories. The server requires a local instance of `mongodb` running on port 27017. After this and `mongosh` are installed, you can create the database by running `mogosh intializeDb.js` inside the `graphQl` directories. Run `npm start` inside the `reactApp` to start the front end and both APIs.

### Deployment

The website and APIs are served with `.service` unit files in the `/etc/systemd/system` directory. The website is served with this:

```
[Unit]
Description=HTTP Web Server
After=network.target

[Service]
User=root
Type=simple
ExecStart=/var/www/html/serve.sh
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

where `serve.sh` is:

```
#!/bin/bash
cd /var/www/html/build
serve -n -l 80
```

The game logic API is started with this:

```
[Unit]
Description=HTTP Game Logic API
After=network.target

[Service]
User=tommy
Environment=GAME_API_PORT=5000
Type=simple
WorkingDirectory=/var/www/html/gameApi
ExecStart=/usr/bin/node server.js
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

The GraphQL API is started similarly.
