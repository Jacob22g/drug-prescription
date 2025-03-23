import React, { useState, useCallback } from "react";
import Button from '@mui/material/Button';
import {Drug, DrugSearchProps} from "../types/drugs.ts";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import {debounce} from 'lodash';
import { searchDrugs } from "../services/drug-search.service.ts";
import './drug-search.css'

const DrugSearch: React.FC<DrugSearchProps> = ({ onDrugSelect }) => {
    const [inputValue, setInputValue] = useState("");
    const [value, setValue] = useState<Drug | null>(null);
    const [options, setOptions] = useState<Drug[]>([]);
    const [loading, setLoading] = useState(false);

    // Handle the API call with debouncing
    const debouncedSearch = useCallback(
        debounce(async (query: string) => {
            if (query) {
                setLoading(true);
                const results = await searchDrugs(query);
                setOptions(results);
            } else {
                setOptions([]);
            }
            setLoading(false);
        }, 500),
        []
    );

    // Update input value and trigger debounced search
    const handleInputChange = (_event, newInputValue: string) => {
        setLoading(true);
        setInputValue(newInputValue);
        debouncedSearch(newInputValue);
    };

    const onAddDrug = () => {
        if (value)
            onDrugSelect(value);
        setValue(null);
        setInputValue("");
        setOptions([]);
    }

    return (
        <div className={'search-container'}>
            <Autocomplete
                className={'search-input'}
                id="drug-search-autocomplete"
                value={value}
                onChange={(_event, newValue: Drug | null) => {
                    setValue(newValue);
                }}
                inputValue={inputValue}
                onInputChange={handleInputChange}
                options={options}
                loading={loading}
                getOptionLabel={(option: Drug) => option.name}
                renderInput={(params) => <TextField {...params} label="Search Drug" />}
            />
            <Button className={'search-button'} disabled={!value} variant="contained" onClick={onAddDrug}>Add Drug</Button>
        </div>
    );
};

export default DrugSearch;
