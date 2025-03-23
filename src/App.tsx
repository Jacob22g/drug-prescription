import './App.css'
import DrugSearch from "./components/drug-search.tsx";
import {useState} from "react";
import {Drug} from "./types/drugs.ts";
import DrugsList from "./components/drugs-list.tsx";
import { Dayjs } from 'dayjs';

function App() {
    const [drugs, setDrugs] = useState<Drug[]>([]);

    const handleDrugSelect = (drug: Drug)  => {
        const newList = [...drugs];
        newList.push(drug);
        setDrugs(newList);
    }

    const handleDrugRemove = (drug: Drug) => {
        const newList = drugs.filter(d => d.name !== drug.name)
        setDrugs(newList);
    }


    const handleDateUpdate = (drug: Drug, date: Dayjs | null) => {
        const newList = drugs.map(d => {
            if(d.name === drug.name) {
                d.date = date;
            }
            return d
        });
        setDrugs(newList);
    }

    return (
        <>
            <h1>Drug Prescription App</h1>
            <DrugSearch onDrugSelect={handleDrugSelect}/>
            <DrugsList drugs={drugs} onDrugRemove={handleDrugRemove} onDateUpdate={handleDateUpdate}/>
        </>
    )
}

export default App;
