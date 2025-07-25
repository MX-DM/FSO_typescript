import { Card } from "react-bootstrap";
import DiagnosisList from "./DiagnosisList";
import { Diagnosis, OccupationalHealthcareEntry } from "../../types";

const OccupationalEntryDetails = ({ entry, diagnoses }: { 
  entry: OccupationalHealthcareEntry, diagnoses: Diagnosis[] }) => {
  return (
    <Card className="mb-3">
      <Card.Header>Occupational Healthcare</Card.Header>
      <Card.Body>
        <Card.Text><strong>Description:</strong> {entry.description}</Card.Text>
        <Card.Text><strong>Date:</strong> {entry.date}</Card.Text>
        <Card.Text><strong>Specialist:</strong> {entry.specialist}</Card.Text>
        <Card.Text><strong>Employer:</strong> {entry.employerName}</Card.Text>
        {entry.sickLeave && (
          <Card.Text>
            <strong>Sick Leave:</strong> {entry.sickLeave.startDate} to {entry.sickLeave.endDate}
          </Card.Text>
        )}
        <DiagnosisList codes={entry.diagnosisCodes} diagnoses={diagnoses} />
      </Card.Body>
    </Card>
  );
};

export default OccupationalEntryDetails;
