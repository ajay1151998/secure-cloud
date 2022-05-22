import { useRouter } from "next/router";
import { useAuth } from "context";

export const withAuth = (WrappedComponent) => {
  return (props) => {
    // checks whether we are on client / browser or server.
    if (typeof window !== "undefined") {
      const Router = useRouter();

      const {
        auth: { user, loading, error },
      } = useAuth();

      // If there is no access token we redirect to "/" page.
      if (loading === true) {
        return <h2>auth loading...</h2>;
      }

      if (error) {
        Router.replace("/");
      }

      // If this is an accessToken we just render the component that was passed with all its props

      return user && <WrappedComponent {...props} />;
    }

    // If we are on server, return null
    return null;
  };
};
