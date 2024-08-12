import React, { useState, useEffect } from 'react';
import { flipAtom } from '../store/atoms';
import { useRecoilState } from "recoil";
import flipSound from '../assets/flipSound2.mp3'; // Importing the sound file

const Card = ({ fieldOne, fieldTwo }) => {
    const [flipped, setFlipped] = useRecoilState(flipAtom);
    const [audio] = useState(new Audio(flipSound)); // Create an audio object

    const handleFlip = () => {
        setFlipped(!flipped);
    };

    useEffect(() => {
        if (flipped) {
            audio.play();
        } else {
            audio.currentTime = 0; // Reset the audio if flipped back
            audio.play();
        }
    }, [flipped, audio]);

    return (
        <div
            className="w-56 h-72 mx-auto perspective-1000"
            onClick={handleFlip}
            style={{ perspective: '1000px' }}
        >
            <div
                className={`relative w-full h-full transition-transform duration-700 transform  ${flipped ? 'rotate-y-180' : ''}`}
                style={{ transformStyle: 'preserve-3d' }}
            >
                {!flipped &&
                    <div
                        className={`absolute inset-0 w-full h-full bg-indigo-200 text-indigo-900 hover:text-white flex items-center justify-center rounded-lg shadow-2xl border border-gray-300 hover:scale-105 hover:bg-indigo-400 duration-1000 ${flipped ? 'hidden' : ''}`}
                        style={{ backfaceVisibility: 'hidden' }}
                    >
                        <p className="text-xl poppins-medium">{fieldOne}</p>
                    </div>
                }

                {flipped &&
                    <div
                        className={`absolute inset-0 w-full h-full bg-indigo-700 text-indigo-50  flex items-center justify-center rounded-lg shadow-lg border border-gray-300 hover:bg-indigo-400 hover:text-indigo-900  duration-1000 hover:text-2xl  ${flipped ? '' : 'hidden'} transform rotate-y-180`}
                        style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                    >
                        <p className="text-xl poppins-medium  ">{fieldTwo}</p>
                    </div>
                }
            </div>
        </div>
    );
};

export default Card;
