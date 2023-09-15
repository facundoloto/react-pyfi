import { getAllPostByUser, deletePost } from "../../api/fetchApi";
import { useAuthStore } from "../../store/authStore";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import styleGallery from './profile.module.css';

export default function gallery({ id }) {
  const idUser = useAuthStore((state) => state.idUser);
  const isActive = idUser == id ? true : false;

  const { isLoading, data: posts, isError, error } = useQuery({
    queryKey: ['posts', id],
    queryFn: () => getAllPostByUser(id),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  else if (isError) {
    return <div>{error.message}</div>;
  }

  const deletePostGallery = (id) => {
    Swal.fire({
      title: 'Do you Want To Delete this post?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deletePost(id);
        console.log('works');
      }
    });
  };

  return (
    <>
      <div className={styleGallery.container}>
        <div className={styleGallery.gallery}>
          {posts.result.map((posts) => {
            return (
              <div className={styleGallery.galleryItem} tabIndex={"0"} key={posts.id} >
                {
                  isActive && (
                    <MoreHorizIcon onClick={() => { deletePostGallery(posts.id); }} />
                  )}
                <img src={posts.image_post} className={styleGallery.galleryImage} alt="" />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
