import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import './Music.css'
import { Link } from 'react-router-dom';

function Music(props) {

    const ListMusic = useSelector(state => state.ListMusic);

    const [listMusic, setListMusic] = useState(ListMusic);

    const slug = useParams().slug;

    const [loading, setLoading] = useState(false);

    const [music, setMusic] = useState();

    const token = useSelector(state => state.Auth.accessToken);

    const convertListMusic = (list) => {
        const newList = list.filter((item) => {
            return item.slug !== slug
        })

        let result = [];

        for (let i = 0; i < newList.length; i++) {
            if (i > 5) break;
            result.push(newList[i]);
        }
        const covertResult = result.map((item, index) => {
            return (
                <Link to={`/music/${item.slug}`} className="image-item transition duration-300 ease-in-out hover:opacity-90 hover:text-blue-500" key={index} title={item.name}>
                    <img src={`https://i.ytimg.com/vi/${item.videoId}/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLB3rQvOPsFXNeHn5vIIXPeX_w4kTw`} alt="" />
                    <p className="w-40 truncate ml-1">{item.name}</p>
                </Link>
            )
        })
        return covertResult;
    }

    useEffect(() => {
      setListMusic(ListMusic)  
    }, [ListMusic])

    useEffect(() => {
        setLoading(true);
        const fetch_List = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/musics/${slug}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response) {
                    setMusic(response.data);
                    setLoading(false);
                }
            } catch (error) {
                console.log(error);
            }
        }

        fetch_List();
    }, [slug, token])

    return (
        <div className="pt-3 max-w-7xl h-full mx-auto px-4">
            {loading ?
                <div className="loading">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div> :
                <div>
                    <div className="flex item-center justify-center">
                        <div>
                            <iframe
                                width="956"
                                height="450"
                                src={`https://www.youtube.com/embed/${typeof music !== "undefined" ? music.videoId : ""}`}
                                title="YouTube video player"
                                frameBorder="0" allow="accelerometer; 
                    autoplay; clipboard-write; encrypted-media; 
                    gyroscope; picture-in-picture"
                                allowFullScreen>
                            </iframe>
                            {
                                typeof music !== "undefined" &&
                                <p className="mt-2 font-medium text-xl">{music.name} - {music.author}</p>
                            }
                        </div>
                    </div>
                </div>
            }
            <div className="images">
                {convertListMusic(listMusic)}
            </div>
        </div>
    );
}

export default Music;