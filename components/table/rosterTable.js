import utilStyles from "../../styles/utils.module.css";
import Link from "next/link";
import calculateOverall from "../../services/calculateOverall";
import RosterHeaders from "./rosterHeaders";

export default function RosterTable({
  tableHeaders,
  pushTableHeaders,
  players,
  pushPlayers,
}) {
  const pullSortedPlayers = (playersSorted) => {
    pushPlayers(playersSorted);
  };

  const pullTableHeaders = (updatedTableHeaders) => {
    pushTableHeaders(updatedTableHeaders);
  };

  function isAttending(attending) {
    if (attending) {
      return (
        <button
          className={`${utilStyles.attendingButton} ${utilStyles.myFormButtonSave}`}
        >
          Yes
        </button>
      );
    }
    return (
      <button
        className={`${utilStyles.attendingButton} ${utilStyles.myFormButtonRed}`}
      >
        No
      </button>
    );
  }

  return (
    <>
      <div className={utilStyles.myTable}>
        <RosterHeaders
          pushSortedPlayers={pullSortedPlayers}
          players={players}
          pushTableHeaders={pullTableHeaders}
          tableHeaders={tableHeaders}
        ></RosterHeaders>

        {players.map(
          (
            {
              _id,
              name,
              offense,
              defense,
              skating,
              passing,
              shot,
              stick,
              attending,
            },
            index
          ) => (
            <Link
              href={`/players/${_id}`}
              className={`${utilStyles.myTableRow} ${utilStyles.myTableDataRow}`}
              key={name}
            >
              <div className={utilStyles.myTableCell}>
                {isAttending(attending)}
              </div>
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
