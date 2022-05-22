import { UserNav, BreadCrums } from "components/common";
import { apiUrl } from "config/api";
import axios from "axios";
import useSWR from "swr";
import { ProfileInfo, ProfilePicture, AddressInfo } from "components/forms";
import { useAuth } from "context";
import { withAuth } from "helpers/withAuth";
const ProfileSettings = () => {
  const { auth } = useAuth();

  const { data } = useSWR(
    `${apiUrl}/drives/${auth.user?.profileId}`,
    async (url) => {
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      const result = res.data;
      return result;
    }
  );

  return (
    <>
      <div className="main-wrapper">
        <BreadCrums
          title="Home / Dashboard / Profile-Settings"
          title1="Profile-Settings"
        />
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <UserNav status4="active" data={data} />

              <div className="col-md-12 col-sm-12 col-lg-8 col-xl-9">
                <div>
                  <ProfilePicture data={data} />
                  <ProfileInfo data={data} />
                  {/* <AddressInfo data={data} /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withAuth(ProfileSettings);
