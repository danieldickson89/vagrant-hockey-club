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

function calculateOverall(skater) {
  return Math.round(
    (skater.offense +
      skater.defense +
      skater.skating +
      skater.passing +
      skater.shot +
      skater.stick) /
      6
  );
}

export default function Home({ allSkaters }) {
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
          {allSkaters.response.map(
            (
              { name, offense, defense, skating, passing, shot, stick },
              index
            ) => (
              <div className={utilStyles.myTableRow} key={name}>
                <div className={utilStyles.myTableCell}>{name}</div>
                <div className={utilStyles.myTableCell}>
                  {calculateOverall(allSkaters.response[index])}
                </div>
                <div className={utilStyles.myTableCell}>{offense}</div>
                <div className={utilStyles.myTableCell}>{defense}</div>
                <div className={utilStyles.myTableCell}>{skating}</div>
                <div className={utilStyles.myTableCell}>{passing}</div>
                <div className={utilStyles.myTableCell}>{shot}</div>
                <div className={utilStyles.myTableCell}>{stick}</div>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
}
