import Layout from "components/Layout/Layout";

import UserCard from "components/Pages/Profile/UserCard";
import { DONATION_PAGE } from "pages";
import LeftSidebar from "components/Pages/User/LeftSidebar";
import DonationForm from "components/Pages/Donation/DonationForm";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUser } from "redux/actions/user";
import { fetchDonationOptions } from "redux/actions/donationOptions";

export default function Donation() {
  const page = DONATION_PAGE;
  const dispatch = useDispatch();
  const router = useRouter();
  const initialDataReducer = useSelector((state) => state.initialDataReducer);
  const authReducer = useSelector((state) => state.authReducer);
  const userReducer = useSelector((state) => state.userReducer);
  useEffect(() => {
    const handleFetchData = async () => {
      const userId = router.query?.user;
      await dispatch(fetchUser(userId));
      await dispatch(fetchDonationOptions());
    };
    if (initialDataReducer.data_fetched) {
      handleFetchData();
    }
  }, [initialDataReducer.data_fetched]);
  return (
    <Layout>
      <div className="py-10">
        <div className="max-w-3xl mx-auto sm:px-6 flex flex-col lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
          <UserCard mobile page={page} user={userReducer.user} />

          <DonationForm />
          {/* <Feed page={page} /> */}
          <UserCard page={page} user={userReducer.user} />
        </div>
      </div>
    </Layout>
  );
}
