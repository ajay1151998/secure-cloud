import Link from "next/link";
import Image from "next/image";
import { useAuth } from "context";
const UserNav = (props) => {
  const { logOut } = useAuth();

  const { data } = props;

  return (
    <>
      <div className="col-sm-12 col-md-12 col-lg-4 col-xl-3 left-nav">
        <div className="profile-sidebar left-nav">
          <div className="widget-profile pro-widget-content">
            {data ? (
              <>
                <div className="profile-info-widget py-3">
                  <a href="#" className="booking-doc-img">
                    <Image
                      height="145"
                      width="145"
                      src={
                        data?.profile_image?.url || "/assets/images/profile.png"
                      }
                      alt="User Image"
                    />
                  </a>
                  <div className="profile-det-info">
                    <h3>
                      {data?.first_name} {data?.last_name}
                    </h3>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="profile-info-widget">
                  <div className="doc-img card-img-loader-sec mb-3"></div>
                  <div className="profile-det-info">
                    <p className="placeholder-glow">
                      <span className="placeholder col-8 bg-primary"></span>
                      <span className="placeholder col-9 bg-secondary"></span>
                      <span className="placeholder col-6 bg-secondary"></span>
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="dashboard-widget">
            <nav className="dashboard-menu">
              <ul>
                <li className={props.status1}>
                  <Link href="/user/dashboard">
                    <a>
                      <i className="fas fa-tachometer"></i>
                      <span>Dashboard</span>
                    </a>
                  </Link>
                </li>
                <li className={props.status2}>
                  <Link href="/user/drive">
                    <a>
                      <i className="fas fa-calendar-check"></i>
                      <span>My Drive</span>
                    </a>
                  </Link>
                </li>

                <li className={props.status4}>
                  <Link href="/user/profile">
                    <a>
                      <i className="fas fa-user-cog"></i>
                      <span>View / Update Profiles</span>
                    </a>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserNav;
