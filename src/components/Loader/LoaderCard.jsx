import { PacmanLoader } from "react-spinners";
import loaderStyle from "./loader.module.css";

export default function LoaderCard({ isLoading }) {
    return (
        <>
            {
                isLoading && (
                    <div className={loaderStyle.LoaderCard}>
                        <div className={loaderStyle.centerLoader}>
                            <PacmanLoader color="#7CB9E8" />
                        </div>
                    </div>
                )
            }
        </>
    );
}