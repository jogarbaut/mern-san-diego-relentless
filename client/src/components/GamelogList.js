import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import Table from "react-bootstrap/Table";

import { useAthleteContext } from "../hooks/useAthleteContext";
import { useAuthContext } from "../hooks/useAuthContext";
import GamelogUpdateForm from "./GamelogUpdateForm";

const GamelogList = ({ athleteId, gamelog, setGamelog }) => {
  // Context
  const { user } = useAuthContext();
  const { dispatch } = useAthleteContext();

  // const removeFromDom = (gameId) => {
  //   setGamelog(gamelog.filter((game) => game._id !== gameId));
  // };

  const handleDeleteClick = async (gameId) => {
    if (!user) {
      return;
    }

    axios
      .put(
        `http://localhost:8000/api/athlete/gamelog/remove-game/${athleteId}/${gameId}`,
        {},
        { headers: { Authorization: `Bearer ${user.token}` } }
      )
      .then((res) => {
        // removeFromDom(gameId);
        dispatch({ type: "UPDATE_ATHLETE", payload: res.data });
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="gamelog-list-title">Gamelog</div>
      {gamelog.length === 0 ? (
        <h1>No game data available</h1>
      ) : (
        <Table responsive hover size="sm" className="gamelog-table">
          <thead>
            <tr>
              <td>DATE</td>
              <td>OPP</td>
              <td>SCORE</td>
              <td>PTS</td>
              <td>FGM</td>
              <td>FGA</td>
              <td>FG%</td>
              <td>3PM</td>
              <td>3PA</td>
              <td>3P%</td>
              <td>FTM</td>
              <td>FTA</td>
              <td>FT%</td>
              <td>REB</td>
              <td>AST</td>
              <td>BLK</td>
              <td>STL</td>
              <td>TOV</td>
              <td>ACTIONS</td>
            </tr>
          </thead>
          <tbody>
            {gamelog.map((game, index) => {
              return (
                <tr key={game._id}>
                  <td>{moment.utc(game.date).format("YYYY-MM-DD")}</td>
                  <td>{game.opponent}</td>
                  <td>
                    {game.result} {game.score}-{game.opponentScore}
                  </td>
                  <td>{game.points}</td>
                  <td>{game.fieldGoalsMade}</td>
                  <td>{game.fieldGoalsAttempted}</td>
                  <td>{game.fieldGoalsPercentage}</td>
                  <td>{game.threePointFieldGoalsMade}</td>
                  <td>{game.threePointFieldGoalsAttempted}</td>
                  <td>{game.threePointFieldGoalsPercentage}</td>
                  <td>{game.freethrowsMade}</td>
                  <td>{game.freethrowsAttempted}</td>
                  <td>{game.freethrowsPercentage}</td>
                  <td>{game.rebounds}</td>
                  <td>{game.assists}</td>
                  <td>{game.blocks}</td>
                  <td>{game.steals}</td>
                  <td>{game.turnovers}</td>
                  <td>
                    {/* <Link to={`/athlete/edit/${id}/${game._id}`}><Button variant="link">Edit</Button> */}
                    {/* </Link>  */}|{" "}
                    <span onClick={() => handleDeleteClick(game._id)}>
                      Delete
                    </span>
                    <GamelogUpdateForm athleteId={athleteId} game={game} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default GamelogList;
