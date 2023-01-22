import Head from "next/head";
import utilStyles from "../styles/utils.module.css";
import Toolbar from "../components/toolbar/toolbar";

export default function Home({}) {
  return (
    <>
      <Head>
        <title>VHC</title>
      </Head>

      <div className={utilStyles.container}>
        <Toolbar></Toolbar>
        <div className={utilStyles.navbarSpacer}></div>
        <h2>Welcome to Vagrant Hockey Club!</h2>
      </div>
    </>
  );
}
