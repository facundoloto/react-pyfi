import { lazy, Suspense } from 'react'
import { BounceLoader } from "react-spinners";
import './profile.css'

const ImageUser = lazy(() => import("./gallery"));
//const Images= lazy(() => import("./../Card/CardImage"));

export default function profile() {
    return (

        <>
            <header>

                <div className="containerProfile">

                    <div className="profile">

                        <div className="profile-image">

                            <img src="https://images.unsplash.com/photo-1513721032312-6a18a42c8763?w=152&h=152&fit=crop&crop=faces" alt="" />

                        </div>

                        <div className="profile-user-settings">
                            <h1 className="profile-user-name">janedoe_</h1>
                            <button className="btn profile-edit-btn">Edit Profile</button>
                        </div>

                        <div className="profile-stats">
                            <ul>
                                <li><span className="profile-stat-count">164</span> posts</li>
                            </ul>
                        </div>

                    </div>

                </div>


            </header>

            <main>

                <div className="containerProfile">
                    <Suspense
                        fallback={
                            <div
                                style={{
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    // transform: "translate(-50%,-50%)",
                                    // color: 'purple',
                                    // fontSize: '22px',
                                }}>

                                <BounceLoader color="rgb(186, 144, 198)" />
                            </div>}>

                        <div className="gallery">

                            <ImageUser />
                            <ImageUser />
                            <ImageUser />
                            <ImageUser />
                            <ImageUser />
                            <ImageUser />
                            <ImageUser />
                            <ImageUser />
                         
                        </div>
                    </Suspense>

                </div>

            </main>
        </>
    )
} 