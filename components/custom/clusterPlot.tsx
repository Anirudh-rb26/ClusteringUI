'use client';

import { LoaderCircle } from 'lucide-react';
import dynamic from 'next/dynamic';
import { ComponentProps } from 'react';

const Plot = dynamic(() => import('react-plotly.js'), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full flex justify-center items-center">
            <LoaderCircle className="animate-spin text-blue-500 w-12 h-12" />
        </div>
    )
});

interface ClusteringPlotProps {
    data: number[][]; // Array of 2D points (e.g., [[x1, y1], [x2, y2]])
    labels: number[]; // Cluster labels for each point (e.g., [0, 1, 0, 2, 1, 0])
    selectedCluster: number | null; // Selected cluster number or null to show all
}

const ClusteringPlot: React.FC<ClusteringPlotProps> = ({ data, labels, selectedCluster }) => {
    // Declare the traces array to hold the filtered data for plotting
    const traces: Array<Partial<ComponentProps<typeof Plot>['data'][0]>> = [];

    // Loop over each data point and add it to the appropriate trace
    for (let i = 0; i < data.length; i++) {
        const clusterLabel = labels[i];

        // If selectedCluster is null, or this label matches selectedCluster, add the point to the trace
        if (selectedCluster === null || clusterLabel === selectedCluster) {
            let trace = traces.find((t) => t.name === `Cluster ${clusterLabel}`);
            if (!trace) {
                trace = {
                    x: [],
                    y: [],
                    mode: 'markers',
                    type: 'scatter',
                    name: `Cluster ${clusterLabel}`, // Name of the cluster for the legend
                    marker: {
                        size: 8,
                        opacity: 1,
                    },
                };
                traces.push(trace);
            }
            trace.x?.push(data[i][0]);
            trace.y?.push(data[i][1]);
        }
    }

    // Return the Plotly component with the traces
    return (
        <div className="w-full h-full rounded-lg overflow-hidden">
            <Plot
                data={traces} // Plot the filtered traces
                layout={{
                    showlegend: false, // Disable legend
                    paper_bgcolor: '#EBEDFB', // Background color
                    plot_bgcolor: '#EBEDFB', // Plot background color
                    font: { color: 'black' },
                    dragmode: 'pan', // Allow panning
                    modebar: {
                        orientation: 'h',
                        bgcolor: 'rgba(0,0,0,0)',
                        color: '#000000',
                        activecolor: '#4169E1',
                    },
                    autosize: true,
                    xaxis: {
                        title: '',
                        showticklabels: false,
                        zeroline: true,
                        showline: false,
                    },
                    yaxis: {
                        title: '',
                        showticklabels: false,
                        zeroline: true,
                        showline: false,
                    },
                }}
                config={{
                    responsive: true,
                    displayModeBar: 'hover',
                    modeBarButtonsToRemove: ['toImage', 'zoom2d'],
                    modeBarButtonsToAdd: ['resetScale2d', 'zoomIn2d', 'zoomOut2d', 'pan2d', 'select2d', 'lasso2d'],
                    displaylogo: false,
                    scrollZoom: true,
                }}
                style={{ width: "100%", height: "100%" }}
            />
        </div>
    );
};

export default ClusteringPlot;