import { RingLoader } from "react-spinners";
import loaderStyle from "./loader.module.css";

export default function Loader({ isLoading }) {
    return (
        <>
            {
                isLoading && (
                    <div className={loaderStyle.loader}>
                        <div className={loaderStyle.centerLoader}>
                            <RingLoader color="#7CB9E8" />
                        </div>
                    </div>
                )
            }
        </>
    );
}
