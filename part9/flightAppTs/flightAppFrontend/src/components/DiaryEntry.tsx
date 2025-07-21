import type { Diary } from "../types"

const DiaryEntry = ({diary} :{diary: Diary}) => {
    return(
        <>
            <h2>{diary.date}</h2>
            <ul>
                <li>Visibility: {diary.visibility}</li>
                <li>Weather: {diary.weather}</li>
                <li>Comment: {diary.comment}</li>
            </ul>
        </>
    )
}

export default DiaryEntry