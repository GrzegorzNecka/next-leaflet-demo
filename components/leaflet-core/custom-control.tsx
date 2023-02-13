import { POSITION_CONTROLS } from '@/utils/position-controls';
import type L from 'leaflet';
import React, { createRef, useEffect, useMemo, useState } from 'react';

interface Props {
    position: L.ControlPosition;
    children?: React.ReactNode;
    container?: React.HTMLAttributes<HTMLDivElement>;
    prepend?: boolean;
}

const CustomControl = ({ position, children, container, prepend }: Props): JSX.Element => {
    const positionClass = (position && POSITION_CONTROLS[position]) || POSITION_CONTROLS.topright;

    const initialDiv = document.createElement('div') as HTMLDivElement;

    const [existContainer, setExistContainer] = useState<HTMLDivElement>(initialDiv);

    const controlContainerRef = createRef<HTMLDivElement>();

    useEffect(() => {
        let ignore = false;

        if (!ignore) {
            const targetDiv = document.getElementsByClassName(positionClass)[0] as HTMLDivElement;

            setExistContainer(targetDiv);
        }

        return () => {
            ignore = true;
        };
    }, [positionClass]);

    useEffect(() => {
        if (!controlContainerRef.current) {
            return;
        }

        let ignore = false;

        if (!ignore) {
            const ref = controlContainerRef.current;

            if (typeof prepend !== 'undefined' && prepend === true) {
                existContainer.prepend(ref);
            } else {
                existContainer.append(ref);
            }
        }

        return () => {
            ignore = true;
        };
    }, [existContainer, prepend, controlContainerRef]);

    const className = container?.className?.concat(' ') || '';

    return (
        <div {...container} ref={controlContainerRef} className={`${className} leaflet-control `}>
            {children}
        </div>
    );
};

export default CustomControl;
