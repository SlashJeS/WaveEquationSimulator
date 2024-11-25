import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Paper, Box, Divider } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import TimelineIcon from '@mui/icons-material/Timeline';

const ParameterForm: React.FC<{ onSubmit: (params: any) => void }> = ({ onSubmit }) => {
    const [c, setC] = useState<string>("1.0");
    const [xMin, setXMin] = useState<string>("0.0");
    const [xMax, setXMax] = useState<string>("10.0");
    const [tMax, setTMax] = useState<string>("5.0");
    const [nx, setNx] = useState<string>("100");
    const [nt, setNt] = useState<string>("200");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            c: parseFloat(c),
            x_min: parseFloat(xMin),
            x_max: parseFloat(xMax),
            t_max: parseFloat(tMax),
            nx: parseFloat(nx),
            nt: parseFloat(nt),
        });
    };

    const handleInputChange = (
        setValue: React.Dispatch<React.SetStateAction<string>>
    ) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        // Allow empty input or valid float values (including `.` for incomplete inputs)
        if (!isNaN(Number(value)) || value === "." || value === "") {
            setValue(value);
        }
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
                                value={c}
                                onChange={handleInputChange(setC)}
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Minimum Space (x_min)"
                                helperText="Start of the spatial domain"
                                value={xMin}
                                onChange={handleInputChange(setXMin)}
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Maximum Space (x_max)"
                                helperText="End of the spatial domain"
                                value={xMax}
                                onChange={handleInputChange(setXMax)}
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Maximum Time (t_max)"
                                helperText="Duration of simulation"
                                value={tMax}
                                onChange={handleInputChange(setTMax)}
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
                                value={nx}
                                onChange={handleInputChange(setNx)}
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Grid Points in Time (nt)"
                                helperText="Number of grid divisions in time"
                                value={nt}
                                onChange={handleInputChange(setNt)}
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
