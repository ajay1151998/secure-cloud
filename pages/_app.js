import MasterLayout from "components/layout/MasterLayout";
import GlobalProvider from "context";
import "../public/assets/css/style.css";
import "../public/assets/css/admin.css";
import "../public/user_assets/plugins/apex/apexcharts.css";
import "../public/user_assets/css/style.css";
import "../public/user_assets/css/main.css";
import "../public/assets/css/style2.css";
import "../public/assets/css/style3.css";
function MyApp({ Component, pageProps }) {
  return (
    <GlobalProvider>
      <MasterLayout>
        <Component {...pageProps} />
      </MasterLayout>
    </GlobalProvider>
  );
}

export default MyApp;
