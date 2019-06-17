import React, { useState, useEffect } from 'react';
import api from '../services/api';

import './New.css';

function New(props) {

    const [ values, setValues ] = useState({
        author: '',
        place: '',
        description: '',
        hashtags: '',
        image: null
    });

    const handleInputChange = e => {
        const { name, value } = e.target
        setValues({...values, [name]: value })
    }

    const handleImageChange = e => {
        setValues({ ...values, image: e.target.files[0]});
    }

    const handleSubmit = async e => {
        e.preventDefault();
        /*
            Para dados simples, poderia usar somente: 
            api.post('/posts', {
                author,
                place,
                ...
            })

            Mas como precisa enviar imagem(multipart/form-data da API) usaremos: 
        */

        const data = new FormData();
        data.append('image', values.image);
        data.append('author', values.author);
        data.append('place', values.place);
        data.append('description', values.description);
        data.append('hashtags', values.hashtags);

        await api.post('posts', data);

        //Props vinda do React-router do router.js
        props.history.push('/');
        
    }

    return(
        <form id="new-post" onSubmit={handleSubmit}>

            <input type="file" onChange={
                handleImageChange
            } />

            <input type="text" name="author" placeholder="Post Author" value={values.author} onChange={
                handleInputChange
            }/>
            <input type="text" name="place" placeholder="Post local" value={values.place} onChange={
                handleInputChange
            } />
            <input type="text" name="description" placeholder="Post Description" value={values.description} onChange={
                handleInputChange
            } />
            <input type="text" name="hashtags" placeholder="Post hashtags" value={values.hashtags} onChange={
                handleInputChange
            } />
            <button type="submit" value="Send" onClick={handleSubmit}/>

        </form>
    )
}

export default New;
