import { Card } from "react-bootstrap";
import { HospitalEntry, Diagnosis } from "../../types";
import DiagnosisList from "./DiagnosisList";

const HospitalEntryDetails = ({ entry, diagnoses }: { 
  entry: HospitalEntry, diagnoses: Diagnosis[] }) => {
  return (
    <Card className="mb-3">
      <Card.Header>Hospital Entry</Card.Header>
      <Card.Body>
        <Card.Text><strong>Description:</strong> {entry.description}</Card.Text>
        <Card.Text><strong>Date:</strong> {entry.date}</Card.Text>
        <Card.Text><strong>Specialist:</strong> {entry.specialist}</Card.Text>
        {entry.discharge && (
          <Card.Text>
            <strong>Discharge:</strong> {entry.discharge.date} - {entry.discharge.criteria}
          </Card.Text>
        )}
        <DiagnosisList codes={entry.diagnosisCodes} diagnoses={diagnoses} />
      </Card.Body>
    </Card>
  );
};

export default HospitalEntryDetails;
