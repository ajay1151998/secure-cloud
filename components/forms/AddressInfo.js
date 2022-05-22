import { useForm } from "react-hook-form";
import { apiUrl } from "config/api";
import axios from "axios";
import { useAuth } from "context";
import { useState } from "react";

const AddressInfo = ({ data }) => {
  const { auth } = useAuth();
  if (auth?.user?.role?.id === 1) {
    var role = "patients";
  }
  if (auth?.user?.role?.id === 3) {
    var role = "doctors";
  }
  if (auth?.user?.role?.id === 6) {
    var role = "polyclinics";
  }
  if (auth?.user?.role?.id === 7) {
    var role = "nursing-homes";
  }

  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  const updateAddress = async (data, event) => {
    setLoading(true);
    event.preventDefault();

    const payload = {
      address: {
        street_address: data.street,
        city: data.city,
        pincode: data.pinCode,
        state: data.state,
        country: data.country,
      },
    };
    try {
      const res = await axios.put(
        `${apiUrl}/${role}/${auth.user?.profileId}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      const result = res.data;
      toast.success("Address Updated Succesfully.", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
      });
      return result, setLoading(false);
    } catch (err) {
      console.log(err.message);
      toast.error("Something Went Wrong Try Again.", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
      });
      setLoading(false);
    }
  };

  return (
    <>
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit(updateAddress)}>
            <div className="row form-row">
              <div className="col-12">
                <div className="form-group">
                  <label>Street Address</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Street Address"
                    {...register("street")}
                    defaultValue={
                      !!data?.address && !!data.address.street_address
                        ? data.address.street_address
                        : ""
                    }
                  />
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="form-group">
                  <label>City</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter City"
                    {...register("city")}
                    defaultValue={
                      !!data?.address && !!data.address.city
                        ? data.address.city
                        : ""
                    }
                  />
                </div>
              </div>
              {/* <div className="col-12 col-md-6">
                <div className="form-group">
                  <label>State</label>
                  <select
                    className="form-select form-control"
                    {...register("state")}
                  >
                    <option
                      defaultValue={
                        !!data?.address && !!data.address.state
                          ? data.address.state
                          : "Select State"
                      }
                    >
                      {!!data?.address && !!data.address.state
                        ? data.address.state
                        : "Select State"}
                    </option>
                    {stateList.map((items, index) => (
                      <option key={index}>{items}</option>
                    ))}
                  </select>
                </div>
              </div> */}
              <div className="col-12 col-md-6">
                <div className="form-group">
                  <label>Zip Code</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="13420"
                    {...register("pinCode")}
                    defaultValue={
                      !!data?.address && !!data.address.pincode
                        ? data.address.pincode
                        : "Enter PIN Code"
                    }
                  />
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="form-group">
                  <label>Country</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="13420"
                    readOnly
                    {...register("country")}
                    defaultValue={
                      !!data?.address && !!data.address.country
                        ? data.address.country
                        : "India"
                    }
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
          </form>
        </div>
      </div>
    </>
  );
};

export default AddressInfo;
