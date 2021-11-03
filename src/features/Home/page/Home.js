import React, { useEffect, useState } from 'react';
import './Home.css';
import DialogCreate from '../component/DialogCreate';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FetchList } from '../reducers/ListMusic';

function Home(props) {

    const dispatch = useDispatch();

    const token = useSelector(state => state.Auth.accessToken);

    const info = useSelector(state => state.Auth.info);

    console.log(info)

    const ListMusic = useSelector(state => state.ListMusic);

    const [listMusic, setListMusic] = useState(ListMusic);

    const [isOpen, setIsOpen] = useState(false)

    const closeModal = () => {
        setIsOpen(false)
    }

    const openModal = () => {
        setIsOpen(true)
    }

    useEffect(() => {
        setListMusic(ListMusic)
    }, [ListMusic])

    useEffect(() => {
        dispatch(FetchList(token));
    }, [token, dispatch])

    const convertListMusic = (list) => {
        if (list.length > 0) {
            const result = list.map((item, index) => {
                return (
                    <Link to={`/music/${item.slug}`} key={index} className="border border-gray-300 rounded-md shadow-md transform transition duration-500 hover:scale-105">
                        <img src={`https://i.ytimg.com/vi/${item.videoId}/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLB3rQvOPsFXNeHn5vIIXPeX_w4kTw`}
                            alt=""
                            className="rounded-t-md cursor-pointer"
                        />
                        <p className="mt-2 text-xl text-indigo-600 text-center font-bold underline">{item.name}</p>
                        <p className="text-base text-indigo-500 text-center font-medium mb-1">{item.author}</p>
                    </Link>
                )
            })
            return result;
        }
    }

    return (
        <div className="relative">
            <div className="pt-3 max-w-7xl mx-auto px-4">
                <div className="flex">
                    <button className="hover:bg-gray-300 hover:text-indigo-600 transition duration-300 ease-in-out opacity-80 shadow-md text-center ml-auto h-10 w-10 bg-gray-200 text-indigo-500 rounded-full border border-gray-300"
                        onClick={openModal}
                    >
                        <i className="fas fa-plus"></i>
                    </button>
                </div>

                <div className="grid grid-cols-3 gap-y-4 gap-x-6 mt-3">
                    {convertListMusic(listMusic)}
                </div>

                <DialogCreate isOpen={isOpen} closeModal={closeModal} />
            </div >
        </div >
    );
}

export default Home;