import { useState, useEffect } from "react";
import type { Diary, NewDiary } from "./types";
import { createDiary, getAllDiaries } from './services/diaryService';
import DiaryContainer from "./components/DiaryContainer";
import DiaryForm from "./components/DiaryForm";
import Notification from "./components/Notification"; // 👈 import the component
import axios from "axios";

type NotificationState = {
  message: string;
  type: 'success' | 'error';
} | null;

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [notification, setNotification] = useState<NotificationState>(null);

  useEffect(() => {
    getAllDiaries().then(data => {
      setDiaries(data);
    });
  }, []);

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const addDiary = async (newDiary: NewDiary) => {
    try {
      const addedDiary = await createDiary(newDiary);
      setDiaries(diaries.concat(addedDiary));
      showNotification('Diary entry added!', 'success');
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        showNotification(error.response.data, 'error');
      } else {
        showNotification('An unknown error occurred', 'error');
      }
    }
  };

  return (
    <div>
      <h1>Flight Diary App</h1>

      {notification && (
        <Notification message={notification.message} type={notification.type} />
      )}

      <DiaryForm addDiary={addDiary} />
      <DiaryContainer diaries={diaries} />
    </div>
  );
};

export default App;
