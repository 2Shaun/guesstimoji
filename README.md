## guesstim😎ji
Multiplayer emoji guessing game made with MERN Stack. [You can 'play' the demo here.](http://toso.sh)

### Instructions
*Setup*
1. Select a board
2. Click play
3. Give the room ID for your friend to join

*Gameplay*
1. Pick an emoji
2. Wait for your friend to ask you a yes/no question about your emoji
3. Answer yes/no
4. Ask your friend a yes/no question about their emoji
5. Click to hide emojis which violate your friend's answer
6. Repeat from step 2

*Winning condition* 
The first player to send the opponent's picked emoji in chat wins

### Running locally
In the root directory, run `npm install` in both the `client` and `server` directories. The server requires a local instance of `mongodb` running on port 27017. You must have a database named `guesstimoji` with a collection named `games`. In the `client` directory, run:
```shell
npm start
```
in the `server` directory, run:
```shell
node server
```
