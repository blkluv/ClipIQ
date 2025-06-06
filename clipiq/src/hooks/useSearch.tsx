import { useEffect, useState } from "react"
import { useQueryData } from "./useQueryData";
import { getUsers } from "@/app/actions/user";

export const useSearch = (key:string , type:string) => {
    //states to manage search functionality
    const [query, setQuery] =useState("");
    const [debounce , setDebounce] = useState("");
    const [users , setUsers] = useState<
    {
        id: string;
        subscription?: {
            plan: {
                type: "FREE" | "PRO";
            }; 
        } | null;
        firstName: string | null;
        lastName: string | null;
        email: string | null;
        image: string | null;
    }[] | undefined>(undefined);

    const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value); 
    }

    //debouncing logic- debounced is set only when the user stops typing for 1s
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebounce(query);
        }, 1000);
        //cleanup function - restarts the timer if the user types again before 1s
        return () => clearTimeout(timer);
    }, [query]);

    //invoking function - getting users
    const {isFetching , refetch}=useQueryData(
        [key, debounce],
        async ({queryKey}) =>{
            if(type==="users") {
                const user= await getUsers(queryKey[1] as string); //server action
            if (user.status === 200) setUsers(user.data);
        }},
        false //disabled by default, will be enabled when debounce is set
    );


    useEffect(() => {
        if (debounce) {
            refetch(); 
        } else {
            setUsers(undefined);
        }
    }, [debounce, refetch]);

    return {
        query,
        setQuery,
        debounce,
        users,
        isFetching,
        onSearchChange,
    };

}