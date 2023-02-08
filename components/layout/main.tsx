interface MainProps {
    children: React.ReactNode;
}

export const Main = ({ children }: MainProps) => {
    return (
        <main className="  flex-grow max-w-7xl mx-auto w-full bg-white ">
            <div className="relative p-16">{children}</div>
        </main>
    );
};
