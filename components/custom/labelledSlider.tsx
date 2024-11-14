import React from 'react';
import { Slider } from '@/components/ui/slider';

interface LabeledSliderProps {
    value: number;
    onChange: (value: number[]) => void;
}

const LabeledSlider: React.FC<LabeledSliderProps> = ({ value, onChange }) => {
    const steps = [2, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50];

    return (
        <div className="relative pt-1 pb-2 mt-2 mb-2">
            <div className="group relative">
                <Slider
                    value={[value]}
                    onValueChange={onChange}
                    min={2}
                    max={50}
                    step={1}
                    className="mb-4"
                />
                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-500 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                    {value} Clusters
                </div>
            </div>
            <div className="absolute w-full flex justify-between -bottom-1 px-2">
                {steps.map((step) => (
                    <div
                        key={step}
                        className="flex flex-col items-center"
                        style={{ width: '20px' }}
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