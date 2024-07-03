import React from 'react';

function Hint({revealHint, numHints, numExtraWords}){

    return (
        <div>
            {numExtraWords >= 3 ? (
                <button className='hint' onClick={revealHint}>Hint</button>
            ) : (
                <button className='disabled'>Hint</button>
            )}
            <p>Hints: {numHints}</p>
        </div>
    )
}

export default Hint;