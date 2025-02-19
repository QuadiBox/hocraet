'use client'
import Link from "next/link";
import { SignOutButton } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { onSnapshotWithCondition, deleteDocument, onSnapshotWithoutCondition, updateDocument } from "./db/firestoreService";
import { useUser } from "@clerk/nextjs";

const Navbar = () => {
    const [showDropdown, setshowDropdown] = useState(false);
    const [showCart, setShowCart] = useState(false);
    const [orderCount, setorderCount] = useState(0);
    const [openMenu, setopenMenu] = useState(false);

    const [showMenuExtra, setshowMenuExtra] = useState(false);

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
        if (isLoaded && isSignedIn) {
            const fetchCartItems = onSnapshotWithCondition(
                'carts', 
                'u_id', 
                `${user?.id}`, 
                (documents) => {
                    setCartItems(documents)
                }
            );
        
            // Cleanup the listener on component unmount
            return () => fetchCartItems();
        }
    }, [isLoaded, isSignedIn, user?.id]);


    useEffect(() => {
        if (isLoaded && isSignedIn) {
            const fetchOrders = onSnapshotWithoutCondition('orders', (documents) => {
                if (documents?.[0] !== orderCount) {
                    setorderCount(documents[0]);
                }
            });

            return () => fetchOrders();
        }
    }, [isLoaded, isSignedIn]);
      

    
    return (
        <>
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
                        <img src={user?.imageUrl} alt="profile image" />
                        <h4>{user?.fullName}</h4>
                        <i style={{transform:`${showDropdown ? "rotate(180deg)" : "rotate(0deg)"}`}} className="icofont-caret-down"></i>

                        {
                            cartItems?.length > 0 && (
                                <span className="cartIndicator" aria-hidden></span>
                            )
                        }

                        {
                            showDropdown && (
                                <ul className="navdropdown">
                                    <li><a href="/dashboard">Dashboard</a></li>
                                    <li><button type="button" onClick={openCart}>Cart <span>{cartItems?.length}</span></button></li>
                                    <li><SignOutButton></SignOutButton></li>
                                </ul>
                            )
                        }
                    </button>


                </SignedIn>

                {
                    openMenu ? (
                        <button className="openMenu"><img src="/navClose.png" alt="hamburger" onClick={() => {setopenMenu(false)}}/></button>
                    ) : (
                        <button className="openMenu"><img src="/navOpen.png" alt="hamburger" onClick={() => {setopenMenu(true)}}/></button>
                    )
                }
                
                

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
                                        cartItems?.map((elem, idx) => (
                                            <div key={`cartItem_${idx}`} className="unitCartItem">
                                                <h3><span>{elem?.platform}</span> <span>{elem?.plan}</span></h3>
                                                <div className="itemdetails">
                                                    <p>Likes: <span>{elem?.planData?.likes}</span></p>
                                                    <p>Reposts: <span>{elem?.planData?.reposts}</span></p>
                                                    <p>Comments: <span>{elem?.planData?.comments}</span></p>
                                                    <p>Shares: <span>{elem?.planData?.shares}</span></p>
                                                    <p>Follows: <span>{elem?.planData?.follows}</span></p>
                                                </div>
                                                <div className="amountShii">
                                                    <h3>Amount: NGN<span>{elem?.amount}</span></h3>
                                                    
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
            <div className="mobileMenu" style={{transform: `${openMenu ? "translateX(0%)": 'translateX(100%)'}`}}>
                <Link onClick={() => {setopenMenu(false)}} href={"/"}>Home</Link>
                <Link onClick={() => {setopenMenu(false)}} href={"/#services"}>Services</Link>
                <Link onClick={() => {setopenMenu(false)}} href={"/pick_a_plan"}>Pricing</Link>
                <Link onClick={() => {setopenMenu(false)}} href={"/#review"}>Review</Link>
                <SignedIn>
                    <div className="profileAnShii">
                        <div onClick={() => {setshowMenuExtra(prev => !prev)}} id="pfpMobileBtn" type="button" className="special">
                            <img src={user?.imageUrl} alt="profile image" />
                            <h4>{user?.fullName}</h4>
                            <i style={{transform:`${showMenuExtra ? "rotate(180deg)" : "rotate(0deg)"}`}} className="icofont-caret-down"></i>
                        </div>

                        {
                            showMenuExtra && (
                                <div className="extra">
                                    <Link href={"/dashboard"}><img src={"/dashboard.png"} alt="profile image" /> Dashboard</Link>
                                    <button onClick={openCart} type="button"><i className="icofont-cart"></i> Cart ({cartItems?.length})</button>
                                </div>
                            )
                        }
                    </div>
                </SignedIn>
            </div>

        </>
    )
}

export default Navbar
