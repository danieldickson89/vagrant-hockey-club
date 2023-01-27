import Head from "next/head";
import utilStyles from "../../styles/utils.module.css";
import Toolbar from "../../components/toolbar/toolbar";
import RosterTable from "../../components/table/rosterTable";

export async function getServerSideProps() {
  let res = await fetch(`${process.env.API_BASE_URL}players`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  let players = await res.json();
  return {
    props: { players },
  };
}

export default function Roster({ players }) {
  return (
    <>
      <Head>
        <title>VHC</title>
      </Head>

      <div className={utilStyles.container}>
        <Toolbar></Toolbar>
        <div className={utilStyles.navbarSpacer}></div>
        <RosterTable players={players}></RosterTable>
      </div>
    </>
  );
}
