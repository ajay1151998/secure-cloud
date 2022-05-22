import { useForm } from "react-hook-form";
import { apiUrl } from "config/api";
import axios from "axios";
import { useAuth } from "context";
import { useState } from "react";

const ProfileInfo = ({ data }) => {
  const { auth } = useAuth();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  const updateProfile = async (data, event) => {
    setLoading(true);
    event.preventDefault();
    try {
      const payload = {
        first_name: data.first_name,
        last_name: data.last_name,
        phone: data.phone,
      };

      const res = await axios.put(
        `${apiUrl}/drives/${auth.user?.profileId}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      const result = res.data;
      alert("Profile Updated Succesfully");
      return result, setLoading(false);
    } catch (error) {
      console.log(error.message);
      alert("Something went wrong.");
      setLoading(false);
    }
  };

  return (
    <>
      <form
        className=" needs-validation"
        onSubmit={handleSubmit(updateProfile)}
      >
        <div className="card">
          <div className="card-body">
            <div className="row form-row">
              <div className="col-12 col-md-6">
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    {...register("first_name")}
                    defaultValue={!!data?.first_name ? data.first_name : ""}
                  />
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    {...register("last_name")}
                    defaultValue={!!data?.last_name ? data.last_name : ""}
                  />
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className="form-group">
                  <label>Email ID</label>
                  <input
                    type="email"
                    className="form-control"
                    readOnly
                    defaultValue={!!data?.email ? data.email : ""}
                  />
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="form-group">
                  <label>Mobile</label>
                  <input
                    type="text"
                    placeholder="+1 202-555-0125"
                    className="form-control"
                    required
                    {...register("phone")}
                    defaultValue={!!data?.phone ? data.phone : ""}
                  />
                </div>
              </div>
              <div className="submit-section text-end">
                <input
                  type="submit"
                  className="btn btn-primary submit-btn"
                  value={loading ? "Saving..." : "Save Changes"}
                  disabled={loading}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default ProfileInfo;
