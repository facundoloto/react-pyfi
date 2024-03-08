import { lazy, useEffect } from "react";
import { useDataContext } from "../../Context/ContextProvider";
import stylesHome from './Home.module.css';
import LoaderCard from "../Loader/LoaderCard";
import { loaderStore } from "../../store/loaderStore";

const Images = lazy(() => import("../Card/CardImage"));

const Home = () => {
    const isLoading = loaderStore((state) => state.isLoading);
    const { data, fetchDataAll } = useDataContext();

    useEffect(() => {
        const intervalId = setInterval(() => {
            clearInterval(intervalId); // Stop the interval
            fetchDataAll();
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);



    return (
        <div className={stylesHome.containerHome}>
            {isLoading ? <LoaderCard isLoading={true} /> : null}
            {
                data.map((data) => {
                    return (<Images key={data.id} className={stylesHome.cardHome} data={data} />);
                })
            }
        </div>
    );
};

export default Home;