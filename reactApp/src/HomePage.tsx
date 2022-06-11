import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import HomePageDiv from './HomePageDiv';
// boards is a map where the key is name
// it returns an object of {data, preview}
import './index.css';
import { useAppSelector } from './redux/hooks';

interface Props {
    handleJoin: HandleJoin;
    roomId: string;
    socket: any;
}

const HomePage = ({ handleJoin, roomId, socket }: Props) => {
    const randomSmiley = useAppSelector((state) => state.room.randomSmiley);
    return (
        <div>
            <h1>{'GUESSTIM' + randomSmiley + 'JI'}</h1>
            <HomePageDiv
                handleJoin={handleJoin}
                roomId={roomId}
                socket={socket}
            />
        </div>
    );
};

export default HomePage;
