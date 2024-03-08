import Header from './Header';
import Gallery from './gallery';
import styleProfile from './profile.module.css';
import { useParams } from 'react-router-dom';

export default function Profile() {
  const user = useParams();

  return (
    <>
      <div className={styleProfile.container}>
        <Header id={user.profileID} />
        <Gallery id={user.profileID} />
      </div>
    </>
  );
}
