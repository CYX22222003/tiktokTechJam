import React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import { MenuItem } from "@mui/material";

export function EditorTypeSelect({
    type,
    setType,
    typeList,
}) {
    return (
        <React.Fragment>
            <FormControl sx={{ m: 1, minWidth: 500 }}>
                <InputLabel id="demo-simple-select-autowidth-label1">
                    Select Type
                </InputLabel>
                <Select
                    labelId="demo-simple-select-autowidth-label1"
                    id="demo-simple-select-autowidth1"
                    onChange={(e) => {
                        setType(e.target.value);
                        console.log("Type: " + type);
                    }}
                    autoWidth
                    label="Select Type"
                >
                    {typeList.map((data, index) => (
                        <MenuItem value={index}>
                            {data}
                        </MenuItem>
                    )
                    )}
                </Select>
            </FormControl>
        </React.Fragment>
    );
}

export function EditorFormalitySelect({
    formality, 
    setFormality,
    formalityList
}) {
    return (
        <React.Fragment>
            <FormControl sx={{ m: 1, minWidth: 500 }}>
                <InputLabel id="demo-simple-select-autowidth-label2">
                    Select Formality
                </InputLabel>
                <Select
                    labelId="demo-simple-select-autowidth-label2"
                    id="demo-simple-select-autowidth2"
                    onChange={(e) => {
                        setFormality(e.target.value);
                        console.log("Formality: " + formality);
                    }}
                    autoWidth
                    label="Select Formality"
                >
                {
                    formalityList.map((data, index) => (
                    <MenuItem value={index}>
                        {data}
                    </MenuItem>
                    ))
                }
                </Select>
            </FormControl>
        </React.Fragment>
    );
}