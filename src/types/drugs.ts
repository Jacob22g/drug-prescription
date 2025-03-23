import { Dayjs } from 'dayjs';

export interface DrugSearchProps {
    onDrugSelect: (drug: Drug) => void;
}

export interface DrugsListProps {
    drugs: Drug[];
    onDrugRemove: (drug: Drug) => void;
    onDateUpdate: (drug: Drug, date: Dayjs | null) => void;
}

export interface Drug {
    name: string;
    form: string;
    codes: string[];
    date: Dayjs | null;
}
