interface PartLayoutProps {
  name: string;
  exerciseCount: number;
  children: React.ReactNode;
}

const PartLayout = ({ name, exerciseCount,children }: PartLayoutProps) => (
  <>
    <p style={{ fontWeight: "bold" }}>{name}</p>
    <p>Exercises: {exerciseCount}</p>
    <ul>{children}</ul>
  </>
);

export default PartLayout