import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import axios from "axios";
import { setCookie } from "nookies";
import { useAuth } from "context";
import { apiUrl } from "config/api";
import Router from "next/router";
const Index = () => {
  const {
    register,
    handleSubmit,
    reset,

    formState: { errors },
  } = useForm();

  const { dispatchAuth } = useAuth();

  const onSubmit = async (data, e) => {
    e.preventDefault();
    if (!data.email || !data.password) {
      alert("please fill all data");
      return;
    }
    dispatchAuth({ type: "AUTH_LOADING" });

    try {
      const payload = {
        identifier: data.email,
        password: data.password,
      };
      const res = await axios.post(`${apiUrl}/auth/local`, payload);
      const result = res.data;

      if (result.jwt && result.user.role.id === 1) {
        setCookie(null, "token", result.jwt, {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        });
        setCookie(null, "user", JSON.stringify(result.user), {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        });
        dispatchAuth({
          type: "LOGIN_SUCCESS",
          payload: { token: result.jwt, user: result.user },
        });

        reset();
        alert("login success");

        Router.push("/user/dashboard");
      }
    } catch (error) {
      console.log(error);
      alert("Email Or Password does not exist");

      dispatchAuth({
        type: "LOGIN_FAILED",
        payload: error.message
          ? error.message
          : "Something went wrong, try agin",
      });
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
            <div className="col-lg-4 col-xl-4 col-xxl-4"></div>
            <div className="col-12 col-lg-4 col-xl-4 col-xxl-4">
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
                  <div
                    className="back-home-btn text-center"
                    style={{
                      borderRadius: "100px 30px 30px 100px",
                    }}
                  ></div>
                  {/* <Image
                    src="/assets/images/logo-white.png"
                    width="150px"
                    height="100px"
                    alt="Rims Logo"
                  /> */}
                  <p className="fs-5 text-light my-4">User Login</p>
                  <div
                    className="patient-login-form"
                    style={{ width: "340px" }}
                  >
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Username"
                        {...register("email")}
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="password"
                        className="form-control"
                        {...register("password")}
                      />
                    </div>
                    <button
                      className="btn btn-outline-dark text-light rounded-pill px-5"
                      type="submit"
                    >
                      Login
                    </button>
                    <div className="forgot-password-sec mt-4 mb-1">
                      <p className="fs-6 text-light">Forgot Your Password</p>
                    </div>
                    <div className="mb-4">
                      <p>
                        ------------------------------ OR
                        ------------------------------
                      </p>
                    </div>
                    <div className="social-login mb-3">
                      <div className="row align-items-center">
                        <div className="col-6 text-end">
                          <div className="social-login-inner mb-4">
                            <Link href="#">
                              <a className="border border-1 border-light p-3 bg-light rounded">
                                <i className="fab fa-google fs-5 text-danger"></i>
                              </a>
                            </Link>
                          </div>
                        </div>
                        <div className="col-6 text-start">
                          <div className="social-login-inner mb-4">
                            <Link href="#">
                              <a
                                className="p-3 rounded"
                                style={{
                                  backgroundColor: "#1877f2",
                                  border: "1px solid #1877f2",
                                }}
                              >
                                <i className="fab fa-facebook fs-5 text-light"></i>
                              </a>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="dont-account text-light">
                      <p>Don&apos;t You Have Account?</p>
                    </div>
                    <Link href="/signup">
                      <a className="btn btn-dark rounded-pill px-5 text-light">
                        Sign up
                      </a>
                    </Link>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-4 col-xl-4 col-xxl-4"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
