'use client'
import Link from "next/link";
import { SignOutButton } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { onSnapshotWithCondition, deleteDocument } from "./db/firestoreService";
import { useUser } from "@clerk/nextjs";

const Navbar = () => {
    const [showDropdown, setshowDropdown] = useState(false);
    const [showCart, setShowCart] = useState(false);

    const [cartItems, setCartItems] = useState([]);

    const { isLoaded, isSignedIn, user} = useUser();

    const openCart = () => {
        if (cartItems?.length > 0) {
            setShowCart(true);
        }
    }
    const closeCart = () => {
        setShowCart(false);
    }

    useEffect(() => {
        const fetchCartItems = onSnapshotWithCondition(
          'carts', 
          'mail', 
          `${user?.emailAddresses[user?.emailAddresses.length - 1].emailAddress}`, 
          (documents) => {
            setCartItems(documents)
          }
        );
      
        // Cleanup the listener on component unmount
        return () => fetchCartItems();
    }, [isLoaded, isSignedIn]);
      

    // useEffect(() => {
    //     const targetElement = document.querySelector('.navCntn');
    
    //     function handleScroll(e) {
    //         // Add your scrolling logic here
    //         const allElements = container?.children;
    //         if (e.target.className === "prevScrollBtn" || e.target.className === "icofont-rounded-left") {
    //             if (currentOne > 1) {
    //                 setCurrentOne(prev => prev - 1);
    //                 scrollToCenterElement(allElements[currentOne - 2]);  
    //             }
    //         } else if (e.target.className === "nextScrollBtn" || e.target.className === "icofont-rounded-right") {
    //             if (currentOne < totalReviews) {
    //                 setCurrentOne(prev => prev + 1);
    //                 scrollToCenterElement(allElements[currentOne - 2]);  
    //             }
    //         }
    //     }
    
    //     targetElement?.addEventListener("click", handleScroll);
    
    //     return () => {
    //         targetElement?.removeEventListener("click", handleScroll);
    //     };
    // }, []);
    return (
        <nav className="navCntn">
            <Link className="logo" href={"/"}><img src="/nav_logo.png" alt="Hocreate Logo" /></Link>
            <div className="centerNav">
              <Link href={"/"}>Home</Link>
              <Link href={"/#services"}>Services</Link>
              <Link href={"/#pricing"}>Pricing</Link>
              <Link href={"/#reviews"}>Reviews</Link>
            </div>

            <SignedOut>
                <Link className="ctaBtn_r" href={"/pick_a_plan"}>Get started</Link>
            </SignedOut>
            <SignedIn>
                <button onClick={() => {setshowDropdown(prev => !prev)}} type="button" className="profileBtn">
                    <img src="/login.png" alt="profile image" />
                    <h4>{user?.fullName}</h4>
                    <i className="icofont-caret-down"></i>

                    {
                        cartItems?.length > 0 && (
                            <span className="cartIndicator" aria-hidden></span>
                        )
                    }

                    {
                        showDropdown && (
                            <ul className="navdropdown">
                                <li><a href="#">Dashboard</a></li>
                                <li><button type="button" onClick={openCart}>Cart <span>{cartItems?.length}</span></button></li>
                                <li><SignOutButton></SignOutButton></li>
                            </ul>
                        )
                    }
                </button>
            </SignedIn>
            

            {
                showCart && cartItems.length > 0 && (
                    <div className="theCartCntn">
                        <div className="theCart">
                            <div className="cartHead">
                                <h2>Cart</h2>
                                <button type="button" onClick={closeCart}>Close <i className="icofont-close-line"></i></button>
                            </div>
                            <div className="cartBody">
                                {
                                    cartItems?.map((elem) => (
                                        <div className="unitCartItem">
                                            <h3><span>{elem?.platform}</span> <span>{elem?.plan}</span></h3>
                                            <div className="itemdetails">
                                                <p>Likes: <span>{elem?.planData?.likes}</span></p>
                                                <p>Reposts: <span>{elem?.planData?.reposts}</span></p>
                                                <p>Comments: <span>{elem?.planData?.comments}</span></p>
                                                <p>Views: <span>{elem?.planData?.views}</span></p>
                                                <p>Saves: <span>{elem?.planData?.saves}</span></p>
                                                <p>Follows: <span>{elem?.planData?.follows}</span></p>
                                                <p>Subscribers: <span>{elem?.planData?.subscribers}</span></p>
                                            </div>
                                            <div className="amountShii">
                                                <h3>Amount: $<span>{elem?.amount}</span></h3>
                                                
                                                <button onClick={() => {deleteDocument("carts", elem?.id)}}>Remove from cart</button>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>

                )
            }
        </nav>
    )
}

export default Navbar
