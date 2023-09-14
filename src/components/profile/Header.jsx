import { useState, lazy } from "react";
import { getUserById } from "../../api/fetchApi";
import { useAuthStore } from "../../store/authStore";
import { useQuery } from "@tanstack/react-query";
const FormProfile = lazy(() => import("./FormProfile"));
import styleHeader from './profile.module.css';
import "./profile.module.css";

export default function Header({ id }) {
  const [showModal, setShowModal] = useState(false);
  const idUser = useAuthStore((state) => state.idUser);

  const isActive = idUser == id ? true : false;
  const { isLoading, data: user, isError, error } = useQuery({
    queryKey: ['user', id],
    queryFn: () => getUserById(id),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  else if (isError) {
    return <div>{error.message}</div>;
  }

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <header>
      <div className={styleHeader.profileUserSetting}>
        <div className={styleHeader.profileImage}>
          <img src={user.result.image_user} alt={user.name} />
        </div>
        <div className={styleHeader.infoUser}>
          <h1 className={styleHeader.profileUserName}>{user.result.name}</h1>
          {
            isActive && (
              <button className={styleHeader.profileBtn} onClick={openModal}>Edit Profile</button>
            )}
        </div>
      </div>
      <FormProfile show={showModal} handleClose={closeModal} />
    </header>
  );
}