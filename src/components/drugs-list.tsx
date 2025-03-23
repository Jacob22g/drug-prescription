import React from "react";
import { List, ListItem, ListItemText } from "@mui/material";
import { DrugsListProps } from "../types/drugs.ts";
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const DrugsList: React.FC<DrugsListProps> = ({ drugs, onDrugRemove, onDateUpdate }) => {
    if (drugs.length === 0) {
        return <p>No drugs in list.</p>;
    }

    return (
        <List>
            {drugs.map((drug, index) => (
                <ListItem
                    className={'list-item'}
                    key={index}
                    button
                    secondaryAction={
                        <IconButton edge="end" onClick={() => onDrugRemove(drug)}>
                            <CancelIcon className={'remove-icon'}/>
                        </IconButton>
                    }
                >
                    <ListItemText primary={drug.name} secondary={drug.form} />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker
                                label="Drug date"
                                value={drug.date}
                                onChange={(newDate) => onDateUpdate(drug, newDate)}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                </ListItem>
            ))}
        </List>
    );
};

export default DrugsList;
