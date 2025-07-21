import { useState } from 'react';
import type { NewDiary } from '../types';

interface FormProps {
  addDiary: (newDiary: NewDiary) => void;
}

const DiaryForm = ({ addDiary }: FormProps) => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');

  const createDiary = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addDiary({ date, visibility, weather, comment });
    setDate('');
    setVisibility('');
    setWeather('');
    setComment('');
  };

  return (
    <form onSubmit={createDiary}>
      <div>
        <label htmlFor="date-input">Date:</label>
        <input
          type="date"
          id="date-input"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div>
        Visibility:
        {['great', 'good', 'ok', 'poor'].map((v) => (
          <label key={v}>
            <input
              type="radio"
              name="visibility"
              value={v}
              checked={visibility === v}
              onChange={(e) => setVisibility(e.target.value)}
            />
            {v}
          </label>
        ))}
      </div>

      <div>
        Weather:
        {['sunny', 'rainy', 'cloudy', 'stormy', 'windy'].map((w) => (
          <label key={w}>
            <input
              type="radio"
              name="weather"
              value={w}
              checked={weather === w}
              onChange={(e) => setWeather(e.target.value)}
            />
            {w}
          </label>
        ))}
      </div>

      <div>
        <label>
          Comment:
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </label>
      </div>

      <button type="submit">add</button>
    </form>
  );
};

export default DiaryForm;
