import { createContext, useContext, useState } from 'react';
import { getAllPost, getAllPostByUser, deletePost, sendPost } from '../api/fetchApi';
import { loaderStore } from '../store/loaderStore';

import Swal from 'sweetalert2';
import PostDto from '../Dto/PostDto';
const DataContext = createContext();

export const useDataContext = () => {
    return useContext(DataContext);
};

export const DataProvider = ({ children }) => {
    const changeLoader = loaderStore((state) => state.changeLoading);
    const [data, setData] = useState([]);

    const fetchDataAll = async () => {
        changeLoader(true);
        setData([]);
        const response = await getAllPost();
        const dtos = response.map(item => (
            new PostDto(item.id, item.users.id, item.users.name, item.users.image_user, item.description, item.image_post, item.createdAt)
        ));
        changeLoader(false);
        setData(dtos);
    };

    const getAllPostUser = async (idUser) => {
        changeLoader(true);
        setData([]);
        const response = await getAllPostByUser(idUser);
        const dtos = response.result.map(item => (
            new PostDto(item.id, item.id_user, "", "", item.description, item.image_post, item.createdAt)
        ));
        changeLoader(false);
        setData(dtos);
    }
    const deleteData = async (id) => {
        Swal.fire({
            title: 'Do you Want To Delete this post?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await deletePost(id);
                try {
                    if (response.status === 200) {
                        const updatedData = data.filter(data => data.id !== id);
                        setData(updatedData);
                    }
                } catch (error) {
                    new Error('It could not delete contact');
                }
            }
        });
    }

    const addData = async (data) => {
        const res = await sendPost(data);
        if (res.status === 200) {
            await fetchDataAll();
        }
    };

    const contextValue = {
        data,
        fetchDataAll,
        getAllPostUser,
        addData,
        deleteData
    };

    return (
        <DataContext.Provider value={contextValue}>
            {children}
        </DataContext.Provider>
    );
};