import Head from "next/head";
import utilStyles from "../../styles/utils.module.css";
import Toolbar from "../../components/toolbar/toolbar";

export async function getServerSideProps() {
  const apiBaseUrl = process.env.API_BASE_URL;
  let res = await fetch(`${apiBaseUrl}attendingPlayers`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  let players = await res.json();
  return {
    props: { players, apiBaseUrl },
  };
}

export default function SetTeams({ players, apiBaseUrl }) {
  return (
    <>
      <Head>
        <title>VHC</title>
      </Head>

      <div className={utilStyles.container}>
        <Toolbar></Toolbar>
        <div className={utilStyles.navbarSpacer}></div>
        {players.response.map((player, index) => (
          <div key={player._id}>
            <div>{player.name}</div>
          </div>
        ))}
      </div>
    </>
  );
}
