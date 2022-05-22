import { UserNav, BreadCrums } from "components/common";
import Upload from "components/forms/Upload";
import useSWR from "swr";
import { useAuth } from "context";
import { apiUrl } from "config/api";
import axios from "axios";
import { withAuth } from "helpers/withAuth";

const Drive = () => {
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
    },
    { refreshInterval: 1000 }
  );

  return (
    <>
      <div className="main-wrapper">
        <BreadCrums
          title="Home / Dashboard / Drive"
          title1="Secured-Cloud"
        />

        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <UserNav status5="active" data={data} />

              <div className="col-sm-12 col-md-12 col-lg-8 col-xl-9">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <Upload userId={auth?.user?.profileId} walt={data?.walt} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withAuth(Drive);
