import { useState } from 'react';

interface Props {
    value: string;
}
function OpponentSquare({ value }: Props) {
    // note the use of jsx in onClick attribute and button content
    return <button className="opponent-square">{value}</button>;
}

export default OpponentSquare;
