'use client';

import { useState, useMemo, useEffect } from 'react';
import CustomClusterDropdown from "@/components/custom/clusterDropdown";
import ClusteringPlot from "@/components/custom/clusterPlot";
import clusterdata from "@/lib/clusterdata.json";
import Image from 'next/image';

export default function Home() {
  const uniqueClusters = useMemo(() => {
    const uniqueLabels = Array.from(new Set(clusterdata.labels));
    return uniqueLabels.sort((a, b) => a - b);
  }, []);

  const [selectedCluster, setSelectedCluster] = useState<number | null>(null);
  const [showImages, setShowImages] = useState(false);

  useEffect(() => {
    if (selectedCluster !== null) {
      setShowImages(true);
    } else {
      setShowImages(false);
    }
  }, [selectedCluster]);

  const selectedClusterImages = useMemo(() => {
    if (selectedCluster === null) return [];
    return clusterdata.paths.filter((_, index) => clusterdata.labels[index] === selectedCluster);
  }, [selectedCluster, clusterdata.paths, clusterdata.labels]);

  return (
    <main className="min-h-screen bg-white p-4">
      <div className="mx-auto flex gap-12">
        {/* Cluster Map Graph - Plotly */}
        <div className="rounded-lg bg-white p-4 border border-white min-w-[644px] transition-all duration-500 ease-in-out">
          {/* CustomDropdown to select Clusters*/}
          <CustomClusterDropdown uniqueClusters={uniqueClusters} onSelectCluster={setSelectedCluster} />
          {/* Plotly Graph */}
          <div className="w-full mt-4 rounded-lg bg-white">
            <ClusteringPlot data={clusterdata.tsne} labels={clusterdata.labels} selectedCluster={selectedCluster} />
          </div>
        </div>

        {/* Selected Cluster Images */}
        <div
          className={`rounded-lg bg-black text-white p-4 border border-white min-w-[644px] transition-all duration-500 ease-in-out ${showImages ? 'translate-x-0' : 'translate-x-full'
            }`}
        >
          <div className="mb-4 text-lg font-bold">Images in Cluster {selectedCluster}</div>
          <div className="grid grid-cols-3 gap-4">
            {selectedClusterImages.map((imagePath, index) => (
              <div key={index} className="relative w-full h-48">
                <Image
                  src={`/api/image?path=${imagePath}`}
                  alt={`Image ${index}`}
                  fill
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}