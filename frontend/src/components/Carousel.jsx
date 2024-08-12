import React, { useState, useEffect } from 'react';
import { cardAtom, workAtom, flipAtom } from '../store/atoms';
import axios from 'axios';
import { useRecoilState } from "recoil";
import { FaArrowLeft, FaArrowRight, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';  // Importing icons
import Card from './Card';
import FormComponent from './FormComponent';
import slideSound from '../assets/slideSound.mp3';

const Carousel = () => {
    const [cards, setCards] = useRecoilState(cardAtom);
    const [front, setFront] = useRecoilState(flipAtom);
    const [audio] = useState(new Audio(slideSound));
    const [id, setId] = useState(0);
    const [work, setWork] = useRecoilState(workAtom);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        axios.get('http://localhost:5000/api/flashcards/flashes')
            .then(response => {
                setCards(response.data);
            })
            .catch(error => console.error('Error fetching flashcards:', error));
    }, []);

    const playSlideSound = () => {
        audio.play(); // Play the slide sound
        setTimeout(() => {
            audio.pause(); // Pause the sound after 2 seconds
            audio.currentTime = 0; // Reset the audio to the beginning
        }, 2000); // 2000 milliseconds = 2 seconds
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
        setFront(false);
        playSlideSound();
    };

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
        setFront(false);
        playSlideSound();
    };

    const openForm = (index) => {
        setEditingIndex(index);
        setIsFormOpen(true);
    };

    const closeForm = () => {
        setIsFormOpen(false);
        setEditingIndex(null);
    };

    const handleDeleteCard = (id) => {
        axios.delete(`http://localhost:5000/api/flashcards/delete/?id=${id}`)
            .then(() => {
                setCards(cards.filter(card => card.id !== id));
            })
            .catch(error => console.error('Error deleting card:', error));
    };

    return (
        <div className="w-screen h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
            <div className="relative w-full max-w-lg md:max-w-2xl lg:max-w-4xl h-80 md:h-96 p-4 bg-white shadow-lg rounded-lg border border-gray-300 flex flex-col items-center justify-center glassmorphism">
                <div className={`relative w-full h-full transition-transform duration-700 ${isFormOpen ? 'scale-75' : ''}`}>
                    <Card fieldOne={cards[currentIndex]?.question} fieldTwo={cards[currentIndex]?.answer} />
                </div>

                <div className="absolute inset-x-0 bottom-4 md:bottom-8 flex justify-between px-6">
                    <button
                        className="bg-blue-600 text-white p-3 md:p-4 rounded-full shadow-lg transition-transform duration-300 hover:bg-blue-700 transform hover:scale-110"
                        onClick={handlePrevious}
                    >
                        <FaArrowLeft size={20} md:size={24} />
                    </button>
                    <button
                        className="bg-blue-600 text-white p-3 md:p-4 rounded-full shadow-lg transition-transform duration-300 hover:bg-blue-700 transform hover:scale-110"
                        onClick={handleNext}
                    >
                        <FaArrowRight size={20} md:size={24} />
                    </button>
                </div>
            </div>

            <div className="mt-4 md:mt-6 flex space-x-4">
                <button
                    className="bg-green-600 text-white p-4 md:p-5 rounded-full shadow-lg transition-transform duration-300 hover:bg-green-700 transform hover:scale-110 hover:rotate-90"
                    onClick={() => {
                        setWork("Adding");
                        openForm();
                    }}
                >
                    <FaPlus size={20} md:size={24} />
                </button>

                {cards.length > 0 && (
                    <>
                        <button
                            className="bg-yellow-600 text-white p-4 md:p-5 rounded-full shadow-lg transition-transform duration-300 hover:bg-yellow-700 transform hover:scale-110 flex justify-center items-center"
                            onClick={() => {
                                setWork("Updating");
                                openForm(currentIndex);
                            }}
                        >
                            <FaEdit size={20} md:size={24} />
                        </button>
                        <button
                            className="bg-red-600 text-white p-4 md:p-5 rounded-full shadow-lg transition-transform duration-300 hover:bg-red-700 transform hover:scale-110"
                            onClick={() => handleDeleteCard(cards[currentIndex]?.id)}
                        >
                            <FaTrash size={20} md:size={24} />
                        </button>
                    </>
                )}
            </div >

            {isFormOpen && (
                <FormComponent
                    closeForm={closeForm}
                    editingIndex={editingIndex}
                />
            )}
        </div >
    );
};

export default Carousel;
