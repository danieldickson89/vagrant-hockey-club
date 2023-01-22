import Head from "next/head";
import utilStyles from "../../styles/utils.module.css";
import Toolbar from "../../components/toolbar/toolbar";
import Link from "next/link";

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

function calculateOverall(player) {
  return Math.round(
    (player.offense +
      player.defense +
      player.skating +
      player.passing +
      player.shot +
      player.stick) /
      6
  );
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
        <div className={utilStyles.myTable}>
          <div className={utilStyles.myTableRow}>
            <div
              className={`${utilStyles.myTableCell} ${utilStyles.myTableHeader}`}
            >
              Name
            </div>
            <div
              className={`${utilStyles.myTableCell} ${utilStyles.myTableHeader}`}
            >
              Overall
            </div>
            <div
              className={`${utilStyles.myTableCell} ${utilStyles.myTableHeader}`}
            >
              Offense
            </div>
            <div
              className={`${utilStyles.myTableCell} ${utilStyles.myTableHeader}`}
            >
              Defense
            </div>
            <div
              className={`${utilStyles.myTableCell} ${utilStyles.myTableHeader}`}
            >
              Skating
            </div>
            <div
              className={`${utilStyles.myTableCell} ${utilStyles.myTableHeader}`}
            >
              Passing
            </div>
            <div
              className={`${utilStyles.myTableCell} ${utilStyles.myTableHeader}`}
            >
              Shot
            </div>
            <div
              className={`${utilStyles.myTableCell} ${utilStyles.myTableHeader}`}
            >
              Stick
            </div>
          </div>
          {players.response.map(
            (
              { _id, name, offense, defense, skating, passing, shot, stick },
              index
            ) => (
              <Link
                href={`/players/${_id}`}
                className={`${utilStyles.myTableRow} ${utilStyles.myTableDataRow}`}
                key={name}
              >
                <div className={utilStyles.myTableCell}>{name}</div>
                <div className={utilStyles.myTableCell}>
                  {calculateOverall(players.response[index])}
                </div>
                <div className={utilStyles.myTableCell}>{offense}</div>
                <div className={utilStyles.myTableCell}>{defense}</div>
                <div className={utilStyles.myTableCell}>{skating}</div>
                <div className={utilStyles.myTableCell}>{passing}</div>
                <div className={utilStyles.myTableCell}>{shot}</div>
                <div className={utilStyles.myTableCell}>{stick}</div>
              </Link>
            )
          )}
        </div>
      </div>
    </>
  );
}
