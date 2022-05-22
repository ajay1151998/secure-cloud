import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import { apiUrl } from "config/api";
import { uploadImage } from "utils/uploadImage";
import { useAuth } from "context";

const ProfilePicture = ({ data }) => {
  const { auth } = useAuth();

  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [profileImage, setProfileImage] = useState();
  const [error, setError] = useState(false);
  const imageHandler = (e) => {
    const selected = e.target.files[0];
    setProfileImage(e.target.files[0]);
    const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg"];
    if (selected && ALLOWED_TYPES.includes(selected.type)) {
      setError(false);
      let reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(selected);
    } else {
      setError(true);
    }
  };

  const uploadProfileImage = async () => {
    setLoading(true);
    try {
      const profile_image = await uploadImage(profileImage, auth.token);

      const payload = {
        profile_image,
      };

      const response = await axios.put(
        `${apiUrl}/drives/${auth.user.profileId}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      const result = await response.data;
      alert("Profile Picture updated Succesfully");

      return result, setLoading(false);
    } catch (error) {
      console.log(error);
      alert("Something went wrong try again.");
      setLoading(false);
    }
  };
  return (
    <>
      <div className="row form-row">
        <div className="col-12 col-md-12">
          <div className="card">
            <div className="card-body">
              <div className="form-group d-flex justify-content-between align-items-center upload-profile flex-column flex-lg-row flex-xl-row flex-xxl-row">
                <div className="change-avatar">
                  <div className="profile-img">
                    <Image
                      height="100"
                      width="100"
                      src={previewImage || "/assets/images/profile.png"}
                      alt="User Image"
                    />
                  </div>
                  <div className="upload-img">
                    <input
                      type="file"
                      className="upload form-control"
                      onChange={imageHandler}
                    />

                    {!!error === true && (
                      <small className="form-text text-danger">
                        Allowed JPG, JPEG or PNG. Max size of 2MB
                      </small>
                    )}
                  </div>
                </div>

                <div className="upload-btn">
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
                      value={loading ? "Uploading..." : "upload Image"}
                      disabled={loading}
                      onClick={uploadProfileImage}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePicture;
