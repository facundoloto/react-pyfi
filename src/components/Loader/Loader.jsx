import { BounceLoader } from "react-spinners";
import loaderStyle from "./loader.module.css";

export default function Loader({ isLoading }) {
    return (
        <>
            {
                isLoading && (
                    <div className={loaderStyle.loader}>
                        <div className={loaderStyle.centerLoader}>
                            <BounceLoader color="rgb(186, 144, 198)" />
                        </div>
                    </div>
                )
            }
        </>
    );
}
