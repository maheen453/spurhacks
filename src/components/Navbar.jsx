import {useState} from "react"
// import logo from "../assets/logo.png"
import { NAVIGATION_LINKS } from "../constants";
import { FaBars, FaTimes } from 'react-icons/fa';


const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState (false);

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

    return (
            <nav className="fixed flex flex-row items-center justify-center left-0 right-0 top-4 z-50">
                {/* Desktop Menu */}
                <div className="mx-auto hidden max-w-xl p-10 items-center justify-center full
                border borderstone-50/30 bg-black/20 py-3 backdrop-blur-lg lg:flex">
                    <div className=" flex items-center justify-between gap-6">
                        <div>
                            <ul className="flex items-center gap-4">
                                {NAVIGATION_LINKS.map((item, index) => (
                                    <li className="text-lg hover:text-yellow-400" key={index}>
                                        <a href={item.href}
                                        onClick={(e) => handleClick(e, item.href)}
                                        >
                                        {item.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
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