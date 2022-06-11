interface Props {
    pick: string;
}

function PickTextBox({ pick }: Props) {
    return (
        <button className="choice">
            {pick ? `You picked ${pick}.` : `Pick your emoji!`}
        </button>
    );
}

export default PickTextBox;
