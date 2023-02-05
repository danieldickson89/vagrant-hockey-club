import Head from "next/head";
import utilStyles from "../../styles/utils.module.css";
import Toolbar from "../../components/toolbar/toolbar";
import { useState } from "react";

export async function getServerSideProps() {
  const apiBaseUrl = process.env.API_BASE_URL;
  let res = await fetch(`${apiBaseUrl}attendingPlayers`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  let players = await res.json();
  return {
    props: { players, apiBaseUrl },
  };
}

export default function SetTeams({ players, apiBaseUrl }) {
  const [noTeamPlayers, setNoTeamPlayers] = useState(players.response);
  const [teamOne, setTeamOne] = useState([]);
  const [teamTwo, setTeamTwo] = useState([]);
  const [teamOneAvgs, setTeamOneAvgs] = useState([0, 0, 0, 0, 0, 0]);
  const [teamTwoAvgs, setTeamTwoAvgs] = useState([0, 0, 0, 0, 0, 0]);

  const overallAvgs = findAverages(players.response);

  function addToTeam(action, player) {
    switch (action) {
      case "addToOne":
        setTeamOne([...teamOne, player]);
        setTeamTwo(teamTwo.filter((a) => a._id !== player._id));
        setNoTeamPlayers(noTeamPlayers.filter((a) => a._id !== player._id));
        const newTeamOneAvgs = findAverages([...teamOne, player]);
        setTeamOneAvgs(newTeamOneAvgs);
        break;
      case "addToTwo":
        setTeamTwo([...teamTwo, player]);
        setTeamOne(teamOne.filter((a) => a._id !== player._id));
        setNoTeamPlayers(noTeamPlayers.filter((a) => a._id !== player._id));
        const newTeamTwoAvgs = findAverages([...teamTwo, player]);
        setTeamTwoAvgs(newTeamTwoAvgs);
        break;
      case "removeFromOne":
        setNoTeamPlayers([...noTeamPlayers, player]);
        if (Object.keys(teamOne).length === 1) {
          const newTeamAvgs = [0, 0, 0, 0, 0, 0];
          setTeamOneAvgs(newTeamAvgs);
        }
        setTeamOne(teamOne.filter((a) => a._id !== player._id));
        break;
      case "removeFromTwo":
        setNoTeamPlayers([...noTeamPlayers, player]);
        if (Object.keys(teamTwo).length === 1) {
          const newTeamAvgs = [0, 0, 0, 0, 0, 0];
          setTeamTwoAvgs(newTeamAvgs);
        }
        setTeamTwo(teamTwo.filter((a) => a._id !== player._id));
        break;
      case "switchToTwo":
        setTeamTwo([...teamTwo, player]);
        if (Object.keys(teamOne).length === 1) {
          const newTeamAvgs = [0, 0, 0, 0, 0, 0];
          setTeamOneAvgs(newTeamAvgs);
        }
        setTeamOne(teamOne.filter((a) => a._id !== player._id));
        break;
      case "switchToOne":
        setTeamOne([...teamOne, player]);
        setTeamTwo(teamTwo.filter((a) => a._id !== player._id));
        if (Object.keys(teamTwo).length === 1) {
          const newTeamAvgs = [0, 0, 0, 0, 0, 0];
          setTeamTwoAvgs(newTeamAvgs);
        }
        break;
    }
  }

  function resetTeams() {
    setNoTeamPlayers(players.response);
    setTeamOne([]);
    setTeamTwo([]);
    setTeamOneAvgs([0, 0, 0, 0, 0, 0]);
    setTeamTwoAvgs([0, 0, 0, 0, 0, 0]);
  }

  function findAverages(team) {
    const totalPlayers = Object.keys(team).length;
    let teamAverages = [0, 0, 0, 0, 0, 0];
    team.map((player) => {
      teamAverages[0] += player.offense;
      teamAverages[1] += player.defense;
      teamAverages[2] += player.skating;
      teamAverages[3] += player.passing;
      teamAverages[4] += player.shot;
      teamAverages[5] += player.stick;
    });
    teamAverages[0] = Math.round((teamAverages[0] / totalPlayers) * 10) / 10;
    teamAverages[1] = Math.round((teamAverages[1] / totalPlayers) * 10) / 10;
    teamAverages[2] = Math.round((teamAverages[2] / totalPlayers) * 10) / 10;
    teamAverages[3] = Math.round((teamAverages[3] / totalPlayers) * 10) / 10;
    teamAverages[4] = Math.round((teamAverages[4] / totalPlayers) * 10) / 10;
    teamAverages[5] = Math.round((teamAverages[5] / totalPlayers) * 10) / 10;

    return teamAverages;
  }

  function findNextPlayer(team, averages) {
    const teamAvgs = findAverages(team);
    const avgDiffs = [
      Math.abs(teamAvgs[0] - averages[0]),
      Math.abs(teamAvgs[1] - averages[1]),
      Math.abs(teamAvgs[2] - averages[2]),
      Math.abs(teamAvgs[3] - averages[3]),
      Math.abs(teamAvgs[4] - averages[4]),
      Math.abs(teamAvgs[5] - averages[5]),
    ];
    let sumDiff = null;
    let nextPlayer;
    noTeamPlayers.map((player) => {
      let playerDiff =
        Math.abs(player.offense - avgDiffs[0]) +
        Math.abs(player.defense - avgDiffs[1]) +
        Math.abs(player.skating - avgDiffs[2]) +
        Math.abs(player.passing - avgDiffs[3]) +
        Math.abs(player.shot - avgDiffs[4]) +
        Math.abs(player.stick - avgDiffs[5]);
      if (sumDiff == null || playerDiff < sumDiff) {
        sumDiff = playerDiff;
        nextPlayer = player;
      }
    });
    return nextPlayer;
  }

  function autoFillNextPlayer() {
    if (Object.keys(noTeamPlayers).length > 0) {
      let nextPlayer;
      if (Object.keys(teamOne).length < Object.keys(teamTwo).length) {
        nextPlayer = findNextPlayer(teamOne, overallAvgs);
        addToTeam("addToOne", nextPlayer);
      } else if (Object.keys(teamTwo).length < Object.keys(teamOne).length) {
        nextPlayer = findNextPlayer(teamTwo, overallAvgs);
        addToTeam("addToTwo", nextPlayer);
      } else if (
        (Object.keys(teamOne).length + Object.keys(teamTwo).length) % 4 ===
        0
      ) {
        nextPlayer = findNextPlayer(teamOne, overallAvgs);
        addToTeam("addToOne", nextPlayer);
      } else {
        nextPlayer = findNextPlayer(teamTwo, overallAvgs);
        addToTeam("addToTwo", nextPlayer);
      }
    }
  }

  return (
    <>
      <Head>
        <title>VHC</title>
      </Head>

      <div className={utilStyles.container}>
        <Toolbar></Toolbar>
        <div className={utilStyles.navbarSpacer}></div>
        <div className={utilStyles.myFormRow}>
          <button onClick={() => resetTeams()}>Reset</button>
          <button onClick={() => autoFillNextPlayer()}>Autofill Player</button>
        </div>
        <br />
        <div className={utilStyles.myRow}>
          <div
            className={`${utilStyles.myColumn} ${utilStyles.oneThirdColumn}`}
          >
            {overallAvgs[0]} {overallAvgs[1]} {overallAvgs[2]} {overallAvgs[3]}{" "}
            {overallAvgs[4]} {overallAvgs[5]}
          </div>
          <div
            className={`${utilStyles.myColumn} ${utilStyles.oneThirdColumn}`}
          >
            {teamOneAvgs[0]} {teamOneAvgs[1]} {teamOneAvgs[2]} {teamOneAvgs[3]}{" "}
            {teamOneAvgs[4]} {teamOneAvgs[5]}
          </div>
          <div
            className={`${utilStyles.myColumn} ${utilStyles.oneThirdColumn}`}
          >
            {teamTwoAvgs[0]} {teamTwoAvgs[1]} {teamTwoAvgs[2]} {teamTwoAvgs[3]}{" "}
            {teamTwoAvgs[4]} {teamTwoAvgs[5]}
          </div>
        </div>
        <div className={utilStyles.myRow}>
          <div
            className={`${utilStyles.myColumn} ${utilStyles.oneThirdColumn}`}
          >
            <div>Unassigned</div>
            {noTeamPlayers.map((player, index) => (
              <div key={player._id}>
                <div>
                  <button onClick={() => addToTeam("addToOne", player)}>
                    Team 1
                  </button>
                  <button onClick={() => addToTeam("addToTwo", player)}>
                    Team 2
                  </button>{" "}
                  {player.name}
                </div>
              </div>
            ))}
          </div>
          <div
            className={`${utilStyles.myColumn} ${utilStyles.oneThirdColumn}`}
          >
            <div>Team 1</div>
            {teamOne.map((player, index) => (
              <div key={player._id}>
                <div>
                  <button onClick={() => addToTeam("removeFromOne", player)}>
                    Remove
                  </button>
                  <button onClick={() => addToTeam("switchToTwo", player)}>
                    Switch Teams
                  </button>{" "}
                  {player.name}
                </div>
              </div>
            ))}
          </div>
          <div
            className={`${utilStyles.myColumn} ${utilStyles.oneThirdColumn}`}
          >
            <div>Team 2</div>
            {teamTwo.map((player, index) => (
              <div key={player._id}>
                <div>
                  <button onClick={() => addToTeam("removeFromTwo", player)}>
                    Remove
                  </button>
                  <button onClick={() => addToTeam("switchToOne", player)}>
                    Switch Teams
                  </button>{" "}
                  {player.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
