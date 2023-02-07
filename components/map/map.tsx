import dynamic from 'next/dynamic';
import type { MapProps } from './dynamic-map';

//becouse external dependency  relies on browser APIs like window.
const DynamicMap = dynamic(() => import('./dynamic-map'), {
    ssr: false,
});

// Set default sizing to control aspect ratio which will scale responsively
// but also help avoid layout shift
const DEFAULT_WIDTH = 600;
const DEFAULT_HEIGHT = 600;

const Map = (props: MapProps) => {
    const { width = DEFAULT_WIDTH, height = DEFAULT_HEIGHT } = props;
    return (
        <>
            <div style={{ aspectRatio: width / height }}>
                <DynamicMap {...props} />
            </div>
        </>
    );
};

export default Map;