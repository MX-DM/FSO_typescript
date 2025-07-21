import type { Diary } from "../types"
import DiaryEntry from "./DiaryEntry"

interface DiaryProps {
    diaries: Diary[]
}
const DiaryContainer = ({diaries}: DiaryProps) => {
    return(
        <>
            <h1>Diary Entries</h1>
            {diaries.map(
                d => (<DiaryEntry key={d.id} diary={d}/>)
            )}
        </>
    )
}

export default DiaryContainer