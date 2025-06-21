import { useRef, useState } from "react";
// import logo from "../assets/logo.png"
import { NAVIGATION_LINKS } from "../constants";
import { FaBars, FaTimes } from 'react-icons/fa';


const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState (false);
    const [hoverStyle, setHoverStyle] = useState({ left: 0, width: 0, opacity: 0 });
    const containerRef = useRef(null);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    }

    const handleLinkClick = (e, href) => {
        e.preventDefault();
        const targetElement = document.querySelector
        (href);
        if (targetElement) {
            const offset = -85;
            const elementPosition = targetElement.getBoundingCLientRect().top;
            const offsetPosition = elementPosition + window.scrollY + offset;
            
            window.scrollTo({
                top: offsetPosition,
                behaviour: "smooth",
            })
        }
        setIsMobileMenuOpen(false);
    }

    const handleMouseEnter = (e) => {
        const rect = e.target.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        setHoverStyle({
        left: rect.left - containerRect.left,
        width: rect.width,
        opacity: 1,
        });
    };

    const handleMouseLeave = () => {
    setHoverStyle((prev) => ({ ...prev, opacity: 0 }));
    };

    return (
        <nav className="fixed top-4 left-0 right-0 z-50 flex justify-center">
        {/* Desktop Menu */}
        <div  
            ref={containerRef}
            className="relative mx-auto hidden max-w-xl items-center justify-center border border-white/30
             bg-black/20 px-10 py-3 backdrop-blur-lg lg:flex">
            {/* Top Line */}
            <div
            className="absolute top-0 h-1 bg-yellow-400 rounded-full transition-all duration-300"
            style={{
                left: `${hoverStyle.left}px`,
                width: `${hoverStyle.width}px`,
                opacity: hoverStyle.opacity,
            }}
            ></div>

            {/* Bottom Line */}
            <div
            className="absolute bottom-0 h-1 bg-yellow-400 rounded-full transition-all duration-300"
            style={{
                left: `${hoverStyle.left}px`,
                width: `${hoverStyle.width}px`,
                opacity: hoverStyle.opacity,
            }}
            ></div>

            <ul className="flex items-center gap-4">
            {NAVIGATION_LINKS.map((item, index) => (
                <li className="text-lg" key={index}>
                <a
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item.href)}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className="px-3 py-2 text-white hover:text-yellow-400 transition-colors duration-200"
                >
                    {item.label}
                </a>
                </li>
            ))}
            </ul>
        </div>
                {/* Mobile Menu */}
                <div className="rounded-lg backdrop-blur-md lg:hidden">
                    <div className="flex items-center justify-between">
                        <div>
                            <a href="#">
                                {/* <img src={logo} alt ="logo" width={90} className="m-2" /> */}
                            </a>
                        </div>
                        <div className="flex items-center">
                            <button className="focus:outline-none lg:hidden" onClick={toggleMobileMenu}>
                                {isMobileMenuOpen ? (
                                    <FaTimes className="m-2 h-6 w-5" />
                                ) : (
                                    <FaBars className="m-2 h-6 w-5" />
                                )}
                            </button>
                        </div>
                    </div>
                    {isMobileMenuOpen && (
                        <ul className="ml-4 mt-4 flex flex-col gap-4 backdrop-blur-md">
                            {NAVIGATION_LINKS.map((item, index) => (
                                <li key={index}>
                                    <a href={item.href}
                                    className="block w-full text-lg" onClick={(e) => handleLinkClick(e,item.href)}>
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </nav>
    )
}

export default Navbar