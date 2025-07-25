import { Card } from "react-bootstrap";
import { HealthCheckEntry, Diagnosis } from "../../types";
import DiagnosisList from "./DiagnosisList";

const HealthCheckEntryDetails = ({ entry, diagnoses }: {
   entry: HealthCheckEntry, diagnoses: Diagnosis[]
 }) => {
  return (
    <Card className="mb-3">
      <Card.Header>Health Check</Card.Header>
      <Card.Body>
        <Card.Text><strong>Description:</strong> {entry.description}</Card.Text>
        <Card.Text><strong>Date:</strong> {entry.date}</Card.Text>
        <Card.Text><strong>Specialist:</strong> {entry.specialist}</Card.Text>
        <Card.Text><strong>Health Rating:</strong> {entry.healthCheckRating}</Card.Text>
        <DiagnosisList codes={entry.diagnosisCodes} diagnoses={diagnoses} />
      </Card.Body>
    </Card>
  );
};

export default HealthCheckEntryDetails;
