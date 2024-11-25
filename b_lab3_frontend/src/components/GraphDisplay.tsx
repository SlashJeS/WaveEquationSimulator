import React from 'react';
import { Box, Typography, Card, CardContent, CardMedia } from '@mui/material';

interface GraphDisplayProps {
    graph: string | null;
    title: string;
    description?: string;
}

const GraphDisplay: React.FC<GraphDisplayProps> = ({ graph, title, description }) => {
    return (
        <Card sx={{ mt: 4, p: 2, textAlign: 'center' }}>
            <CardContent>
                <Typography variant="h6">{title}</Typography>
                {description && <Typography variant="body2" color="text.secondary">{description}</Typography>}
            </CardContent>
            {graph ? (
                <CardMedia
                    component="img"
                    image={`data:image/png;base64,${graph}`}
                    alt={title}
                    sx={{ maxHeight: '400px', objectFit: 'contain' }}
                />
            ) : (
                <Typography variant="body1" color="text.secondary">
                    No graph to display
                </Typography>
            )}
        </Card>
    );
};

export default GraphDisplay;
