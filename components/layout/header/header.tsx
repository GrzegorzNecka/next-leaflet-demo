interface HeaderProps {
    children: React.ReactNode;
}

const Header = ({ children }: HeaderProps) => {
    return <header className=" max-w-7xl mx-auto w-full">{children}</header>;
};

export default Header;
