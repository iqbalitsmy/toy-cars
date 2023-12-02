import { useEffect } from "react"


const useTitle = title => {
    useEffect(() => {
        document.title = `${title} - Toy Cars`;
    }, [title])
};

export default useTitle;