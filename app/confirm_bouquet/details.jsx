'use client'

import Link from "next/link";
import { useState, useEffect } from "react"
import { useUser } from "@clerk/nextjs";
import { onSnapshotWithCondition } from "../db/firestoreService";

const Details = () => {
    const [cartItems, setCartItems] = useState([]);
    const [showCount, setshowCount] = useState(3);

    const { isLoaded, isSignedIn, user } = useUser();

    const filteredList = cartItems.filter((elem, idx) => idx <= showCount);

    // Using reduce to calculate the total amount
    const totalAmount = cartItems?.reduce((sum, item) => {
        return sum + parseInt(item.amount, 10); // Convert amount to integer and add to sum
    }, 0);

    useEffect(() => {
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
    }, [isLoaded, isSignedIn]);

    return (
        <div className="confirmCntn">
            <h1>Order Details</h1>

            {/* here's where the paln selectors are */}
            <div className="theDetailsCntn">
                <div className="planTypeCntn">
                    <div className={`unitPlanType`}>
                        <div className="right">
                            <p>Selected plan</p>
                            <h3>{filteredList[0]?.plan} Plan</h3>
                            <p>Best for small business</p>

                            <h2>Total: $<b>{totalAmount}</b></h2>
                        </div>
                        <img src="/shipping.png" alt="/" />
                    </div>
                    <div className={`unitPlanType`}>
                        <div className="right">
                            <p>Selected platforms</p>

                            <div className="platformList">
                                {
                                    filteredList?.map((elem, idx) => (<img key={`selectables_${idx}`} src={`/${elem.platform}.png`} alt={`${elem.platform}`} />))
                                }
                                {
                                    cartItems.length > showCount && (
                                        <span>+{cartItems.length - showCount} more</span>
                                    )
                                }
                            </div>
                        </div>
                        <img src="/yelp.png" alt="/" />
                    </div>
                    <div className={`unitPlanType`}>
                        <div className="right">
                            <p>Delivery period</p>
                            <h3>No extra time</h3>
                            <p>Our service is swift and fast</p>

                            <h2><b>2 Weeks</b> at most</h2>
                        </div>
                        <img src="/timer.png" alt="/" />
                    </div>
                </div>
                {
                    cartItems.map((elem, idx) => (
                        <div key={`selection_${idx}`} className="selectionDetail DIY">
                            <div className="unitdetail special">
                                <h3>Engagements</h3>
                                <h4>{elem?.platform}</h4>
                                <p>Likes</p>
                                <p>Reposts</p>
                                <p>Comments</p>
                                <p>Views</p>
                                <p>Saves</p>
                                <p>Follows</p>
                                <p>Subscribers</p>
                            </div>
                            <div className={`unitdetail`}>
                                <h3>{elem?.plan}</h3>
                                <p>{elem?.planData?.likes}</p>
                                <p>{elem?.planData?.reposts}</p>
                                <p>{elem?.planData?.comments}</p>
                                <p>{elem?.planData?.views}</p>
                                <p>{elem?.planData?.saves}</p>
                                <p>{elem?.planData?.follows}</p>
                                <p>{elem?.planData?.subscribers}</p>
                            </div>
                            <div className={`unitdetail conc`}>
                                <h3>Amount</h3>
                                
                                <b>${elem?.amount}</b>
                            </div>
                        </div>

                    ))
                }

            </div>
            <Link href={"/checkout"}>Continue</Link>

        </div>
    )
}

export default Details
