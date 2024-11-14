'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import LabeledSlider from '@/components/custom/labelledSlider';
import CustomClusterDropdown from '@/components/custom/clusterDropdown';
import ClusteringPlot from '@/components/custom/clusterPlot';
import Loader from '@/components/custom/loader';

const API_URL = 'http://localhost:5000/api';

interface ClusteringResponse {
  tsne: number[][];
  labels: number[];
  paths: string[];
  average_density?: number;
}

const ImageClustering = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [clusterResults, setClusterResults] = useState<ClusteringResponse | null>(null);
  const [selectedCluster, setSelectedCluster] = useState<number | null>(null);
  const [numClusters, setNumClusters] = useState<number>(5);
  const [isInitialized, setIsInitialized] = useState(false);

  // Check API status on mount
  useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await axios.get(`${API_URL}/status`);
        if (response.data.status === 'ready') {
          setIsInitialized(true);
          handleClustering();
        }
      } catch (err) {
        setError('Failed to connect to the server');
        setIsLoading(false);
      }
    };
    checkStatus();
  }, []);

  const handleClustering = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await axios.post<ClusteringResponse>(
        `${API_URL}/cluster`,
        {
          n_clusters: numClusters
        }
      );

      setClusterResults(response.data);
    } catch (err) {
      console.error('Clustering error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  // Run clustering when numClusters changes
  useEffect(() => {
    if (isInitialized) {
      handleClustering();
    }
  }, [numClusters, isInitialized]);

  // Get unique clusters for the dropdown
  const uniqueClusters = clusterResults
    ? Array.from(new Set(clusterResults.labels)).sort((a, b) => a - b)
    : [];

  return (
    <div className="w-full space-y-4 p-4">
      {isLoading && <Loader />}

      {error && (
        <div className="text-red-500 text-center p-4">{error}</div>
      )}

      {!isLoading && clusterResults && (
        <>
          <div className="w-full max-w-md mx-auto">
            <LabeledSlider
              value={numClusters}
              onChange={(value) => setNumClusters(value[0])}
            />
          </div>

          <CustomClusterDropdown
            uniqueClusters={uniqueClusters}
            onSelectCluster={(clusterId) => setSelectedCluster(clusterId)}
          />

          <ClusteringPlot
            data={clusterResults.tsne}
            labels={clusterResults.labels}
            selectedCluster={selectedCluster}
          />

          {clusterResults.average_density && (
            <div className="text-center text-sm text-gray-600">
              Clustering Density: {clusterResults.average_density.toFixed(3)}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ImageClustering;
