import { useAuth } from "context";

const BreadCrums = (props) => {
  const { logOut } = useAuth();
  return (
    <>
      {" "}
      <div className="page_content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-9">
              {" "}
              <div className="breadcrumb-content">
                <p className="fs-6">{props.title}</p>
                <p className="fs-5 fw-bold">{props.title1}</p>
              </div>
            </div>
            <div className="col-3 text-end align-item-basline">
              <button className="btn btn-danger" onClick={logOut}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BreadCrums;
