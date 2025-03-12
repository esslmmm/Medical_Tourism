import React, { useState } from "react";

interface TabsProps {
    children: React.ReactNode;
}

interface TabsTriggerProps {
    value: string;
    selected: boolean;
    onClick: () => void;
}

export function Tabs({ children }: TabsProps) {
    return <div className="flex flex-col">{children}</div>;
}

export function TabsList({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex bg-white shadow-md p-1 rounded-full border border-gray-300">
            {children}
        </div>
    );
}

export function TabsTrigger({ value, selected, onClick }: TabsTriggerProps) {
    return (
        <button
            className={`px-6 py-2 text-sm font-medium rounded-full transition ${selected
                    ? "bg-gray-100 text-black font-semibold"
                    : "text-gray-400 hover:text-black"
                }`}
            onClick={onClick}
        >
            {value}
        </button>
    );
}
