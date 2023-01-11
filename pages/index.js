import Head from "next/head";
import utilStyles from "../styles/utils.module.css";
import Toolbar from "../components/toolbar/toolbar";

export async function getServerSideProps(context) {
  let res = await fetch("http://localhost:3000/api/skaters", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  let allSkaters = await res.json();
  return {
    props: { allSkaters },
  };
}

export default function Home({ allSkaters }) {
  return (
    <>
      <Head>
        <title>VHC</title>
      </Head>

      <div className={utilStyles.container}>
        <Toolbar></Toolbar>
        <br />
        <br />
        <br />
        <br />
        <br />
        {allSkaters.data.map(
          ({ name, offense, defense, skating, passing, shot, stick }) => (
            <div key={name}>
              {name}: offense({offense}) defense({defense}) skating(
              {skating}) passing({passing}) shot({shot}) stick({stick})
            </div>
          )
        )}
      </div>
    </>
  );
}
