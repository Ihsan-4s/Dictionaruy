import imgIcon from "../assets/icon.png"
import { Link } from "react-router-dom";

export default function NavbarComp() {
    return (
        <nav className="bg-[#0240bb] text-blue-200">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex justify-between items-center h-16">
                    {/* Left Logo */}
                    <div className="flex items-center space-x-2">
                        <Link to="/">
                            <img src={imgIcon} alt="Logo" className="w-25 h-20" />
                        </Link>
                    </div>
                    {/* Right Logo */}
                    <div className="flex items-center space-x-2">
                        <span className="text-white font-semibold text-lg">
                            Dictionaruy.com
                        </span>
                    </div>
                </div>
            </div>
        </nav>
    );
}