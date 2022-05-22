import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { apiUrl } from "config/api";
const Signup = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const registerUser = async (payload) => {
    const res = await axios.post(`${apiUrl}/auth/local/register`, payload);
    const result = await res.data;
    return result;
  };

  // creating user profile after user is created
  const createUserProfile = async (data, token) => {
    const profilePayload = {
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
    };

    //post function for the user profile
    const res = await axios.post(`${apiUrl}/drives`, profilePayload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const result = res.data;
    return result;
  };

  //onsubmit function defined
  const onSubmit = async (data, e) => {
    e.preventDefault();

    if (data.password != data.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const payload = {
        username: data.email,
        email: data.email,
        password: data.password,
      };

      const result = await registerUser(payload);

      if (result.jwt) {
        // create profile

        const profile = await createUserProfile(data, result.jwt);

        await axios.put(
          `${apiUrl}/users/${result.user.id}`,
          {
            profileId: profile.id,
          },
          {
            headers: {
              Authorization: `Bearer ${result.jwt}`,
            },
          }
        );
      }
      alert("Registration Succesful");

      reset();
      router.push("/");
    } catch (err) {
      alert("Registration Succesful");
    }
  };
  return (
    <>
      <div
        className="patient-login d-flex justify-content-center align-items-center"
        style={{
          backgroundImage: "url(/assets/images/ererere.png)",
          backgroundSize: "cover",
          height: "100vh",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-4 col-lg-4 col-xl-4 col-xxl-4"></div>
            <div className="col-12 col-4 col-lg-4 col-xl-4 col-xxl-4">
              <div
                className="patient-login-content text-center d-flex justify-content-center align-items-center pt-5 pb-5"
                style={{
                  backgroundImage: "url(/assets/images/Loginerer.png)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  boxShadow: "0px 5px 60px 2px #000",
                }}
              >
                <form onSubmit={handleSubmit(onSubmit)}>
                  {/* <Image
                    src="/assets/images/logo-white.png"
                    width="150px"
                    height="100px"
                    alt="Rims Logo"
                  /> */}
                  <p className="fs-5 text-light my-4">User Registration</p>
                  <div
                    className="patient-login-form"
                    style={{ width: "340px" }}
                  >
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="First Name"
                        required
                        {...register("firstName")}
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Last Name"
                        required
                        {...register("lastName")}
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        required
                        {...register("email")}
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Create Password"
                        required
                        {...register("password")}
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Confirm Password"
                        required
                        {...register("confirmPassword")}
                      />
                    </div>
                    <button
                      className="btn btn-outline-dark text-light rounded-pill px-5"
                      type="submit"
                    >
                      Sign up
                    </button>
                    {/* <div className="forgot-password-sec my-4">
                      <p className="fs-6">Forgot Your Password</p>
                    </div> */}
                    {/* <div className="welcome-heading mt-5 mb-4">
                      <p className="fs-1 text-capitalize text-light">Welcome</p>
                    </div> */}
                    <div className="dont-account my-4 text-light">
                      <p>Already Have An Account?</p>
                    </div>
                    <Link href="/">
                      <a className="btn btn-dark rounded-pill px-5">Login</a>
                    </Link>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-4 col-lg-4 col-xl-4 col-xxl-4"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
