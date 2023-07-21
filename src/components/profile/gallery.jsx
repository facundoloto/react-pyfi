import { getAllPostByUser } from "../../api/fetchApi";
import { useQuery } from "@tanstack/react-query";
import styleGallery from './profile.module.css';

export default function gallery({ id }) {
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

  return (
    <>
      <div className={styleGallery.container}>
        <div className={styleGallery.gallery}>
          {posts.map((posts) => {
            return (
              <div className={styleGallery.galleryItem} tabindex="0" key={posts.id} >
                <img src={posts.image_post} className={styleGallery.galleryImage} alt="" />
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
