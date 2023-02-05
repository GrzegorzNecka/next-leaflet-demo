import { memo } from "react";

const Footer = () => {
    return <div className=" max-w-7xl mx-auto w-full">Footer</div>;
};

const MemoizedFooter = memo(Footer);
export default MemoizedFooter;
