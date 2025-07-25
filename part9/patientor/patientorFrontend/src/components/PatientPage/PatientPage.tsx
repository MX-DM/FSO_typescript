import { useParams } from "react-router-dom";
import patientsService from "../../services/patients";
import diagnosesService from "../../services/diagnoses";
import { useEffect, useState } from "react";
import { Diagnosis, Patient } from "../../types";
import Entries from "./Entries";

import { Card, Container, Spinner } from "react-bootstrap";

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();

  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[] | null>(null);

  const fetchPatient = async (id: string) => {
    const data = await patientsService.getSingle(id);
    setPatient(data);
  };

  const fetchDiagnoses = async () => {
    const data = await diagnosesService.getAll();
    setDiagnoses(data);
  };
  
  useEffect(() => {
    void fetchDiagnoses();
  }, []);

  useEffect(() => {
    if (id) void fetchPatient(id);
  }, [id]);

  

  return (
    <Container fluid className="mt-4 ms-4 me-4">
      {patient && diagnoses ? (
        <Card className="w-100">
          <Card.Body>
            <Card.Title as="h2">{patient.name}</Card.Title>
            <Card.Text><strong>SSN:</strong> {patient.ssn}</Card.Text>
            <Card.Text><strong>Occupation:</strong> {patient.occupation}</Card.Text>
            <Card.Text><strong>Date of Birth:</strong> {patient.dateOfBirth}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <h5>Entries</h5>
            <Entries entries={patient.entries} diagnoses={diagnoses} />
          </Card.Footer>
        </Card>
      ) : (
        <div className="text-center">
          <Spinner animation="border" role="status" />
          <div>Loading patient's data...</div>
        </div>
      )}
    </Container>
  );
};

export default PatientPage;
