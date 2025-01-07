'use client'

import Link from "next/link";
import { useState, useEffect } from "react"
import { useUser } from "@clerk/nextjs";
import { onSnapshotWithCondition, addDocument, onSnapshotWithoutCondition, updateDocument } from "../db/firestoreService";

const Pickplan = ({cartAdder}) => {
    const [pickFormat, setPickFormat] = useState("diy");
    const [selectMeia, setSelectedMedia] = useState("Instagram");
    const [selectPlan, setSelectPlan] = useState("silver");
    const [orderCount, setorderCount] = useState(0);

    const [cartItems, setCartItems] = useState([]);

    const { isLoaded, isSignedIn, user} = useUser();

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

    useEffect(() => {
        const fetchCartItems = onSnapshotWithoutCondition(
          'orders', 
          (documents) => {
            setorderCount(documents[0])
          }
        );
      
        // Cleanup the listener on component unmount
        return () => fetchCartItems();
    }, [isLoaded, isSignedIn]);


    const [cartObject, setCartObject] = useState({
        plan: "silver",
        date: Date.now(),
        platform: "Instagram",
        planData: {
            likes: 40,
            reposts: 0,
            comments: 40,
            shares: 20,
            follows: 10,
        },
        links: {
            likes: "",
            reposts: "",
            comments: "",
            shares: "",
            follows: "",
        },
        mail: "101010@gmail.com",
        amount: 3300,
        order_id: 0,
        userData: {
            fullname: user?.fullName,
            email: user?.emailAddresses[0]?.emailAddress,
            id: user?.id,
            phone: user?.phoneNumbers[0] || '',
            image: user?.imageUrl
        }
    })


    const [diySelections, setDIYSelection] = useState({
        likes: 0,
        reposts: 0,
        comments: 0,
        shares: 0,
        follows: 0,
    },)


    const pricingDetails = {
        Instagram: {
            silver: {
                likes: 40,
                reposts: 0,
                comments: 40,
                shares: 20,
                follows: 10,
            },
            gold: {
                likes: 50,
                reposts: 0,
                comments: 50,
                shares: 30,
                follows: 20,
            },
            platinum: {
                likes: 60,
                reposts: 0,
                comments: 60,
                shares: 40,
                follows: 30,
            },
        },
        Twitter: {
            silver: {
                likes: 40,
                reposts: 20,
                comments: 40,
                shares: 0,
                follows: 10,
            },
            gold: {
                likes: 50,
                reposts: 30,
                comments: 50,
                shares: 0,
                follows: 20,
            },
            platinum: {
                likes: 60,
                reposts: 40,
                comments: 60,
                shares: 0,
                follows: 30,
            },
        },
        Linkedin: {
            silver: {
                likes: 40,
                reposts: 0,
                comments: 40,
                shares: 20,
                follows: 10,
            },
            gold: {
                likes: 50,
                reposts: 0,
                comments: 50,
                shares: 30,
                follows: 20,
            },
            platinum: {
                likes: 60,
                reposts: 0,
                comments: 60,
                shares: 40,
                follows: 30,
            },
        },
    }

    const handleSocialSetter = (vlad) => {
        setSelectedMedia(vlad)
        if (cartObject.plan === "diy") {
            setCartObject(prev => ({...prev, date: Date.now(), platform: vlad, planData: {
                likes: 0,
                reposts: 0,
                comments: 0,
                shares: 0,
                follows: 0,
            }}))
        } else {
            setCartObject(prev => ({...prev, platform: vlad, date: Date.now(), planData: {...pricingDetails[vlad][prev.plan]}}));
        }
    }

    const handleAddToCart = async (e) => {
        e.preventDefault();
        const userData = {
            fullname: user?.fullName,
            email: user?.emailAddresses[user?.emailAddresses.length - 1].emailAddress,
            id: user?.id,
            phone: user?.phoneNumbers[0] || '',
            image: user?.imageUrl
        }

        if (cartObject.plan === "diy") {
            const unitCost = {
                likes: 0.5,
                comments: 0.5,
                follows: 1,
                shares: 0.8,
                reposts: 0.8
            };
            const totalAmount = (cartObject.planData.likes * unitCost?.likes * 50) + 
                                (cartObject.planData.reposts * unitCost?.reposts * 50) + 
                                (cartObject.planData.follows * unitCost?.follows * 50) + 
                                (cartObject.planData.shares * unitCost?.shares * 50) + 
                                (cartObject.planData.reposts * unitCost?.reposts * 50);
            const todb = {...cartObject, userData, date: Date.now(), amount: totalAmount, u_id: `${user?.id}`, mail: user?.emailAddresses[user?.emailAddresses.length - 1].emailAddress, order_id: orderCount?.count + 1};

            addDocument("carts", todb);
            updateDocument("orders", orderCount?.id, {count: orderCount?.count + 1})
        } else {
            const todb = {...cartObject, userData, date: Date.now(), u_id: `${user?.id}`, mail: user?.emailAddresses[user?.emailAddresses.length - 1].emailAddress, order_id: orderCount?.count + 1};
            addDocument("carts", todb);
            updateDocument("orders", orderCount?.id, {count: orderCount?.count + 1})
        }

        setCartObject(prev => ({...prev, plan: "silver", date: Date.now(), platform: "Instagram", planData: {
            likes: 40,
            reposts: 0,
            comments: 40,
            shares: 20,
            follows: 10,
        }}))
    }


    return (
        <section id="pricing" className="pricingSect">
            <h2>Select the plan that&apos;s best <br /> for your project</h2>
            <div className="pickerCntn">
                <button onClick={() => {setCartObject(prev => ({...prev, plan: "silver", amount: 3300, planData: pricingDetails[prev.platform].silver}))}} type="button" className={`pickBtn ${cartObject.plan !== "diy" && "active"}`}>Personalized</button>
                <button onClick={() => {setCartObject(prev => ({...prev, plan: "diy", amount: 0, planData: {likes: 0, reposts: 0, comments: 0, shares: 0, follows: 0}}))}} type="button" className={`pickBtn ${cartObject.plan === "diy" && "active"}`}>Do it your way</button>
            </div>
            

            {/* here's where the paln selectors are */}
            <div className="planTypeCntn">
                <div onClick={() => {setCartObject(prev => ({...prev, plan: "silver", amount: 3300, planData: pricingDetails[prev.platform].silver}))}} className={`unitPlanType pickPlan ${cartObject.plan === "silver" && "active"}`}>
                    <div className="right">
                        <h3>Silver Plan</h3>
                        <p>Best for personal use</p>

                        <h2>NGN<b>3,300</b>/Platform</h2>
                    </div>
                    <img src="/shipping.png" alt="/" />
                </div>
                <div onClick={() => {setCartObject(prev => ({...prev, plan: "gold", amount: 4700, planData: pricingDetails[prev.platform].gold}))}} className={`unitPlanType pickPlan ${cartObject.plan === "gold" && "active"}`}>
                    <div className="right">
                        <h3>Gold Plan</h3>
                        <p>Best for small business</p>

                        <h2>NGN<b>4,700</b>/Platform</h2>
                    </div>
                    <img src="/shipping.png" alt="/" />
                </div>
                <div onClick={() => {setCartObject(prev => ({...prev, plan: "platinum", amount: 6100, planData: pricingDetails[prev.platform].platinum}))}} className={`unitPlanType pickPlan ${cartObject.plan === "platinum" && "active"}`}>
                    <div className="right">
                        <h3>Platinum Plan</h3>
                        <p>Best for medium scale startups</p>

                        <h2>NGN<b>6,100</b>/Platform</h2>
                    </div>
                    <img src="/shipping.png" alt="/" />
                </div>
            </div>

            {/* here goes the platform selectors */}
            <div className="platformSeelctorCntn">
                <h4>Select a social media you want engagements on and click on add to cart</h4>

                <div className="platformSelectors">
                    <button type="button" onClick={() => {handleSocialSetter("Instagram")}} className={`unitPlatform ${cartObject.platform === "Instagram" && "active"}`}><img src="/Instagram.png" alt="instagram" /></button>
                    <button type="button" onClick={() => {handleSocialSetter("Linkedin")}} className={`unitPlatform ${cartObject.platform === "Linkedin" && "active"}`}><img src="/Linkedin.png" alt="linkedin" /></button>
                    <button type="button" onClick={() => {handleSocialSetter("Twitter")}} className={`unitPlatform ${cartObject.platform === "Twitter" && "active"}`}><img src="/Twitter.png" alt="twitter" /></button>
                </div>
            </div>

            {
                cartObject.plan !== "diy" && (
                    <div className="selectionDetail">
                        <div className="unitdetail special">
                            <h3>Engagements</h3>
                            <h4>{cartObject.platform}</h4>
                            <p>Likes</p>
                            <p>Reposts</p>
                            <p>Comments</p>
                            <p>Shares</p>
                            <p>Follows</p>
                        </div>
                        <div className={`unitdetail ${cartObject.plan === "silver" && "active"}`}>
                            <h3>Silver</h3>
                            <p>{pricingDetails[cartObject.platform].silver.likes ? pricingDetails[cartObject.platform].silver.likes : <img src="/null.png" alt="empty" />}</p>
                            <p>{pricingDetails[cartObject.platform].silver.reposts ? pricingDetails[cartObject.platform].silver.reposts : <img src="/null.png" alt="empty" />}</p>
                            <p>{pricingDetails[cartObject.platform].silver.comments ? pricingDetails[cartObject.platform].silver.comments : <img src="/null.png" alt="empty" />}</p>
                            <p>{pricingDetails[cartObject.platform].silver.shares ? pricingDetails[cartObject.platform].silver.shares : <img src="/null.png" alt="empty" />}</p>
                            <p>{pricingDetails[cartObject.platform].silver.follows ? pricingDetails[cartObject.platform].silver.follows : <img src="/null.png" alt="empty" />}</p>
                        </div>
                        <div className={`unitdetail ${cartObject.plan === "gold" && "active"}`}>
                            <h3>Gold</h3>
                            <p>{pricingDetails[cartObject.platform].gold.likes ? pricingDetails[cartObject.platform].gold.likes : <img src="/null.png" alt="empty" />}</p>
                            <p>{pricingDetails[cartObject.platform].gold.reposts ? pricingDetails[cartObject.platform].gold.reposts : <img src="/null.png" alt="empty" />}</p>
                            <p>{pricingDetails[cartObject.platform].gold.comments ? pricingDetails[cartObject.platform].gold.comments : <img src="/null.png" alt="empty" />}</p>
                            <p>{pricingDetails[cartObject.platform].gold.shares ? pricingDetails[cartObject.platform].gold.shares : <img src="/null.png" alt="empty" />}</p>
                            <p>{pricingDetails[cartObject.platform].gold.follows ? pricingDetails[cartObject.platform].gold.follows : <img src="/null.png" alt="empty" />}</p>
                        </div>
                        <div className={`unitdetail ${cartObject.plan === "platinum" && "active"}`}>
                            <h3>Platinum</h3>
                            <p>{pricingDetails[cartObject.platform].platinum.likes ? pricingDetails[cartObject.platform].platinum.likes : <img src="/null.png" alt="empty" />}</p>
                            <p>{pricingDetails[cartObject.platform].platinum.reposts ? pricingDetails[cartObject.platform].platinum.reposts : <img src="/null.png" alt="empty" />}</p>
                            <p>{pricingDetails[cartObject.platform].platinum.comments ? pricingDetails[cartObject.platform].platinum.comments : <img src="/null.png" alt="empty" />}</p>
                            <p>{pricingDetails[cartObject.platform].platinum.shares ? pricingDetails[cartObject.platform].platinum.shares : <img src="/null.png" alt="empty" />}</p>
                            <p>{pricingDetails[cartObject.platform].platinum.follows ? pricingDetails[cartObject.platform].platinum.follows : <img src="/null.png" alt="empty" />}</p>
                        </div>
                    </div>

                )
            }

            {
                cartObject.plan === "diy" && (
                    <div  className="selectionDetail DIY">
                        <div className="unitdetail special">
                            <h3>Engagements</h3>
                            <h4>{cartObject.platform}</h4>
                            <p>Likes</p>
                            <p>Reposts</p>
                            <p>Comments</p>
                            <p>Shares</p>
                            <p>Follows</p>
                        </div>
                        <div className={`unitdetail `}>
                            <h3>DIY</h3>
                            <input type="text" placeholder="0" onChange={(e) => {setCartObject(prev => ({...prev, planData: {...prev.planData, likes: e.target.value === "" ? 0 : parseInt(e.target.value, 10) || 0,}}))}} value={cartObject.planData?.likes}/>
                            <input disabled={cartObject.platform === "Linkedin" || cartObject.platform === "Instagram" ? true : false} type="text" placeholder="0" onChange={(e) => {setCartObject(prev => ({...prev, planData: {...prev.planData, reposts: e.target.value === "" ? 0 : parseInt(e.target.value, 10) || 0}}))}} value={cartObject.planData?.reposts}/>
                            <input  type="text" placeholder="0" onChange={(e) => {setCartObject(prev => ({...prev, planData: {...prev.planData, comments: e.target.value === "" ? 0 : parseInt(e.target.value, 10) || 0}}))}} value={cartObject.planData?.comments}/>
                            <input disabled={cartObject.platform === "Twitter" ? true : false} type="text" placeholder="0" onChange={(e) => {setCartObject(prev => ({...prev, planData: {...prev.planData, shares: e.target.value === "" ? 0 : parseInt(e.target.value, 10) || 0}}))}} value={cartObject.planData?.shares}/>
                            <input  type="text" placeholder="0" onChange={(e) => {setCartObject(prev => ({...prev, planData: {...prev.planData, follows: e.target.value === "" ? 0 : parseInt(e.target.value, 10) || 0}}))}} value={cartObject.planData?.follows}/>
                        </div>
                    </div>
                )
            }


            {
                cartAdder && (
                    <form onSubmit={handleAddToCart} className="pricingPageSpec">
                        <p>Paste the links to the {cartObject.platform} handle you want enganged. Please make sure to double-check the links pasted are valid and correspond to the engagement required.</p>
                    
                        {
                            cartObject.planData.likes !== 0 && (
                                <input required type="text" onChange={(e) => {setCartObject(prev => ({...prev, links: {...prev.links, likes: e.target.value}}))}} value={cartObject?.links?.likes} placeholder="Link to post you want likes for e.g x.com/..."/>
                            )
                        }
                        {
                            cartObject.planData.reposts !== 0 && (
                                <input onChange={(e) => {setCartObject(prev => ({...prev, links: {...prev.links, reposts: e.target.value}}))}} value={cartObject?.links?.reposts} required type="text" placeholder="Link to post you want reposts for e.g x.com/..."/>
                            )
                        }
                        {
                            cartObject.planData.comments !== 0 && (
                                <input onChange={(e) => {setCartObject(prev => ({...prev, links: {...prev.links, comments: e.target.value}}))}} value={cartObject?.links?.comments} required type="text" placeholder="Link to post you want comments for e.g x.com/..."/>
                            )
                        }
                        {
                            cartObject.planData.shares !== 0 && (
                                <input onChange={(e) => {setCartObject(prev => ({...prev, links: {...prev.links, shares: e.target.value}}))}} value={cartObject?.links?.shares} required type="text" placeholder="Link to post you want shared e.g x.com/..."/>
                            )
                        }
                        {
                            cartObject.planData.follows !== 0  && (
                                <input onChange={(e) => {setCartObject(prev => ({...prev, links: {...prev.links, follows: e.target.value}}))}} value={cartObject?.links?.follows} required type="text" placeholder="Link to account you want follows for e.g x.com/..."/>
                            )
                        }

                        <button type="submit"><i className="icofont-cart"></i>Add to cart</button>
                    </form>
                )
            }
            
            {
                cartAdder ? (
                    <Link className={cartItems.length <= 0 ? "inactive" : ""} href={"/confirm_bouquet"}>Continue</Link>
                ) : (

                    <Link href={"/pick_a_plan"}>Get Started</Link>
                )
            }

        </section>
    )
}

export default Pickplan
