import React from 'react'

const Footer = () => {
    return (
        <footer >
            <div className="topFoot">
                <div className="linksList">
                    <h2>Links</h2>
                    <a href="#">Services</a>
                    <a href="#">Pricing</a>
                    <a href="#">Review</a>
                    <a href="#">Work with us</a>
                </div>
                <div className="linksList">
                    <h2>Legal</h2>
                    <a href="#">Terms of use</a>
                    <a href="#">Privacy policy</a>
                </div>
                <div className="linksList">
                    <h2>Follow</h2>
                    <div className="socials">
                        <a href="#"><i class="icofont-instagram"></i></a>
                        <a href="#"><img src="/small-fb.png" alt="facebook" /></a>
                        <a href="#"><img src="/small-tiktok.png" alt="tiktok" /></a>
                        <a href="#"><i class="icofont-linkedin"></i></a>
                        <a href="#"><img src="/small-x.png" alt="tiktok" /></a>
                    </div>
                </div>
            
            </div>
            <div className="bottomFooter">
                <p>&copy; Copyright 2024. All Right Reserved by Hocreat</p>
                <img src="/footer_logo.png" alt="hocreate logo" />
            </div>
      </footer>
    )
}

export default Footer
