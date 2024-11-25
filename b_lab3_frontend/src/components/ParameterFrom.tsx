import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Paper, Box, Divider } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import TimelineIcon from '@mui/icons-material/Timeline';

const ParameterForm: React.FC<{ onSubmit: (params: any) => void }> = ({ onSubmit }) => {
    const [c, setC] = useState(1.0); // Wave speed
    const [xMin, setXMin] = useState(0);
    const [xMax, setXMax] = useState(10);
    const [tMax, setTMax] = useState(5);
    const [nx, setNx] = useState(100);
    const [nt, setNt] = useState(200);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ c, x_min: xMin, x_max: xMax, t_max: tMax, nx, nt });
    };

    return (
        <Paper elevation={4} sx={{ p: 4, mt: 4, borderRadius: 2, backgroundColor: '#f9f9f9' }}>
            <Box display="flex" alignItems="center" mb={2}>
                <SettingsIcon sx={{ color: '#3f51b5', mr: 1 }} />
                <Typography variant="h5" color="primary">
                    Simulation Parameters
                </Typography>
            </Box>
            <Divider sx={{ mb: 3 }} />
            <form onSubmit={handleSubmit}>
                <Box mb={4}>
                    <Typography variant="subtitle1" gutterBottom color="textSecondary">
                        General Parameters
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                label="Wave Speed (C)"
                                helperText="Speed of wave propagation"
                                type="number"
                                value={c}
                                onChange={(e) => setC(parseFloat(e.target.value))}
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Minimum Space (x_min)"
                                helperText="Start of the spatial domain"
                                type="number"
                                value={xMin}
                                onChange={(e) => setXMin(parseFloat(e.target.value))}
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Maximum Space (x_max)"
                                helperText="End of the spatial domain"
                                type="number"
                                value={xMax}
                                onChange={(e) => setXMax(parseFloat(e.target.value))}
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Maximum Time (t_max)"
                                helperText="Duration of simulation"
                                type="number"
                                value={tMax}
                                onChange={(e) => setTMax(parseFloat(e.target.value))}
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>
                    </Grid>
                </Box>

                <Box mb={4}>
                    <Typography variant="subtitle1" gutterBottom color="textSecondary">
                        Grid Resolution
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Grid Points in Space (nx)"
                                helperText="Number of grid divisions in space"
                                type="number"
                                value={nx}
                                onChange={(e) => setNx(parseInt(e.target.value))}
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Grid Points in Time (nt)"
                                helperText="Number of grid divisions in time"
                                type="number"
                                value={nt}
                                onChange={(e) => setNt(parseInt(e.target.value))}
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>
                    </Grid>
                </Box>

                <Box display="flex" justifyContent="center" alignItems="center" mb={3}>
                    <TimelineIcon sx={{ color: '#3f51b5', mr: 1 }} />
                    <Typography variant="subtitle1" color="textSecondary">
                        Adjust the parameters and start simulation
                    </Typography>
                </Box>

                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    fullWidth
                    sx={{
                        py: 1.5,
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        textTransform: 'none',
                    }}
                >
                    Start Simulation
                </Button>
            </form>
        </Paper>
    );
};

export default ParameterForm;
