import React, { useState} from 'react';
import './Home.css';
import DialogCreate from '../component/DialogCreate';

function Home(props) {

    const [isOpen, setIsOpen] = useState(false)

    const closeModal = () => {
        setIsOpen(false)
    }

    const openModal = () => {
        setIsOpen(true)
    }

    return (
        <div className="relative">
            <div className="absolute w-full h-full"></div>
            <div className="pt-3 max-w-7xl mx-auto px-4">
                <div className="flex">
                    <button className="hover:bg-gray-300 hover:text-indigo-600 transition duration-300 ease-in-out opacity-80 shadow-md text-center ml-auto h-10 w-10 bg-gray-200 text-indigo-500 rounded-full border border-gray-300"
                        onClick={openModal}
                    >
                        <i className="fas fa-plus"></i>
                    </button>
                </div>

                <div className="grid grid-cols-3 gap-y-4 gap-x-6 mt-3">
                    <div className="border border-gray-300 rounded-md shadow-md transform transition duration-500 hover:scale-105">
                        <img src="https://i.ytimg.com/vi/5e7e_KZINA4/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLB3rQvOPsFXNeHn5vIIXPeX_w4kTw"
                            alt=""
                            className="rounded-t-md cursor-pointer"
                        />
                        <p className="mt-2 text-xl text-indigo-600 text-center font-bold underline">Đưa nhau đi trốn</p>
                        <p className="text-base text-indigo-500 text-center font-medium mb-1">Đen Vâu</p>
                    </div>

                    <div className="border border-gray-300 rounded-md shadow-md transform transition duration-500 hover:scale-105">
                        <img src="https://i.ytimg.com/vi/5e7e_KZINA4/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLB3rQvOPsFXNeHn5vIIXPeX_w4kTw"
                            alt=""
                            className="rounded-t-md cursor-pointer"
                        />
                        <p className="mt-2 text-xl text-indigo-600 text-center font-bold underline">Đưa nhau đi trốn</p>
                        <p className="text-base text-indigo-500 text-center font-medium mb-1">Đen Vâu</p>
                    </div>

                    <div className="border border-gray-300 rounded-md shadow-md transform transition duration-500 hover:scale-105">
                        <img src="https://i.ytimg.com/vi/5e7e_KZINA4/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLB3rQvOPsFXNeHn5vIIXPeX_w4kTw"
                            alt=""
                            className="rounded-t-md cursor-pointer"
                        />
                        <p className="mt-2 text-xl text-indigo-600 text-center font-bold underline">Đưa nhau đi trốn</p>
                        <p className="text-base text-indigo-500 text-center font-medium mb-1">Đen Vâu</p>
                    </div>

                    <div className="border border-gray-300 rounded-md shadow-md transform transition duration-500 hover:scale-105">
                        <img src="https://i.ytimg.com/vi/5e7e_KZINA4/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLB3rQvOPsFXNeHn5vIIXPeX_w4kTw"
                            alt=""
                            className="rounded-t-md cursor-pointer"
                        />
                        <p className="mt-2 text-xl text-indigo-600 text-center font-bold underline">Đưa nhau đi trốn</p>
                        <p className="text-base text-indigo-500 text-center font-medium mb-1">Đen Vâu</p>
                    </div>

                    <div className="border border-gray-300 rounded-md shadow-md transform transition duration-500 hover:scale-105">
                        <img src="https://i.ytimg.com/vi/5e7e_KZINA4/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLB3rQvOPsFXNeHn5vIIXPeX_w4kTw"
                            alt=""
                            className="rounded-t-md cursor-pointer"
                        />
                        <p className="mt-2 text-xl text-indigo-600 text-center font-bold underline">Đưa nhau đi trốn</p>
                        <p className="text-base text-indigo-500 text-center font-medium mb-1">Đen Vâu</p>
                    </div>

                    <div className="border border-gray-300 rounded-md shadow-md transform transition duration-500 hover:scale-105">
                        <img src="https://i.ytimg.com/vi/5e7e_KZINA4/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLB3rQvOPsFXNeHn5vIIXPeX_w4kTw"
                            alt=""
                            className="rounded-t-md cursor-pointer"
                        />
                        <p className="mt-2 text-xl text-indigo-600 text-center font-bold underline">Đưa nhau đi trốn</p>
                        <p className="text-base text-indigo-500 text-center font-medium mb-1">Đen Vâu</p>
                    </div>

                </div>

                <DialogCreate isOpen={isOpen} closeModal={closeModal}/>
            </div >
        </div >
    );
}

export default Home;