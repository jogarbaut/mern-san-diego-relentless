import { useAuthContext } from "../hooks/useAuthContext";
import { useAthleteContext } from "../hooks/useAthleteContext";

import React, { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import AthleteUpdateForm from "./AthleteUpdateForm";

const AthleteList = ({ selectedTeam, selectedTeamRoster, setAthleteId }) => {
  const { user } = useAuthContext();
  const { dispatch } = useAthleteContext();

  const deleteAthlete = (athleteId) => {
    axios
      .delete(`http://localhost:8000/api/athlete/${athleteId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => {
        dispatch({ type: "DELETE_ATHLETE", payload: res.data });
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="athlete-list-title">{selectedTeam}</div>
      <Table hover className="athlete-list">
        <thead>
          <tr>
            <td>Athlete Name</td>
            <td>Jersey Number</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {selectedTeamRoster.map((athlete, index) => {
            return (
              <tr key={athlete._id}>
                <td>
                  {athlete.firstName} {athlete.lastName}
                </td>
                <td>#{athlete.jerseyNumber}</td>
                <td>
                  <Button
                    onClick={() => setAthleteId(athlete._id)}
                    variant="secondary"
                  >
                    Profile
                  </Button>
                  {user ? (
                    <>
                      <AthleteUpdateForm athlete={athlete} />
                      <Button
                        onClick={() => deleteAthlete(athlete._id)}
                        variant="danger"
                      >
                        Delete
                      </Button>
                    </>
                  ) : (
                    <></>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default AthleteList;
