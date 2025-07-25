import { Diagnosis } from "../../types";

interface Props {
  codes?: string[];
  diagnoses: Diagnosis[];
}

const DiagnosisList = ({ codes, diagnoses }: Props) => {
  if (!codes || codes.length === 0) return null;

  return (
    <ul>
      {codes.map((code) => {
        const diagnosis = diagnoses.find((d) => d.code === code);
        return (
          <li key={code}>
            {code} {diagnosis ? `- ${diagnosis.name}` : ""}
          </li>
        );
      })}
    </ul>
  );
};

export default DiagnosisList;
