export interface Diary {
    weather: string;
    visibility: string;
    date: string;
    comment: string;
    id: string;
}
  
export type NewDiary = Omit<Diary, 'id'>