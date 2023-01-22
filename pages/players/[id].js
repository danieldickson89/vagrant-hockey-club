import Head from "next/head";
import utilStyles from "../../styles/utils.module.css";
import Toolbar from "../../components/toolbar/toolbar";
import Link from "next/link";

export async function getServerSideProps(context) {
  let id = context.query.id;
  let res = await fetch(`${process.env.API_BASE_URL}player?id=${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  let data = await res.json();
  let player = data.response;
  return {
    props: { player },
  };
}

export default function Player({ player }) {
  return (
    <>
      <Head>
        <title>VHC</title>
      </Head>

      <div className={utilStyles.container}>
        <Toolbar></Toolbar>
        <div className={utilStyles.navbarSpacer}></div>
        <div>
          <h1>{player.name}</h1>
        </div>
        <div>
          <h2>
            Offense: {player.offense} Defense: {player.defense} Skating:{" "}
            {player.skating} passing: {player.passing} Shot: {player.shot}{" "}
            Stick: {player.stick}
          </h2>
        </div>
      </div>
    </>
  );
}
