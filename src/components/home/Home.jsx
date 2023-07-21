import { lazy, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllPost } from "../../api/fetchApi";
import stylesHome from './Home.module.css';

const Images = lazy(() => import("./../Card/CardImage"));

const Home = () => {

    const { isLoading, data: posts, isError, error } = useQuery({
        queryKey: ['posts'],
        queryFn: getAllPost
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }
    else if (isError) {
        return <div>{error.message}</div>;
    }

    return (
        <div className={stylesHome.containerHome}>

            {
                posts.map((posts) => {
                    return <Images key={posts.id} className={stylesHome.cardHome} data={posts} />
                })
            }
        </div>
    );
};

export default Home;