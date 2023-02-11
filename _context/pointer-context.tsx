import type { LatLng, LatLngLiteral, LatLngTuple } from 'leaflet';
import { createContext, useCallback, useContext, useState } from 'react';

type PointerState = {
    position: LatLngLiteral;
    addPosition: (position: LatLngLiteral) => void;
};

export const PointerContext = createContext<PointerState | null>(null);

// -- PROVIDER

export const PointerStateContextProvider = ({ children }: { children: React.ReactNode }) => {
    //-
    const [nextPosition, setPosition] = useState<LatLngLiteral | null>(null);

    const handleAddPosition = (position: LatLngLiteral) => {
        setPosition(position);
    };

    const initialPointerState: PointerState = {
        position: nextPosition || { lat: 0, lng: 0 },
        addPosition: handleAddPosition,
    };

    return (
        <PointerContext.Provider value={initialPointerState}>{children}</PointerContext.Provider>
    );
};

// -- CLIENT

export const usePointerState = () => {
    const PointerState = useContext(PointerContext);

    if (!PointerState) {
        throw new Error('you forgot PointerContext.Provider');
    }

    return { ...PointerState };
};
