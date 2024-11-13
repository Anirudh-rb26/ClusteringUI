'use client';

import { useState, useMemo, useEffect } from 'react';
import CustomClusterDropdown from "@/components/custom/clusterDropdown";
import ClusteringPlot from "@/components/custom/clusterPlot";
import clusterdata from "@/lib/clusterdata.json";
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import LabeledSlider from '@/components/custom/labelledSlider';

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
    <main className="min-h-screen bg-white p-2 overflow-hidden">
      <div className="mx-auto flex flex-col gap-6 lg:gap-5 relative lg:flex-row lg:items-start lg:justify-center">
        {/* Cluster Map Graph - Plotly */}
        <div className="rounded-lg p-2 w-full lg:w-[644px] h-[400px] md:h-[500px] lg:h-[644px] relative">
          <div className="font-semibold tracking-wide text-center lg:text-left">
            Embedding and Clustering Engine
          </div>
          <div className="h-full flex flex-col bg-white">
            {/* CustomDropdown to select Clusters*/}
            <CustomClusterDropdown uniqueClusters={uniqueClusters} onSelectCluster={setSelectedCluster} />
            {/* Plotly Graph */}
            <div className='pt-2'>
              <label className="text-sm font-semibold tracking-wide text-center lg:text-left">
                Interactive Image Cluster
              </label>
              <div className="bg-[#F1F1F4] rounded-lg">
                <ClusteringPlot data={clusterdata.tsne} labels={clusterdata.labels} selectedCluster={selectedCluster} />
              </div>
              <LabeledSlider />
            </div>
          </div>
        </div>

        {/* Selected Cluster Images */}
        <div
          className={`mr-2 rounded-lg bg-[#F1F1F4] text-black p-3 w-full lg:w-[644px] h-[400px] md:h-[450px] lg:h-[550px] 
          transition-all duration-500 ease-in-out ${showImages ? 'opacity-100 visible pointer-events-auto' : 'opacity-0 invisible pointer-events-none'}`}>
          {isNaN(selectedCluster as number) ? (
            <div className="h-full flex items-center justify-center text-lg">
              Select a Cluster to View Images
            </div>
          ) : (
            <>
              <div className='flex flex-row justify-between'>
                <div className="mb-4 text-lg">Images in Cluster {selectedCluster}</div>
                <div className="mb-4 tracking-wide">Density: {selectedCluster}</div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 p-2 overflow-auto max-h-[300px] sm:max-h-[350px] md:max-h-[400px] lg:max-h-[480px]">
                {selectedClusterImages.map((imagePath, index) => (
                  <div key={index} className="relative aspect-square w-full">
                    <Image
                      src={`/${imagePath}`}
                      alt={`Image ${index}`}
                      fill
                      className="object-contain"
                    />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      <Button className="bg-[#365AFF] hover:bg-[#2442cc] fixed bottom-3 right-5 md:right-10">
        Lock & Proceed
      </Button>
    </main>
  );
}
