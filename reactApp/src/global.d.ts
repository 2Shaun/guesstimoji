export as namespace Guesstimoji;

declare global {
    interface ClientJoinData {
        roomId: string;
        // clients will always join with a board selected
        // but Player 1's selected board is the game board
        board: string[];
    }

    interface ServerJoinData extends ClientJoinData {
        roomFull: boolean;
        player: number;
    }

    type HandleJoin = (joinData: ClientJoinData) => void;
    type HandleSubmitTurn = (message: string) => void;

    type Board = {
        emojis: string[];
    };

    type Emoji = {
        emoji: string;
    };

    type Turn = {
        username: string;
        message: string;
    };
}

const testGlobal = 'test';

export {};
