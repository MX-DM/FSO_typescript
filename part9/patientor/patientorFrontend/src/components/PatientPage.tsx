import { useParams } from "react-router-dom";
import patientsService from "../services/patients";
import { useEffect, useState } from "react";
import { Patient } from "../types";

const PatientPage = () => {
    const { id } = useParams<{ id: string }>();
    
    const [patient, setPatient] = useState<Patient | null>(null);

    const fetchPatient = async (id: string) => {
        const data = await patientsService.getSingle(id);
        setPatient(data);
    };

    useEffect(() => {
        if (id) {void fetchPatient(id);}
    }, [id]);

    return(
        <>
            {patient ? (
                <div>
                    <h1>{patient.name}</h1>
                    <p>SSN: {patient.ssn}</p>
                    <p>Occupation: {patient.occupation}</p>
                    <p>Date of Birth: {patient.dateOfBirth}</p>
                </div>
            ) : (
                <div>Loading patient's data...</div>
            )}
        </>
    );
    
};

export default PatientPage;