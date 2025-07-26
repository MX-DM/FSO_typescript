import { useState, SyntheticEvent } from "react";
import {
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Button,
  SelectChangeEvent,
  Stack,
  Paper,
} from '@mui/material';

import { PatientFormValues, Gender } from "../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: PatientFormValues) => void;
}

interface GenderOption {
  value: Gender;
  label: string;
}

const genderOptions: GenderOption[] = Object.values(Gender).map(v => ({
  value: v, label: v.toString()
}));

const AddPatientForm = ({ onCancel, onSubmit }: Props) => {
  const [name, setName] = useState('');
  const [occupation, setOccupation] = useState('');
  const [ssn, setSsn] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState(Gender.Other);

  const onGenderChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if (typeof event.target.value === "string") {
      const value = event.target.value;
      const gender = Object.values(Gender).find(g => g.toString() === value);
      if (gender) {
        setGender(gender);
      }
    }
  };

  const addPatient = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      name,
      occupation,
      ssn,
      dateOfBirth,
      gender
    });
  };

  return (
    <Paper elevation={4} sx={{ p: 4, borderRadius: 0 }}>
      <form onSubmit={addPatient}>
        <Stack spacing={3}>
          <TextField
            label="Name"
            fullWidth
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
          <TextField
            label="Social Security Number"
            fullWidth
            value={ssn}
            onChange={({ target }) => setSsn(target.value)}
          />
          <TextField
            label="Date of Birth"
            placeholder="YYYY-MM-DD"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={dateOfBirth}
            onChange={({ target }) => setDateOfBirth(target.value)}
          />
          <TextField
            label="Occupation"
            fullWidth
            value={occupation}
            onChange={({ target }) => setOccupation(target.value)}
          />

          <div>
            <InputLabel id="gender-label">Gender</InputLabel>
            <Select
              labelId="gender-label"
              fullWidth
              value={gender}
              onChange={onGenderChange}
            >
              {genderOptions.map(option => (
                <MenuItem key={option.label} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </div>

          <Grid container spacing={2} justifyContent="flex-end">
            <Grid item>
              <Button
                color="secondary"
                variant="outlined"
                onClick={onCancel}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button
                type="submit"
                variant="contained"
                color="primary"
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </Stack>
      </form>
    </Paper>
  );
};

export default AddPatientForm;
