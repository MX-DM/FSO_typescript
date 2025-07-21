import type { CoursePart } from "../App"
import Part from "./Part"

interface ContentProps {
    courseParts: CoursePart[]
}

const Content = ({courseParts}:ContentProps) => {
    return(
        <>
            {courseParts.map((p, i) => (<Part key={i}part={p}/>))}
        </>
    )
}

export default Content