import { lazy, useEffect } from "react";
import { useDataContext } from "../../Context/ContextProvider";
import stylesHome from './Home.module.css';

const Images = lazy(() => import("./../Card/CardImage"));

const Home = () => {

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

            {
                data.map((data) => {
                    return (<Images key={data.id} className={stylesHome.cardHome} data={data} />);
                })
            }
        </div>
    );
};

export default Home;