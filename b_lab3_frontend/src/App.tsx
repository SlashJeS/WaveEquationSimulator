import React, { useState } from 'react';
import axios from 'axios';
import ParameterForm from './components/ParameterFrom';
import GraphDisplay from './components/GraphDisplay';
import ResultsDisplay from './components/ResultsDisplay';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

const App: React.FC = () => {
    const [graphs, setGraphs] = useState<{ initial: string; wave: string; source: string } | null>(null);
    const [stability, setStability] = useState<boolean | null>(null);
    const [uniqueSolution, setUniqueSolution] = useState<boolean | null>(null);
    const [accuracy, setAccuracy] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null); // Хранение текста ошибки
    const [isErrorDialogOpen, setIsErrorDialogOpen] = useState<boolean>(false); // Состояние для модалки

    const handleSimulation = async (params: any) => {
        try {
            const response = await axios.post("http://localhost:8000/simulate/", params);
            setGraphs(response.data.graphs);
            setStability(response.data.stability_condition);
            setUniqueSolution(response.data.unique_solution);
            setAccuracy(response.data.accuracy);
        } catch (error: any) {
            setError(error.response?.data?.detail || "Something went wrong");
            setIsErrorDialogOpen(true);
        }
    };

    const handleCloseErrorDialog = () => {
        setIsErrorDialogOpen(false); 
    };

    return (
        <div>
            {/* Header */}
            <div className="bg-blue-500 text-white py-4">
                <h1 className="text-center text-4xl font-bold">
                    Wave Equation Simulator
                </h1>
            </div>

            {/* Parameter Form */}
            <ParameterForm onSubmit={handleSimulation} />

            {/* Graphs */}
            {graphs && (
                <>
                    <GraphDisplay graph={graphs.initial} title="Initial Conditions" />
                    <GraphDisplay graph={graphs.wave} title="Wave Propagation" />
                    <GraphDisplay graph={graphs.source} title="Source Function G(s)" />
                </>
            )}

            {/* Results Display */}
            {stability !== null && uniqueSolution !== null && (
                <ResultsDisplay
                    stabilityCondition={stability}
                    uniqueSolution={uniqueSolution}
                    accuracy={accuracy}
                />
            )}

            {/* Error Dialog */}
            <Dialog open={isErrorDialogOpen} onClose={handleCloseErrorDialog}>
                <DialogTitle>
                    <Typography variant="h6" color="error">
                        Error
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Typography>
                        {error}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseErrorDialog} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default App;
