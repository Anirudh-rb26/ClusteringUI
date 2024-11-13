'use client';

import { LoaderCircle } from 'lucide-react';
import dynamic from 'next/dynamic';
import { ComponentProps } from 'react';

const Plot = dynamic(() => import('react-plotly.js'), {
    ssr: false,
    loading: () => (
        <div className="w-[644px] h-[644px] flex justify-center items-center">
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
    console.log(selectedCluster);

    // Loop over each data point and add it to the appropriate trace
    for (let i = 0; i < data.length; i++) {
        const clusterLabel = labels[i];

        // Show all clusters if selectedCluster is null, NaN, or if this label matches selectedCluster
        if (selectedCluster === null || isNaN(selectedCluster) || clusterLabel === selectedCluster) {
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
        <div className="w-full h-full p-2">
            <Plot
                data={traces}
                layout={{
                    showlegend: false,
                    paper_bgcolor: '#F1F1F4',
                    plot_bgcolor: '#EBEDFB',
                    font: { color: 'black' },
                    dragmode: 'pan',
                    modebar: {
                        orientation: 'h',
                        bgcolor: 'rgba(0,0,0,0)',
                        color: '#000000',
                        activecolor: '#4169E1',
                    },
                    autosize: true,
                    margin: { l: 10, r: 10, t: 10, b: 10 }, // Add small margins
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
                    displayModeBar: false,
                    modeBarButtonsToRemove: ['toImage', 'zoom2d'],
                    modeBarButtonsToAdd: ['resetScale2d', 'zoomIn2d', 'zoomOut2d', 'pan2d', 'select2d', 'lasso2d'],
                    displaylogo: false,
                    scrollZoom: true,
                }}
                style={{
                    width: "100%",
                    height: "100%",
                    minHeight: "400px" // Add a minimum height to ensure visibility
                }}
                useResizeHandler={true} // Enable responsive resizing
            />
        </div>
    );
};

export default ClusteringPlot;