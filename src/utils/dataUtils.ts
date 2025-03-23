import { Drug } from "../types/drugs.ts";

export const parseDrugData = (data: any): Drug[] => {
    if (!Array.isArray(data) || data.length < 3) {
        console.error("Invalid data structure", data);
        return [];
    }

    const names = data[1]; // Names are in data[1]
    const codes = data[2]?.RXCUIS; // Codes are in data[2].RXCUIS

    if (codes && (names.length !== codes.length)) {
        console.error("Mismatch between names and codes", data);
        return [];
    }

    return names.map((fullName: string, index: number) => {
        const { name, form } = splitDrugNameAndForm(fullName)
        return {
            name,
            form,
            date: null,
            codes: codes[index] || [],
        }
    });
};

const splitDrugNameAndForm = (fullName: string): { name: string; form: string } => {
    const match = fullName.match(/(.*?)(\s*\(.*\))/);
    if (match) {
        return { name: match[1].trim(), form: match[2].trim() };
    }
    return { name: fullName, form: "" };
};

