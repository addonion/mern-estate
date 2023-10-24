import Layout from "../shared/Layout";
import type { RootState } from "../app/store";
import { useSelector } from "react-redux";

export const Profile = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);

  return (
    <Layout>
      <h1>Профиль</h1>
      {currentUser && currentUser.username}
    </Layout>
  );
};
