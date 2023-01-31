import Head from "next/head";
import utilStyles from "../../styles/utils.module.css";
import Toolbar from "../../components/toolbar/toolbar";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

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
  const router = useRouter();

  let [currName, setName] = useState(player.name);
  let [currOffense, setOffense] = useState(player.offense);
  let [currDefense, setDefense] = useState(player.defense);
  let [currSkating, setSkating] = useState(player.skating);
  let [currPassing, setPassing] = useState(player.passing);
  let [currShot, setShot] = useState(player.shot);
  let [currStick, setStick] = useState(player.stick);

  async function savePlayer() {
    const newPlayer = {
      name: currName,
      offense: currOffense,
      defense: currDefense,
      skating: currSkating,
      passing: currPassing,
      shot: currShot,
      stick: currStick,
    };
    await fetch(`${apiBaseUrl}player?id=${player._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPlayer),
    });
    router.push("/players/roster");
  }

  return (
    <>
      <Head>
        <title>VHC</title>
      </Head>

      <div className={utilStyles.container}>
        <Toolbar></Toolbar>
        <div className={utilStyles.navbarSpacer}></div>
        <div className={utilStyles.myForm}>
          <div className={utilStyles.myFormRow}>
            <label className={utilStyles.myLabel}>Full Name </label>
            <input
              className={`${utilStyles.myInput} ${utilStyles.myTextInput}`}
              name="fullName"
              defaultValue={currName}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={utilStyles.myFormRow}>
            <label className={utilStyles.myLabel}>Offense </label>
            <input
              className={`${utilStyles.myInput} ${utilStyles.myNumberInput}`}
              name="offense"
              defaultValue={currOffense}
              type="number"
              min="0"
              max="100"
              onChange={(e) => setOffense(e.target.value)}
            />
          </div>
          <div className={utilStyles.myFormRow}>
            <label className={utilStyles.myLabel}>Defense </label>
            <input
              className={`${utilStyles.myInput} ${utilStyles.myNumberInput}`}
              name="defense"
              defaultValue={currDefense}
              type="number"
              min="0"
              max="100"
              onChange={(e) => setDefense(e.target.value)}
            />
          </div>
          <div className={utilStyles.myFormRow}>
            <label className={utilStyles.myLabel}>Skating </label>
            <input
              className={`${utilStyles.myInput} ${utilStyles.myNumberInput}`}
              name="skating"
              defaultValue={currSkating}
              type="number"
              min="0"
              max="100"
              onChange={(e) => setSkating(e.target.value)}
            />
          </div>
          <div className={utilStyles.myFormRow}>
            <label className={utilStyles.myLabel}>Passing </label>
            <input
              className={`${utilStyles.myInput} ${utilStyles.myNumberInput}`}
              name="passing"
              defaultValue={currPassing}
              type="number"
              min="0"
              max="100"
              onChange={(e) => setPassing(e.target.value)}
            />
          </div>
          <div className={utilStyles.myFormRow}>
            <label className={utilStyles.myLabel}>Shot </label>
            <input
              className={`${utilStyles.myInput} ${utilStyles.myNumberInput}`}
              name="shot"
              defaultValue={currShot}
              type="number"
              min="0"
              max="100"
              onChange={(e) => setShot(e.target.value)}
            />
          </div>
          <div className={utilStyles.myFormRow}>
            <label className={utilStyles.myLabel}>Stick </label>
            <input
              className={`${utilStyles.myInput} ${utilStyles.myNumberInput}`}
              name="stick"
              defaultValue={currStick}
              type="number"
              min="0"
              max="100"
              onChange={(e) => setStick(e.target.value)}
            />
          </div>
          <div
            className={`${utilStyles.myFormRow} ${utilStyles.myFormRowCentered}`}
          >
            <button
              className={`${utilStyles.myFormButton} ${utilStyles.myFormButtonCancel}`}
            >
              <Link href={`/players/roster`}>Cancel</Link>
            </button>
            <button
              className={`${utilStyles.myFormButton} ${utilStyles.myFormButtonSave}`}
              onClick={savePlayer}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
