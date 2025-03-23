import axios from "axios";
import {Drug} from "../types/drugs.ts";
import {parseDrugData} from "../utils/dataUtils.ts";

const API_URL = "https://clinicaltables.nlm.nih.gov/api/rxterms/v3/search";

export const searchDrugs = async (query: string): Promise<Drug[]> => {
    try {
        const response = await axios.get(API_URL, {
            params: {
                terms: query,
                ef: "RXCUIS",
            },
        });
        return parseDrugData(response.data);
    } catch (error) {
        console.error("Error fetching drug data:", error);
        throw error;
    }
};

