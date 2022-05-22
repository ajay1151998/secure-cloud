import { UserNav, BreadCrums } from "components/common";
import Image from "next/image";
import { useAuth } from "context";
import { apiUrl } from "config/api";
import useSWR from "swr";
import axios from "axios";
import { withAuth } from "helpers/withAuth";

const Dashboard = () => {
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
        <BreadCrums title="Home / User" title1="User" />

        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <UserNav status1="active" data={data} />

              <div className="col-sm-12 col-md-12 col-lg-8 col-xl-9">
                <div
                  className="dashboard-welcome-text"
                  style={{
                    padding: "25px",
                    backgroundColor: "#0d6efd",
                    color: "#ffff",
                    borderRadius: " 7px",
                  }}
                >
                  <p className="fs-4 fw-bold">
                    Welcome {data?.first_name} {data?.last_name}👋
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withAuth(Dashboard);
