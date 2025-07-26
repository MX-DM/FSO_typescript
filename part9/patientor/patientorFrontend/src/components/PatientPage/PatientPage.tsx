// PatientPage.tsx
import { useParams } from "react-router-dom";
import patientsService from "../../services/patients";
import diagnosesService from "../../services/diagnoses";
import { useEffect, useState } from "react";
import { Diagnosis, NewEntry, Patient } from "../../types";
import Entries from "./Entries";
import { Card, Container, Spinner, Row, Col } from "react-bootstrap";
import EntryForm from "./EntryForm";
import Notification from "../Notification";
import axios from "axios";

type NotificationState = {
  message: string;
  type: 'success' | 'error';
} | null;

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();

  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[] | null>(null);
  const [notification, setNotification] = useState<NotificationState>(null);

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

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const addEntry = async (newEntry : NewEntry) => {
    if (!patient) {
      showNotification("Patient not loaded yet, retry.", "error");
      return;
    }

    try {
      const addedEntry = await patientsService.createEntry(newEntry, patient.id);
      const newPatient = {
        ...patient,
        entries: patient.entries.concat(addedEntry)
      };
      setPatient(newPatient);
      showNotification('Entry successfully added!', 'success');
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        const data = error.response.data;
        if (Array.isArray(data.error)) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const messages = data.error.map((e: any) => `${e.message}`).join(' - ');
          showNotification(messages, 'error');
        } else if (typeof data.error === 'string') {
          showNotification(data.error, 'error');
        } else {
          showNotification('Validation failed with unknown format', 'error');
        }
      }
    }
  };

  return (
    <Container fluid className="mt-4">
      {notification && (
        <Notification message={notification.message} type={notification.type} />
      )}

      {patient && diagnoses ? (
        <Card className="shadow-lg border-0 rounded-4 p-3 bg-light-subtle">
          <Card.Body>
            <Card.Title as="h2" className="text-primary mb-4">
              {patient.name}
            </Card.Title>
            <Row className="mb-3">
              <Col md={6}><strong>SSN:</strong> {patient.ssn}</Col>
              <Col md={6}><strong>Occupation:</strong> {patient.occupation}</Col>
              <Col md={6}><strong>DOB:</strong> {patient.dateOfBirth}</Col>
              <Col md={6}><strong>Gender:</strong> {patient.gender}</Col>
            </Row>

            <hr />

            <h4 className="text-secondary mb-3">Add New Entry</h4>
            <EntryForm onSubmit={addEntry} diagnoses={diagnoses} />

            <hr />

            <h4 className="text-secondary mt-4 mb-3">Entries</h4>
            <Entries entries={patient.entries} diagnoses={diagnoses} />
          </Card.Body>
        </Card>
      ) : (
        <div className="text-center mt-5">
          <Spinner animation="border" role="status" variant="primary" />
          <div className="mt-2">Loading patient's data...</div>
        </div>
      )}
    </Container>
  );
};

export default PatientPage;
