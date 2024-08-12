import React, { useState } from 'react';
import { IoMdCloseCircleOutline } from "react-icons/io"; // Ensure you're using Heroicons for the close icon
import axios from 'axios';
import { useRecoilState } from "recoil";
import { cardAtom, workAtom } from '../store/atoms';

const FormComponent = ({ closeForm, editingIndex }) => {
    // console.log(editingIndex);
    const [activeForm, setActiveForm] = useState('question');
    const [isFormOpen, setIsFormOpen] = useState(true);
    const [work, setWork] = useRecoilState(workAtom);
    const [cards, setCards] = useRecoilState(cardAtom);

    // State for form inputs
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [term, setTerm] = useState('');
    const [definition, setDefinition] = useState('');

    const handleFormToggle = (formType) => {
        setActiveForm(formType);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'question') {
            setQuestion(value);
        } else if (name === 'answer') {
            setAnswer(value);
        } else if (name === 'term') {
            setTerm(value);
        } else if (name === 'definition') {
            setDefinition(value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(id);
        console.log(work);
        let newCard;
        let updatedCard;
        if (activeForm === 'question') {
            newCard = { question, answer };
            updatedCard = { question, answer };
        } else {
            newCard = { question: term, answer: definition };
            updatedCard = { question: term, answer: definition };
        }

        if (work === "Adding") {
            axios.post('http://localhost:5000/api/flashcards/add', newCard)
                .then(response => {
                    console.log(newCard);
                    setCards([...cards, { ...newCard, id: response.data.id }]);
                    closeForm();
                })
                .catch(error => console.error('Error adding card:', error));
        }

        if (work === "Updating") {
            const id = cards[editingIndex].id;
            axios.put(`http://localhost:5000/api/flashcards/update/?id=${id}`, updatedCard)
                .then(() => {
                    setCards(cards.map(card =>
                        card.id === id ? { ...card, ...updatedCard } : card
                    ));
                    closeForm();
                })
                .catch(error => console.error('Error updating card:', error));
        }
    };

    const handleCloseForm = () => {
        closeForm();
    };

    if (!isFormOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-60 z-50">
            <div className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
                <button
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
                    onClick={handleCloseForm}
                >
                    <IoMdCloseCircleOutline className="h-6 w-6" />
                </button>

                <div className="flex justify-center mb-4 space-x-2">
                    <button
                        className={`px-4 py-2 rounded-md transition-all duration-300 ${activeForm === 'question'
                            ? 'bg-gray-700 text-white'
                            : 'bg-gray-200 text-gray-700'
                            }`}
                        onClick={() => handleFormToggle('question')}
                    >
                        Question & Answer
                    </button>
                    <button
                        className={`px-4 py-2 rounded-md transition-all duration-300 ${activeForm === 'term'
                            ? 'bg-gray-700 text-white'
                            : 'bg-gray-200 text-gray-700'
                            }`}
                        onClick={() => handleFormToggle('term')}
                    >
                        Term & Definition
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    {activeForm === 'question' ? (
                        <div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-medium mb-1">Question</label>
                                <input
                                    type="text"
                                    name="question"
                                    value={question}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                                    placeholder="Enter your question"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-medium mb-1">Answer</label>
                                <input
                                    type="text"
                                    name="answer"
                                    value={answer}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                                    placeholder="Enter the answer"
                                    required
                                />
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-medium mb-1">Term</label>
                                <input
                                    type="text"
                                    name="term"
                                    value={term}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                                    placeholder="Enter the term"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-medium mb-1">Definition</label>
                                <input
                                    type="text"
                                    name="definition"
                                    value={definition}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                                    placeholder="Enter the definition"
                                    required
                                />
                            </div>
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full px-4 py-2 mt-4 text-white bg-gray-700 rounded-md shadow-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default FormComponent;
