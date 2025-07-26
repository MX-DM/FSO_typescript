import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Routes, useLocation } from "react-router-dom";
import { Button, Container, Typography, Box, Paper } from '@mui/material';
import { Patient } from "./types";

import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";
import PatientPage from "./components/PatientPage/PatientPage";

const AppContent = ({
  patients,
  setPatients
}: {
  patients: Patient[];
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
}) => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <Container maxWidth="md">
      {isHome ? (
        <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
          <Header />
          <Routes>
            <Route path="/" element={<PatientListPage patients={patients} setPatients={setPatients} />} />
          </Routes>
        </Paper>
      ) : (
        <>
          <Header />
          <Routes>
            <Route path="/patients/:id" element={<PatientPage />} />
          </Routes>
        </>
      )}
    </Container>
  );
};

const Header = () => (
  <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
  <Typography variant="h4" color="primary">
    Patientor
  </Typography>
  <Box sx={{ flexGrow: 1 }} /> {/* Pushes the button to the right */}
  <Button component={Link} to="/" variant="contained" color="primary">
    Home
  </Button>
</Box>
);

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };
    void fetchPatientList();
  }, []);

  return (
    <Box sx={{ backgroundColor: '#f0f4f8', minHeight: '100vh', py: 4 }}>
      <Router>
        <AppContent patients={patients} setPatients={setPatients} />
      </Router>
    </Box>
  );
};

export default App;
