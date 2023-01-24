import Head from "next/head";
import utilStyles from "../../styles/utils.module.css";
import Toolbar from "../../components/toolbar/toolbar";
import Link from "next/link";
import calculateOverall from "../../services/calculateOverall";
import sortData from "../../services/sortData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpAZ,
  faArrowDownZA,
  faArrowUp19,
  faArrowDown91,
} from "@fortawesome/free-solid-svg-icons";

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

const tableHeaders = [
  { title: "Name", type: "abc", sortActive: true, sortAsc: true },
  { title: "Overall", type: "123", sortActive: false, sortAsc: true },
  { title: "Offense", type: "123", sortActive: false, sortAsc: true },
  { title: "Defense", type: "123", sortActive: false, sortAsc: true },
  { title: "Skating", type: "123", sortActive: false, sortAsc: true },
  { title: "Passing", type: "123", sortActive: false, sortAsc: true },
  { title: "Shot", type: "123", sortActive: false, sortAsc: true },
  { title: "Stick", type: "123", sortActive: false, sortAsc: true },
];

function updateHeader(index) {
  for (let i = 0; i < tableHeaders.length; i++) {
    if (index === i) {
      tableHeaders[i].sortActive = true;
      tableHeaders[i].sortAsc = !tableHeaders[i].sortAsc;
      sortData(
        players, // Having trouble getting the players in this function so we can pass it to be sorted...
        tableHeaders[i].title.toLocaleLowerCase(),
        tableHeaders[i].sortAsc
      );
    } else {
      tableHeaders[i].sortActive = false;
    }
  }
}

function SortIcon(props) {
  for (let i = 0; i < tableHeaders.length; i++) {
    if (tableHeaders[props.index].sortActive) {
      if (
        tableHeaders[props.index].type === "abc" &&
        tableHeaders[props.index].sortAsc
      ) {
        return (
          <FontAwesomeIcon
            className={utilStyles.fontAwesomeIcon}
            icon={faArrowUpAZ}
          />
        );
      } else if (
        tableHeaders[props.index].type === "abc" &&
        !tableHeaders[props.index].sortAsc
      ) {
        return (
          <FontAwesomeIcon
            className={utilStyles.fontAwesomeIcon}
            icon={faArrowDownZA}
          />
        );
      } else if (
        tableHeaders[props.index].type === "123" &&
        tableHeaders[props.index].sortAsc
      ) {
        return (
          <FontAwesomeIcon
            className={utilStyles.fontAwesomeIcon}
            icon={faArrowUp19}
          />
        );
      } else if (
        tableHeaders[props.index].type === "123" &&
        !tableHeaders[props.index].sortAsc
      ) {
        return (
          <FontAwesomeIcon
            className={utilStyles.fontAwesomeIcon}
            icon={faArrowDown91}
          />
        );
      }
    }
    return;
  }
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
            {tableHeaders.map(({ title, type, sortActive, sortAsc }, index) => (
              <div
                className={`${utilStyles.myTableCell} ${utilStyles.myTableHeader}`}
              >
                <SortIcon index={index} />
                {title}
              </div>
            ))}
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
