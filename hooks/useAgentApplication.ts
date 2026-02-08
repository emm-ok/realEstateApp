import {api} from "@/lib/api";
import { useEffect, useState } from "react";



export function useAgentApplication(){
    const [data, setData] = useState(null);
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get("/api/agent-applications/me")
        .then(res => {
            if(res.data){
                setData(res.data);
            } else{
                api.post("/api/agent-applications");
            }
        })
        .finally(() => setLoading(false));
    }, []);

    const saveDraft = async(partial: any) => {
        setData((prev: any) => ({ ...prev, ...partial }));
        await api.put("/api/agent-applications/me", partial);
    };

    return { data, step, setStep, saveDraft, loading };
}