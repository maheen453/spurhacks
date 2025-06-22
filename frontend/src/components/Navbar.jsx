import { useEffect, useRef, useState } from "react";
// import logo from "../assets/logo.png"
import { NAVIGATION_LINKS } from "../constants/index";
import { FaBars, FaTimes } from 'react-icons/fa';


const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [hoverStyle, setHoverStyle] = useState({ left: 0, width: 0, opacity: 0 });
    const [activeHash, setActiveHash] = useState(window.location.hash || "#");
    const containerRef = useRef(null);
    const linkRefs = useRef([]);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    }

    const handleLinkClick = (e, href, index) => {
        e.preventDefault();
        window.location.hash = href;
        setActiveHash(href);
        setIsMobileMenuOpen(false);

        const targetElement = document.querySelector(href);
        if (targetElement) {
        const offset = -20;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY + offset;
        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
        });
        }

        // Set line position to the clicked element
        const rect = linkRefs.current[index].getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        setHoverStyle({
        left: rect.left - containerRect.left,
        width: rect.width,
        opacity: 1,
        });
    };


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
        const index = NAVIGATION_LINKS.findIndex(link => link.href === activeHash);
        if (index !== -1 && linkRefs.current[index]) {
        const rect = linkRefs.current[index].getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        setHoverStyle({
            left: rect.left - containerRect.left,
            width: rect.width,
            opacity: 1,
        });
        }
    };

    useEffect(() => {
    const observer = new IntersectionObserver(
        (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
            const newHash = `#${entry.target.id}`;
            if (newHash !== activeHash) {
                setActiveHash(newHash);
                if (window.location.hash !== newHash) {
                window.history.replaceState(null, "", newHash);
                }
                const index = NAVIGATION_LINKS.findIndex(link => link.href === newHash);
                if (linkRefs.current[index]) {
                const rect = linkRefs.current[index].getBoundingClientRect();
                const containerRect = containerRef.current.getBoundingClientRect();
                setHoverStyle({
                    left: rect.left - containerRect.left,
                    width: rect.width,
                    opacity: 1,
                });
                }
            }
            }
        });
        },
        {
        root: null,
        rootMargin: '-50% 0px -50% 0px', // triggers when section is centered vertically
        threshold: 0
        }
    );

    NAVIGATION_LINKS.forEach(link => {
        const sec = document.getElementById(link.href.substring(1));
        if (sec) observer.observe(sec);
    });

    return () => observer.disconnect();
    }, [activeHash]);



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
                    ref={(el) => (linkRefs.current[index] = el)}
                    onClick={(e) => handleLinkClick(e, item.href, index)}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className={`px-3 py-2 text-white transition-colors duration-200 ${
                    activeHash === item.href ? "text-yellow-400" : "hover:text-yellow-400"
                    }`}
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