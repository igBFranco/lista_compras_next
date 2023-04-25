import Header from "@/components/Header";
import "@/styles/globals.css";
import { withRouter } from "next/router";

function MyApp({ Component, pageProps, router }: any) {
  const isLoginPage = router.pathname === "/Login";
  return (
    <>
      {!isLoginPage && <Header />}
      <Component {...pageProps} />
    </>
  );
}

export default withRouter(MyApp);
