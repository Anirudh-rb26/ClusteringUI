"use client"

import React, { useState } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';

type CustomClusterDropdownProps = {
    uniqueClusters: number[];
    onSelectCluster: (clusterId: number) => void;
};

const CustomClusterDropdown: React.FC<CustomClusterDropdownProps> = ({ uniqueClusters, onSelectCluster }) => {
    const [selectedItem, setSelectedItem] = useState("All Clusters");

    const handleClusterSelection = (item: string) => {
        setSelectedItem(item);
        if (item === 'All Clusters') {
            onSelectCluster(-1);
        } else {
            const clusterId = parseInt(item.replace('Cluster ', ''));
            onSelectCluster(clusterId);
        }
    }

    return (
        <div className="w-full flex justify-center">
            <DropdownMenu>
                <DropdownMenuTrigger className="w-full p-5 bg-[#F1F1F4] text-black rounded-lg mt-2 text-start flex">
                    {selectedItem}
                    <span className="ml-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-black" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4 4a.75.75 0 01-1.06 0l-4-4a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                        </svg>
                    </span>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full p-2 bg-[#F1F1F4] text-black rounded-lg min-w-[var(--radix-dropdown-menu-trigger-width)]">
                    <DropdownMenuItem
                        className='bg-[#F1F1F4] text-black mt-1 hover:bg-gray-900'
                        onClick={() => handleClusterSelection('All Clusters')}
                    >
                        All Clusters
                    </DropdownMenuItem>
                    {uniqueClusters.sort((a, b) => a - b).map((clusterId) => (
                        <DropdownMenuItem
                            key={clusterId}
                            className='bg-[#F1F1F4] text-black mt-1 hover:bg-gray-900'
                            onClick={() => handleClusterSelection(`Cluster ${clusterId}`)}
                        >
                            Cluster {clusterId}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default CustomClusterDropdown;
