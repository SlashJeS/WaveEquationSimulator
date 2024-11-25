import React, { useState } from 'react';
import axios from 'axios';
import ParameterForm from './components/ParameterFrom';
import GraphDisplay from './components/GraphDisplay';
import ResultsDisplay from './components/ResultsDisplay';

const App: React.FC = () => {
    const [graphs, setGraphs] = useState<{ initial: string; wave: string; source: string } | null>(null);
    const [stability, setStability] = useState<boolean | null>(null);
    const [uniqueSolution, setUniqueSolution] = useState<boolean | null>(null);

    const handleSimulation = async (params: any) => {
        try {
            const response = await axios.post("http://localhost:8000/simulate/", params);
            setGraphs(response.data.graphs);
            setStability(response.data.stability_condition);
            setUniqueSolution(response.data.unique_solution);
        } catch (error: any) {
            alert(error.response?.data?.detail || "Something went wrong");
        }
    };

    return (
        <div>
            <div className="bg-blue-500 text-white py-4">
                <h1 className="text-center text-4xl font-bold">
                    Wave Equation Simulator
                </h1>
            </div>
            <ParameterForm onSubmit={handleSimulation} />
            {graphs && (
                <>
                    <GraphDisplay graph={graphs.initial} title="Initial Conditions" />
                    <GraphDisplay graph={graphs.wave} title="Wave Propagation" />
                    <GraphDisplay graph={graphs.source} title="Source Function G(s)" />
                </>
            )}
            {stability !== null && uniqueSolution !== null && (
                <ResultsDisplay stabilityCondition={stability} uniqueSolution={uniqueSolution} />
            )}
        </div>
    );
};

export default App;
