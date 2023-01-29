import { useState } from "react";
import sortData from "../../services/sortData";
import utilStyles from "../../styles/utils.module.css";
import SortIcon from "./sortIcon";

let initialTableHeaders = [
  { title: "Name", type: "abc", sortActive: true, sortAsc: true },
  { title: "Overall", type: "123", sortActive: false, sortAsc: true },
  { title: "Offense", type: "123", sortActive: false, sortAsc: true },
  { title: "Defense", type: "123", sortActive: false, sortAsc: true },
  { title: "Skating", type: "123", sortActive: false, sortAsc: true },
  { title: "Passing", type: "123", sortActive: false, sortAsc: true },
  { title: "Shot", type: "123", sortActive: false, sortAsc: true },
  { title: "Stick", type: "123", sortActive: false, sortAsc: true },
];

export default function RosterHeaders({ players, pushSortedPlayers }) {
  const [tableHeaders, setTableHeaders] = useState(initialTableHeaders);

  function sortPlayers(header) {
    const updatedPlayersData = [...players];
    sortData(updatedPlayersData, header.title.toLowerCase(), header.type, header.sortAsc);
    pushSortedPlayers(updatedPlayersData);
  }

  function handleSortChange(index) {
    const updatedTableHeaders = tableHeaders.map((header, i) => {
      if (index === i) {
        header.sortActive = true;
        header.sortAsc = !header.sortAsc;
        sortPlayers(header);
        return header;
      } else {
        header.sortAsc = true;
        header.sortActive = false;
        return header;
      }
    });
    setTableHeaders(updatedTableHeaders);
  }

  return (
    <>
      <div className={utilStyles.myTableRow}>
        {tableHeaders.map((tableHeader, index) => (
          <div
            className={`${utilStyles.myTableCell} ${utilStyles.myTableHeader}`}
            key={tableHeader.title}
            onClick={() => handleSortChange(index)}
          >
            <SortIcon tableHeaders={tableHeaders} index={index} />
            {tableHeader.title}
          </div>
        ))}
      </div>
    </>
  );
}
