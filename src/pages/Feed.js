import React, { useState, useEffect } from 'react';
import api from '../services/api';
import io from 'socket.io-client';

import './Feed.css';

import more from '../assets/more.svg';
import like from '../assets/like.svg';
import comment from '../assets/comment.svg';
import send from '../assets/send.svg';

function Feed() {

    const [ feed, setFeed ] = useState({ hits: [] });
    
    async function fecthFromAxios() {
        const res = await api.get('posts');
        setFeed({ hits: res.data });
    }
   
    useEffect(
        () => {
            fecthFromAxios();
            registerToSocket();
        },[feed]
    )

    //Para leitura em tempo real
    //https://socket.io/docs/client-api/#io%28url:string,-opts:object%29:socket
    function registerToSocket() {

        const socket = io('http://localhost:3000');

        socket.on('post', newPost => {
            setFeed({ ...feed, newPost});
        })

        socket.on('like', likedPost => {
            feed.hits.map(post => (
                post._id === likedPost._id ? likedPost : post
            ))
        })
    }

    const handleLike = id => {
        api.post(`/posts/${id}/like`);
    }

    return(

        <section id="post-list">

            {
                feed.hits.map((post) => (

                    <article key={post._id}>
                        <header>
                            <div className="user-info">
                                <span>{ post.author }</span>
                                <span className="place">{ post.place }</span>
                            </div>

                            <img src={more} alt="More" />
                        </header>

                        <img src={ `http://localhost:3000/files/${post.image}` }/> 

                        <footer>
                            <div className="actions">
                                <button type="button" onClick={ () => handleLike(post._id)}>
                                    <img src={like} alt="" />
                                </button>
                                <button>
                                    <img src={comment} alt="" />
                                </button>
                                <button>
                                    <img src={send} alt="" />
                                </button>
                            </div>
                            <strong> { post.likes } curtidas </strong>
                            <p>
                                {post.description}
                                <span>#picoparana, #PR</span>
                            </p>
                        </footer>
                        
                    </article>

                ))
            }

        </section>
    );
}

export default Feed;
