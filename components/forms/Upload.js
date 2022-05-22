import { useState } from "react";
import { apiUrl } from "config/api";
import axios from "axios";
import Link from "next/link";
import { useAuth } from "context";
import { uploadImage } from "utils/uploadImage";
import WaltList from "components/common/WaltList";
const Upload = ({ userId, walt }) => {
  const dataLenght = walt?.length;
  const { auth } = useAuth();

  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState();
  const [profileImage, setProfileImage] = useState();

  const randomKey = title + "@007";

  const uploadProfileImage = async () => {
    setLoading(true);
    const image = await uploadImage(profileImage, auth.token);

    const payload = {
      walt: [
        ...walt,
        {
          title: title,
          document: image,
          key: randomKey,
        },
      ],
    };
    try {
      const response = await axios.put(`${apiUrl}/drives/${userId}`, payload, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      const result = await response.data;

      alert("Document Uploaded");
      setLoading(false);
      setTitle("");
      setKey("");
      setProfileImage("");
      return result;
    } catch (error) {
      console.log(error);
      alert("Sorry something went wrong");
      setLoading(false);
    }
  };

  return (
    <>
      <div className="gen-form mb-3">
        <div className="row justify-centent-between align-items-center">
          <div className="col-md-4 mb-3 mb-md-0 md-lg-0 md-xl-0">
            <label htmlFor="" className="form-label">
              Title
            </label>

            <input
              type="text"
              className="form-control"
              name="title"
              placeholder="File Name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="col-md-4 mb-3 mb-md-0 md-lg-0 md-xl-0">
            {/* <label htmlFor="" className="form-label">
              Encription Key
            </label>

            <input
              type="password"
              className="form-control"
              name="title"
              placeholder="File Name"
              value={key}
              onChange={(e) => setKey(e.target.value)}
            /> */}
          </div>
          <div className="col-md-4">
            <label htmlFor="File">File</label>
            <input
              type="file"
              className="form-control"
              placeholder="Upload your Image"
              name="uploadFile"
              required=""
              onChange={(e) => setProfileImage(e.target.files[0])}
            />
          </div>
        </div>

        <div
          className="right-button"
          style={{ textAlign: "right", marginTop: "10px" }}
        >
          {loading ? (
            <div className="upload-btn-spin">
              <button className="btn btn-primary">
                <div className="d-flex align-items-center">
                  <div
                    className="spinner-border ms-auto me-3"
                    role="status"
                    aria-hidden="true"
                  ></div>
                  <strong>Uploading...</strong>
                </div>
              </button>
            </div>
          ) : (
            <input
              type="btn"
              className="btn btn-primary"
              readOnly
              value={loading ? "Uploading..." : "upload File"}
              disabled={loading}
              onClick={uploadProfileImage}
            />
          )}
        </div>
      </div>
      <div
        className="rfa-gen-form-data-table mb-3"
        style={{
          background: "white",
          padding: "10px",
          borderRadius: "3px",
          borderBottom: "1px solid #bbbaba",
        }}
      />
      <table className="table table-striped mb-3">
        <thead>
          <tr>
            <th scope="col">Sl No</th>
            <th scope="col">File Name</th>
            <th>Validation Check</th>
            <th>Document</th>
          </tr>
        </thead>
        <tbody>
          {dataLenght === 0 ? (
            <tr>
              <td colSpan="2" className="text-danger">
                No Previous Records Found !!
              </td>
            </tr>
          ) : (
            <>
              {walt?.map((item, index) => (
                <WaltList item={item} key={index} id={index + 1} />
              ))}
            </>
          )}
        </tbody>
      </table>
    </>
  );
};

export default Upload;
