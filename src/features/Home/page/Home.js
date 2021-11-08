import React, { useEffect, useState } from 'react';
import './Home.css';
import DialogCreate from '../component/DialogCreate';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { FetchList } from '../reducers/ListMusic';
import swal from 'sweetalert'
import axios from 'axios';

function Home(props) {

    const dispatch = useDispatch();

    const history = useHistory();

    const token = useSelector(state => state.Auth.accessToken);

    const ListMusic = useSelector(state => state.ListMusic);

    const [listMusic, setListMusic] = useState(ListMusic);

    const [isOpen, setIsOpen] = useState(false)

    const [music, setMusic] = useState();

    const closeModal = () => {
        setIsOpen(false)
        setMusic();
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

    const [detail, setDetail] = useState(-1);

    const HandleSetting = (index) => {
        if (detail === index) setDetail(-1);
        else setDetail(index);
    }

    const HandleDetail = (path) => {
        history.push(`/music/${path}`);
    }

    const EditMusic = (item) => {
        setMusic(item);
        setIsOpen(true);
        setDetail(-1);
    }

    const DeleteMusic = (id) => {
        setDetail(-1);
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this song!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.delete(`http://localhost:4000/musics/${id}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }).then(() => {
                        dispatch(FetchList(token));
                        swal("Poof! Your song has been deleted!", {
                            icon: "success",
                        });
                    }).catch(err => console.log(err))
                }
            });
    }

    const convertListMusic = (list) => {
        if (list.length > 0) {
            const result = list.map((item, index) => {
                return (
                    <div key={index} className="relative border border-gray-300 rounded-md shadow-md transform transition duration-500 hover:scale-105 music">
                        <img src={`https://i.ytimg.com/vi/${item.videoId}/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLB3rQvOPsFXNeHn5vIIXPeX_w4kTw`}
                            alt=""
                            className="rounded-t-md cursor-pointer"
                            onClick={() => HandleDetail(item.slug)}
                        />
                        <p className="mt-2 text-xl text-indigo-600 text-center font-bold underline cursor-pointer"
                            onClick={() => HandleDetail(item.slug)}
                        >{item.name}</p>
                        <p className="text-base text-indigo-500 text-center font-medium mb-1 cursor-pointer"
                            onClick={() => HandleDetail(item.slug)}
                        >{item.author}</p>
                        <div className="absolute right-2 bottom-5 option-setting">
                            <i className="fas fa-ellipsis-v text-xl text-gray-500 cursor-pointer pl-6" onClick={() => HandleSetting(index)}></i>
                        </div>
                        {
                            (detail === index) &&
                            <div className="z-10 origin-top-right absolute right-2 bottom-12 mt-2 w-24 rounded shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="divide-y divide-fuchsia-300">
                                    <p className="text-gray-700 block px-2 py-1 rounded hover:bg-gray-200 transition duration-300 ease-in-out cursor-pointer"
                                        onClick={() => EditMusic(item)}
                                    >Edit
                                    </p>
                                    <p className="text-gray-700 block px-2 py-1 rounded hover:bg-gray-200 transition duration-300 ease-in-out cursor-pointer"
                                        onClick={() => DeleteMusic(item._id)}
                                    >Delete</p>
                                </div>
                            </div>
                        }

                    </div>
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

                <DialogCreate music={music} isOpen={isOpen} closeModal={closeModal} />
            </div >
        </div >
    );
}

export default Home;