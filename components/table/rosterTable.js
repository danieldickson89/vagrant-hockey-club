import utilStyles from "../../styles/utils.module.css";
import Link from "next/link";
import calculateOverall from "../../services/calculateOverall";
import RosterHeaders from "./rosterHeaders";
import { useState } from "react";

export default function RosterTable({ players, pushPlayers }) {
  // const [playersData, setPlayersData] = useState(players);

  const pullSortedPlayers = (playersSorted) => {
    // setPlayersData(playersSorted);
    pushPlayers(playersSorted);
  };

  return (
    <>
      <div className={utilStyles.myTable}>
        <RosterHeaders
          pushSortedPlayers={pullSortedPlayers}
          players={players}
        ></RosterHeaders>

        {players.map(
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
                {calculateOverall(players[index])}
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
    </>
  );
}
