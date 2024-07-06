import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import Button from "@mui/material/Button";
import { types, formalities } from "../utils/const";
import { AIActionCallExist, deleteActionCall } from "../utils/utils";

export function History(
    {
        rows,
        setRows,
        aiResponse,
        setAIResponse
    }
) {

    return (
        <React.Fragment>
            <TableContainer sx={{ maxHeight: 500 }}>
            <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableCell>Title</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Formality</TableCell>
                    <TableCell>show more</TableCell>
                    <TableCell>Delete</TableCell>
                </TableHead>
                <TableBody>
                {rows.map((row, index) => (
                <TableRow key={index}>
                    <TableCell>
                        {row["name"]}
                    </TableCell>
                    <TableCell>
                        {types[row["article_type"]]}
                    </TableCell>
                    <TableCell>
                        {formalities[row["formality"]]}
                    </TableCell>
                    <TableCell>
                        <Button 
                            variant="contained"
                            onClick={async () => {
                                const res = await AIActionCallExist(row.id);
                                setAIResponse(res);
                            }}    
                        >
                            AI Analysis
                        </Button>
                    </TableCell>
                    <TableCell>
                        <Button
                            color="warning"
                            onClick={async (event) => {
                                const id = row["id"]
                                await deleteActionCall(id);
                                setRows(rows.filter(r => r["id"] !== id));
                            }}
                        >
                            DELETE
                        </Button>
                    </TableCell>
                </TableRow>      
                ))
                }
                </TableBody>
            </Table>
            </TableContainer>
        </React.Fragment>
    );
}