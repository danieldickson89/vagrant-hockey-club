import Head from "next/head";
import PlayerDetails from "../../components/player/playerDetails";

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
  const apiBaseUrl = process.env.API_BASE_URL;
  return {
    props: { player, apiBaseUrl },
  };
}

export default function Player({ player, apiBaseUrl }) {
  return (
    <>
      <Head>
        <title>VHC</title>
      </Head>
      <PlayerDetails player={player} isNew={false} apiBaseUrl={apiBaseUrl}></PlayerDetails>
    </>
  );
}
