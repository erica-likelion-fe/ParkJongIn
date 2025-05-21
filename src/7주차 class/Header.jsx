import { use, useEffec, useState } from "react";

export const Header = (props) => {
    const [num, setNumber] = useState(0);
    useEffect(() => {
        console.log("rendering되었습나다")
        return () => {
            console.log("unmounting되었습나다")
        }
    }, [])
    useEffect(() => {
        console.log("num이 바뀌었습니다")
    }
    , [num])