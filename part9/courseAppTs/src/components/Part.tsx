import type { CoursePart } from "../App"
import PartLayout from "./PartLayout";

interface PartProps {
    part: CoursePart
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ part }: PartProps) => {
    switch (part.kind) {
      case "basic":
        return (
          <PartLayout name={part.name} exerciseCount={part.exerciseCount}>
            <li>{part.description}</li>
          </PartLayout>
        );
      case "group":
        return (
          <PartLayout name={part.name} exerciseCount={part.exerciseCount}>
            <li>{part.groupProjectCount}</li>
          </PartLayout>
        );
      case "background":
        return (
          <PartLayout name={part.name} exerciseCount={part.exerciseCount}>
            <li>{part.description}</li>
            <li>{part.backgroundMaterial}</li>
          </PartLayout>
        );
      case "special":
        return(
            <PartLayout name={part.name} exerciseCount={part.exerciseCount}>
                <li>{part.description}</li>
                <li>Requirements: {part.requirements.join(', ')}</li>
            </PartLayout>
        )
      default:
        return assertNever(part);
    }
  };
  
export default Part