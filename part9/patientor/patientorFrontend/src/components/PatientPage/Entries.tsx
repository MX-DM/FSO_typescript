import { Entry, Diagnosis } from "../../types";
import HealthCheckEntry from "./HealthCheckEntry";
import HospitalEntry from "./HospitalEntry";
import OccupationalHealthcareEntry from "./OccupationalHealthcareEntry";

const Entries = ({ entries, diagnoses } : {
    entries : Entry[], diagnoses : Diagnosis[]}) => {

    const assertNever = (value: never): never => {
        throw new Error(`Unhandled entry type: ${JSON.stringify(value)}`);
    };

    return(
        <>
        {entries.map((entry) => {
            switch (entry.type) {
                case "HealthCheck":
                    return <HealthCheckEntry key={entry.id} entry={entry} diagnoses={diagnoses} />;
                case "Hospital":
                    return <HospitalEntry key={entry.id} entry={entry} diagnoses={diagnoses} />;
                case "OccupationalHealthcare":
                    return <OccupationalHealthcareEntry key={entry.id} entry={entry} diagnoses={diagnoses} />;
                default:
                    return assertNever(entry);
            }
        })}
        </>
    );
};

export default Entries;