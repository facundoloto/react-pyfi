import { getUserById } from "../../api/fetchApi";
import { useQuery } from "@tanstack/react-query";
import styleHeader from './profile.module.css';
import "./profile.module.css";

export default function Header({ id }) {
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

  return (
    <header>
      <div className={styleHeader.profileUserSetting}>
        <div className={styleHeader.profileImage}>
          <img src={user.result.image_user} alt={user.name} />
        </div>
        <div className={styleHeader.infoUser}>
          <h1 className={styleHeader.profileUserName}>{user.result.name}</h1>
          {/* <button className={styleHeader.profileBtn}>Edit Profile</button> */}
        </div>
      </div>
    </header>
  );
}