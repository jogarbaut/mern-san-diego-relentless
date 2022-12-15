import { useAuthContext } from "../hooks/useAuthContext";
import { useAthleteContext } from "../hooks/useAthleteContext";

import React, { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

const AthleteList = ({ selectedTeam, selectedTeamRoster, setAthleteId, prevFirstName, prevLastName, prevTeam, prevJerseyNumber, athleteId }) => {

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
                  <Button onClick={() => setAthleteId(athlete._id)} variant="link">
                    View
                  </Button>
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
