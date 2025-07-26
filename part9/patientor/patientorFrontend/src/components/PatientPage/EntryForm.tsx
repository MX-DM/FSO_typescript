import { useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { Diagnosis, EntryType, HealthCheckRating, NewEntry } from "../../types";

type EntryFormProps = {
  onSubmit: (entry: NewEntry) => void;
  diagnoses: Diagnosis[];
};

const EntryForm = ({ onSubmit, diagnoses }: EntryFormProps) => {
  const [type, setType] = useState<EntryType>("HealthCheck");

  // Shared Fields
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

  // HealthCheck Fields
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(0);

  // Hospital Fields
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");

  // Occupational Fields
  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStart, setSickLeaveStart] = useState("");
  const [sickLeaveEnd, setSickLeaveEnd] = useState("");

  const handleDiagnosisToggle = (code: string) => {
    setDiagnosisCodes((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const baseEntry = {
      date,
      description,
      specialist,
      diagnosisCodes: diagnosisCodes.length > 0 ? diagnosisCodes : undefined,
    };

    let entry: NewEntry;

    switch (type) {
      case "HealthCheck":
        entry = {
          ...baseEntry,
          type,
          healthCheckRating,
        };
        break;

      case "Hospital":
        entry = {
          ...baseEntry,
          type,
          discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria,
          },
        };
        break;

      case "OccupationalHealthcare":
        entry = {
          ...baseEntry,
          type,
          employerName,
          sickLeave:
            sickLeaveStart && sickLeaveEnd
              ? { startDate: sickLeaveStart, endDate: sickLeaveEnd }
              : undefined,
        };
        break;

      default:
        throw new Error("Unsupported entry type");
    }

    onSubmit(entry);
  };

  return (
    <Form onSubmit={handleSubmit} className="w-100">
      <Form.Group className="mb-3">
        <Form.Label>Entry Type</Form.Label>
        <Form.Select value={type} onChange={(e) => setType(e.target.value as EntryType)}>
          <option value="HealthCheck">Health Check</option>
          <option value="Hospital">Hospital</option>
          <option value="OccupationalHealthcare">Occupational Healthcare</option>
        </Form.Select>
      </Form.Group>

      {/* Shared Fields */}
      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control value={description} onChange={(e) => setDescription(e.target.value)} />
      </Form.Group>

      <Row className="mb-3">
        <Col>
          <Form.Label>Date</Form.Label>
          <Form.Control type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </Col>
        <Col>
          <Form.Label>Specialist</Form.Label>
          <Form.Control value={specialist} onChange={(e) => setSpecialist(e.target.value)} />
        </Col>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label>Diagnosis Codes</Form.Label>
        <div>
          {diagnoses.map((diag) => (
            <Form.Check
              key={diag.code}
              type="checkbox"
              label={`${diag.code} - ${diag.name}`}
              checked={diagnosisCodes.includes(diag.code)}
              onChange={() => handleDiagnosisToggle(diag.code)}
            />
          ))}
        </div>
      </Form.Group>

      {/* Type-specific fields */}
      {type === "HealthCheck" && (
        <Form.Group className="mb-3">
          <Form.Label>Health Check Rating</Form.Label>
          <Form.Select
            value={healthCheckRating}
            onChange={(e) => setHealthCheckRating(Number(e.target.value))}
          >
            {Object.entries(HealthCheckRating)
              .filter(([key]) => isNaN(Number(key)))
              .map(([key, value]) => (
                <option key={value} value={value}>
                  {key}
                </option>
              ))}
          </Form.Select>
        </Form.Group>
      )}

      {type === "Hospital" && (
        <>
          <Form.Group className="mb-3">
            <Form.Label>Discharge Date</Form.Label>
            <Form.Control
              type="date"
              value={dischargeDate}
              onChange={(e) => setDischargeDate(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Discharge Criteria</Form.Label>
            <Form.Control
              value={dischargeCriteria}
              onChange={(e) => setDischargeCriteria(e.target.value)}
            />
          </Form.Group>
        </>
      )}

      {type === "OccupationalHealthcare" && (
        <>
          <Form.Group className="mb-3">
            <Form.Label>Employer Name</Form.Label>
            <Form.Control
              value={employerName}
              onChange={(e) => setEmployerName(e.target.value)}
            />
          </Form.Group>
          <Row className="mb-3">
            <Col>
              <Form.Label>Sick Leave Start</Form.Label>
              <Form.Control
                type="date"
                value={sickLeaveStart}
                onChange={(e) => setSickLeaveStart(e.target.value)}
              />
            </Col>
            <Col>
              <Form.Label>Sick Leave End</Form.Label>
              <Form.Control
                type="date"
                value={sickLeaveEnd}
                onChange={(e) => setSickLeaveEnd(e.target.value)}
              />
            </Col>
          </Row>
        </>
      )}

      <Button type="submit" className="mt-2">
        Submit Entry
      </Button>
    </Form>
  );
};

export default EntryForm;
