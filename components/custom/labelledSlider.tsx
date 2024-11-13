import React from 'react';
import { Slider } from '@/components/ui/slider';

const LabeledSlider = () => {
    const steps = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

    return (
        <div className="relative pt-1 pb-2 mt-2 mb-2">
            <div className="group relative">
                <Slider
                    defaultValue={[0]}
                    max={100}
                    step={10}
                    className="mb-4"
                />
                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-500 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                    No. of Clusters
                </div>
            </div>
            <div className="absolute w-full flex justify-between -bottom-1 px-2">
                {steps.map((step) => (
                    <div
                        key={step}
                        className="flex flex-col items-center"
                        style={{ width: '20px', marginLeft: step === 0 ? '-10px' : 0, marginRight: step === 100 ? '-10px' : 0 }}
                    >
                        <div className="h-3 w-px bg-gray-300" />
                        <span className="text-xs text-gray-500 mt-1">{step}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LabeledSlider;