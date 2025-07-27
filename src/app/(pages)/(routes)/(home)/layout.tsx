import MobileNavbar from "./_components/mobile-navbar";
import Navbar from "./_components/navbar";

interface Props {
    children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
    return (
        <div>
            <main className="flex flex-col min-h-screen max-h-screen">
                <div className="flex-1 flex flex-col px-4">
                    <Navbar />
                    <MobileNavbar />
                    {children}
                </div>
            </main>
        </div>
    );
}

export default Layout;