import React, { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { FetchList } from '../reducers/ListMusic';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import swal from 'sweetalert'

function DialogCreate(props) {

    const { isOpen, closeModal, music } = props;

    const schema = yup.object().shape({
        name: yup.string().required(),
        author: yup.string().required(),
        description: yup.string(),
        videoId: yup.string().required(),
        genre: yup.string(),
    }).required();

    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        if (typeof music !== "undefined") {
            setValue("name", music.name);
            setValue("author", music.author);
            setValue("description", music.description);
            setValue("videoId", music.videoId);
            setValue("genre", music.genre)
        }
    }, [music, setValue])

    const token = useSelector(state => state.Auth.accessToken);

    const accessToken = useSelector(auth => auth.Auth.accessToken);

    const dispatch = useDispatch();

    const CloseModal = () => {
        reset();
        closeModal();
    }

    const submitFormLogin = (data) => {
        if (typeof music !== "undefined") {
            axios.put(`http://localhost:4000/musics/${music._id}`, data, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }).then(res => {
                swal("Successful song editing!", "Click ok to go back!", "success");
                dispatch(FetchList(token))
                CloseModal();

            })
                .catch(console)
        } else {
            axios.post('http://localhost:4000/musics/create', data, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }).then(res => {
                swal("Successful new song creation!", "Click ok to go back!", "success");
                dispatch(FetchList(token))
                CloseModal();

            })
                .catch(console)
        }
    }

    return (
        <div>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto"
                    onClose={closeModal}
                >
                    <div className="text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span
                            className="inline-block h-screen align-middle"
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className="inline-block h-screen w-full overflow-hidden text-left align-middle transition-all transform bg-white">
                                <div className="card">
                                    <div className="card_img">
                                        <div className="img_modal">
                                        </div>
                                        <img src="https://test.coopax.com/img/left-image-for-create-new-event-with-wizard-dialog.7a224fbf.jpeg"
                                            alt="" />
                                    </div>

                                    <div className="absolute right-10 top-4 text-gray-600 cursor-pointer hover:text-gray-800 transition duration-300 ease-in-out text-xl"
                                        onClick={CloseModal}
                                    >
                                        <i className="fas fa-times"> </i>
                                    </div>

                                    <div className="flex items-center justify-center w-full">
                                        <div className="w-2/3">
                                            <form className="py-10 px-16 auth-form shadow" onSubmit={handleSubmit(submitFormLogin)} >

                                                <Dialog.Title
                                                    as="h3"
                                                    className="text-2xl font-medium leading-6 text-gray-900 text-center"
                                                >
                                                    Make yourself a favorite song
                                                </Dialog.Title>

                                                <div className="mt-2 flex justify-center">
                                                    <p className="text-sm text-gray-500">
                                                        Please fill in the details of the song you want to create
                                                    </p>
                                                </div>

                                                <div className="mt-6">
                                                    <p className="font-medium">Name of the song</p>
                                                    <input className="focus:ring-indigo-500 focus:border focus:border-indigo-500 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                                                        // value={typeof music !== "undefined" ? music.name : ""}
                                                        placeholder="Enter the name of the song"
                                                        type="text"
                                                        {...register("name")}
                                                    />
                                                    {errors.name && <span className="text-sm text-red-600 ml-2 tracking-tighter font-semibold">{errors.name.message}</span>}
                                                </div>

                                                <div className="mt-6">
                                                    <p className="font-medium">Author</p>
                                                    <input className="mb-1 focus:ring-indigo-500 focus:border focus:border-indigo-500 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                                                        // value={typeof music !== "undefined" ? music.author : ""}
                                                        placeholder="Enter author's name"
                                                        type="text"
                                                        {...register("author")}
                                                    />
                                                    {errors.author && <span className="text-sm text-red-600 ml-2 tracking-tighter font-semibold">{errors.author.message}</span>}
                                                </div>

                                                <div className="mt-6">
                                                    <p className="font-medium">Song description</p>
                                                    <input className="mb-1 focus:ring-indigo-500 focus:border focus:border-indigo-500 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                                                        // value={typeof music !== "undefined" ? music.description : ""}
                                                        placeholder="Enter song description"
                                                        type="text"
                                                        {...register("description")}
                                                    />
                                                </div>

                                                <div className="mt-6">
                                                    <p className="font-medium">Video ID</p>
                                                    <input className="mb-1 focus:ring-indigo-500 focus:border focus:border-indigo-500 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                                                        // value={typeof music !== "undefined" ? music.videoId : ""}
                                                        placeholder="Enter Video ID"
                                                        type="text"
                                                        {...register("videoId")}
                                                    />
                                                    {errors.videoId && <span className="text-sm text-red-600 ml-2 tracking-tighter font-semibold">{errors.videoId.message}</span>}
                                                </div>

                                                <div className="mt-6">
                                                    <p className="font-medium">Music genre</p>
                                                    <input className="mb-1 focus:ring-indigo-500 focus:border focus:border-indigo-500 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                                                        // value={typeof music !== "undefined" ? music.genre : ""}
                                                        placeholder="Enter song genre"
                                                        type="text"
                                                        {...register("genre")}
                                                    />
                                                    {errors.genre && <span className="text-sm text-red-600 ml-2 tracking-tighter font-semibold">{errors.genre.message}</span>}
                                                </div>

                                                <div className="mt-6 flex items-center justify-end">
                                                    <button
                                                        type="reset"
                                                        className="mr-4 justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                                    >
                                                        Reset
                                                    </button>

                                                    <button
                                                        type="submit"
                                                        className="justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                                    >
                                                        {typeof music !== "undefined" ? "Save" : "Create Music"}
                                                    </button>
                                                </div>
                                            </form>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition >
        </div>
    );
}

export default DialogCreate;