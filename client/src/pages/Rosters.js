import axios from "axios";

import { useEffect, useState } from "react";
import AthleteForm from "../components/AthleteForm";
import AthleteList from "../components/AthleteList";
import AthleteDetail from "../components/AthleteDetail";

import { useAthleteContext } from "../hooks/useAthleteContext";
import { useAuthContext } from "../hooks/useAuthContext";

// Components
import GamelogList from "../components/GamelogList";

const Rosters = () => {
  // Context
  const { athletes, dispatch } = useAthleteContext();
  const { user } = useAuthContext();

  // Team
  const [selectedTeam, setSelectedTeam] = useState("14U");
  const [selectedTeamRoster, setSelectedTeamRoster] = useState([]);

  // Athlete and gamelog
  const [athlete, setAthlete] = useState("");
  const [athleteId, setAthleteId] = useState("");
  const [gamelog, setGamelog] = useState([]);

  // Toggle edit athlete form state
  const [editAthleteModalToggle, setEditAthleteModalToggle] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/athlete")
      .then((res) => {
        dispatch({ type: "SET_ATHLETES", payload: res.data });
      })
      .catch((err) => console.log(err));
  }, []);

  // Set roster data based on selectedTeam
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/${selectedTeam}`)
      .then((res) => {
        setAthlete("");
        setSelectedTeamRoster(res.data);
      })
      .catch((err) => console.log(err));
  }, [athletes, selectedTeam, dispatch]);

  // Set athlete data and gamelog data based on athleteId
  useEffect(() => {
    if (athleteId) {
      axios
        .get(`http://localhost:8000/api/athlete/${athleteId}`)
        .then((res) => {
          setAthlete(res.data);
          setGamelog(res.data.gamelog);
        })
        .catch((err) => console.log(err));
    }
  }, [athleteId, dispatch, athletes]);

  return (
    <div>
      <div className="container text-center">
        <div className="row">
          <div className="col">
            <h1>Rosters</h1>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <AthleteForm />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <select
              type="text"
              onChange={(e) => setSelectedTeam(e.target.value)}
              value={selectedTeam}
            >
              <option value="14U">14U</option>
              <option value="15U">15U</option>
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <AthleteList
              selectedTeam={selectedTeam}
              selectedTeamRoster={selectedTeamRoster}
              setAthleteId={setAthleteId}
              setEditAthleteModalToggle={setEditAthleteModalToggle}
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            {athlete ? (
              <AthleteDetail
                athlete={athlete}
                gamelog={gamelog}
                setGamelog={setGamelog}
              />
            ) : (
              <></>
            )}
          </div>
          <div className="row">
            <div className="col">
              {athlete ? (
                <GamelogList
                  athleteId={athleteId}
                  gamelog={gamelog}
                  setGamelog={setGamelog}
                />
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rosters;
