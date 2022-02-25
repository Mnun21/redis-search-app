//application needs state to return the results in real time
import { useState } from "react";

export default function SearchForm() {

    const [hits, setHits] = useState([]);//result from API
    
    //function grabs current value of the form
    const search = async (event) => {
    //formats as a url parameter to pass on to Redis
        const q = event.target.value;
    //stops unnecessary API calls
        if (q.length > 2) {
            const params = new URLSearchParams({ q })
    //debounce
            const res = await fetch('/api/search?' +  params);

            const result = await res.json();
            console.log(result)
            setHits(result['cars']); 

        }
    }

    return (<div>
        Search Car
        <input onChange={search} type="text" />

        <ul>
            {hits.map((hit) => (
                <li key={hit.entityId}>
                    {hit.make} {hit.model} {hit.description}
                </li>
            ))}
        </ul>
    </div>)
}