import { useEffect } from "react";
import { getAllPostByUser, deletePost } from "../../api/fetchApi";
import { useAuthStore } from "../../store/authStore";
import { useDataContext } from "../../Context/ContextProvider";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import styleGallery from './profile.module.css';

export default function gallery({ id }) {
  const { data, getAllPostUser, deleteData } = useDataContext();
  const idUser = useAuthStore((state) => state.idUser);
  const idProfile = idUser == id ? idUser : id;
  const isActive = idUser == id ? true : false;

  const deletePostGallery = (id) => {
    deleteData(id);
  };

  useEffect(() => {
    getAllPostUser(idProfile);
  }, []);


  return (
    <>
      <div className={styleGallery.container}>
        <div className={styleGallery.gallery}>
          {data.map((data) => {
            return (
              <div className={styleGallery.galleryItem} tabIndex={"0"} key={data.id} >
                {
                  isActive && (
                    <MoreHorizIcon onClick={() => { deletePostGallery(data.id); }} />
                  )}
                <img src={data.img} className={styleGallery.galleryImage} alt="" />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
