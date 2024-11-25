import React from 'react';
import { Typography, Box } from '@mui/material';

interface ResultsProps {
    accuracy: number | null;
    stabilityCondition: boolean;
    uniqueSolution: boolean;
}

const ResultsDisplay: React.FC<ResultsProps> = ({ accuracy, stabilityCondition, uniqueSolution }) => {
    return (
        <Box 
            sx={{
                padding: 2,
                margin: 2,
                border: '1px solid #ccc',
                borderRadius: '8px',
                backgroundColor: '#f9f9f9',
            }}
        >
            <Typography 
                variant="h6" 
                component="div" 
                sx={{ fontWeight: 'bold', color: '#4caf50', marginBottom: 1 }}
            >
                Simulation Results
            </Typography>
            {accuracy !== null && (
                <Typography variant="body1" component="div">
                    <strong>Accuracy:</strong> {accuracy.toFixed(4)}
                </Typography>
            )}
            <Typography variant="body1" component="div">
                <strong>Stability Condition:</strong> {stabilityCondition ? 'Satisfied' : 'Violated'}
            </Typography>
            <Typography variant="body1" component="div">
                <strong>Unique Solution:</strong> {uniqueSolution ? 'Yes' : 'No'}
            </Typography>
        </Box>
    );
};

export default ResultsDisplay;
