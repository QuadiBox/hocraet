'use client'
import { useEffect } from "react"

const NavButton = () => {
    useEffect(() => {
        const targetElement = document.querySelector('.dashboardGrandCntn');
    
        function handleScroll(e) {
            // Add your clicking logic here
            const navElement = document.querySelector('.thedashBoardNav');
            if (e.target.className === "hamburger" || e.target.className === "navOpen") {
                targetElement.classList.add('closeNav')
            } else if (e.target.className === "arrow" || e.target.className === "navClose" || e.target.className === "one" || e.target.className === "two" || e.target.className === "icofont-ghost" || e.target.className === "icofont-ui-settings") {
                targetElement.classList.remove('closeNav')
            }
        }
    
        targetElement?.addEventListener("click", handleScroll);
    
        return () => {
            targetElement?.removeEventListener("click", handleScroll);
        };
    }, []);
    return (
        <>
            <button className="hamburger"><img className='navOpen' src="/navOpen.png" alt="hamburger" /></button>
            <button className="arrow"><img className='navClose' src="/navClose.png" alt="hamburger" /></button>
        </>
    )
}

export default NavButton
