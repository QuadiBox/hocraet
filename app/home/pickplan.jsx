'use client'

import Link from "next/link";
import { useState, useEffect } from "react"
import { useUser } from "@clerk/nextjs";
import { onSnapshotWithCondition, addDocument, onSnapshotWithoutCondition, updateDocument } from "../db/firestoreService";

const Pickplan = ({cartAdder}) => {
    const [pickFormat, setPickFormat] = useState("diy");
    const [selectMeia, setSelectedMedia] = useState("Instagram");
    const [selectPlan, setSelectPlan] = useState("basic");
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
        plan: "basic",
        date: Date.now(),
        platform: "Instagram",
        planData: {
            likes: 200,
            reposts: 200,
            comments: 200,
            views: 500,
            saves: 0,
            follows: 200,
            subscribers: 0,
        },
        links: {
            likes: "",
            reposts: "",
            comments: "",
            views: "",
            saves: "",
            follows: "",
            subscribers: ""
        },
        mail: "101010@gmail.com",
        amount: 20,
        order_id: 0,
        userData: {
            fullname: user?.fullName,
            email: user?.emailAddresses[user?.emailAddresses.length - 1].emailAddress,
            id: user?.id,
            phone: user?.phoneNumbers[0] || '',
        }
    })

    const [diySelections, setDIYSelection] = useState({
        likes: 0,
        reposts: 0,
        comments: 0,
        views: 0,
        saves: 0,
        follows: 0,
        subscribers: 0
    })


    const pricingDetails = {
        Instagram: {
            basic: {
                likes: 200,
                reposts: 200,
                comments: 200,
                views: 500,
                saves: 0,
                follows: 200,
                subscribers: 0,
            },
            business: {
                likes: 300,
                reposts: 300,
                comments: 300,
                views: 500,
                saves: 0,
                follows: 350,
                subscribers: 0,
            },
            enterprise: {
                likes: 500,
                reposts: 500,
                comments: 500,
                views: 500,
                saves: 550,
                follows: 500,
                subscribers: 0,
            },
        },
        Youtube: {
            basic: {
                likes: 200,
                reposts: 0,
                comments: 200,
                views: 500,
                saves: 0,
                follows: 0,
                subscribers: 200,
            },
            business: {
                likes: 200,
                reposts: 0,
                comments: 200,
                views: 500,
                saves: 0,
                follows: 0,
                subscribers: 0,
            },
            enterprise: {
                likes: 500,
                reposts: 0,
                comments: 500,
                views: 500,
                saves: 0,
                follows: 0,
                subscribers: 500,
            },
        },
        Tiktok: {
            basic: {
                likes: 200,
                reposts: 200,
                comments: 200,
                views: 500,
                saves: 0,
                follows: 200,
                subscribers: 0,
            },
            business: {
                likes: 300,
                reposts: 300,
                comments: 200,
                views: 500,
                saves: 0,
                follows: 200,
                subscribers: 0,
            },
            enterprise: {
                likes: 500,
                reposts: 500,
                comments: 500,
                views: 500,
                saves: 0,
                follows: 500,
                subscribers: 0,
            },
        },
        Linkedin: {
            basic: {
                likes: 200,
                reposts: 200,
                comments: 200,
                views: 200,
                saves: 0,
                follows: 200,
                subscribers: 0,
            },
            business: {
                likes: 300,
                reposts: 300,
                comments: 300,
                views: 300,
                saves: 0,
                follows: 200,
                subscribers: 0,
            },
            enterprise: {
                likes: 500,
                reposts: 500,
                comments: 500,
                views: 500,
                saves: 0,
                follows: 500,
                subscribers: 0,
            },
        },
        Facebook: {
            basic: {
                likes: 200,
                reposts: 200,
                comments: 200,
                views: 200,
                saves: 0,
                follows: 200,
                subscribers: 0,
            },
            business: {
                likes: 300,
                reposts: 300,
                comments: 300,
                views: 300,
                saves: 0,
                follows: 200,
                subscribers: 0,
            },
            enterprise: {
                likes: 500,
                reposts: 500,
                comments: 500,
                views: 500,
                saves: 0,
                follows: 500,
                subscribers: 0,
            },
        },
        Snapchat: {
            basic: {
                likes: 200,
                reposts: 200,
                comments: 200,
                views: 200,
                saves: 0,
                follows: 0,
                subscribers: 200,
            },
            business: {
                likes: 300,
                reposts: 300,
                comments: 300,
                views: 300,
                saves: 0,
                follows: 0,
                subscribers: 300,
            },
            enterprise: {
                likes: 500,
                reposts: 500,
                comments: 500,
                views: 500,
                saves: 0,
                follows: 0,
                subscribers: 500,
            },
        },
        Pinterest: {
            basic: {
                likes: 200,
                reposts: 200,
                comments: 200,
                views: 200,
                saves: 0,
                follows: 200,
                subscribers: 0,
            },
            business: {
                likes: 300,
                reposts: 300,
                comments: 300,
                views: 300,
                saves: 0,
                follows: 300,
                subscribers: 0,
            },
            enterprise: {
                likes: 500,
                reposts: 500,
                comments: 500,
                views: 500,
                saves: 0,
                follows: 500,
                subscribers: 0,
            },
        },
        Spotify: {
            basic: {
                likes: 200,
                reposts: 0,
                comments: 0,
                views: 200,
                saves: 0,
                follows: 200,
                subscribers: 0,
            },
            business: {
                likes: 300,
                reposts: 0,
                comments: 0,
                views: 300,
                saves: 0,
                follows: 300,
                subscribers: 0,
            },
            enterprise: {
                likes: 500,
                reposts: 0,
                comments: 0,
                views: 500,
                saves: 0,
                follows: 500,
                subscribers: 0,
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
                views: 0,
                saves: 0,
                follows: 0,
                subscribers: 0
            }}))
        } else {
            setCartObject(prev => ({...prev, platform: vlad, date: Date.now(), planData: {...pricingDetails[vlad][prev.plan]}}));
        }
    }

    const handleAddToCart = (e) => {
        e.preventDefault();
        const userData = {
            fullname: user?.fullName,
            email: user?.emailAddresses[user?.emailAddresses.length - 1].emailAddress,
            id: user?.id,
            phone: user?.phoneNumbers[0] || '',
            image: user?.imageUrl
        }

        if (cartObject.plan === "diy") {
            const unitCost = 0.01;
            const totalAmount = (cartObject.planData.likes * unitCost) + (cartObject.planData.reposts * unitCost) + (cartObject.planData.comments * unitCost) + (cartObject.planData.views * unitCost) + (cartObject.planData.saves * unitCost) + (cartObject.planData.follows * unitCost) + (cartObject.planData.subscribers * unitCost);
            const todb = {...cartObject, userData, date: Date.now(), amount: totalAmount, u_id: `${user?.id}`, mail: user?.emailAddresses[user?.emailAddresses.length - 1].emailAddress, order_id: orderCount?.count + 1};

            addDocument("carts", todb);
            updateDocument("orders", orderCount?.id, {count: orderCount?.count + 1})
        } else {
            const todb = {...cartObject, userData, date: Date.now(), u_id: `${user?.id}`, mail: user?.emailAddresses[user?.emailAddresses.length - 1].emailAddress, order_id: orderCount?.count + 1};
            addDocument("carts", todb);
            updateDocument("orders", orderCount?.id, {count: orderCount?.count + 1})
        }

        setCartObject(prev => ({...prev, plan: "basic", date: Date.now(), platform: "Instagram", planData: {
            likes: 200,
            reposts: 200,
            comments: 200,
            views: 500,
            saves: 0,
            follows: 200,
            subscribers: 0,
        }}))
    }


    return (
        <section id="pricing" className="pricingSect">
            <h2>Select the plan that&apos;s best <br /> for your project</h2>
            <div className="pickerCntn">
                <button onClick={() => {setCartObject(prev => ({...prev, plan: "basic", amount: 20, planData: pricingDetails[prev.platform].basic}))}} type="button" className={`pickBtn ${cartObject.plan !== "diy" && "active"}`}>Customized</button>
                <button onClick={() => {setCartObject(prev => ({...prev, plan: "diy", amount: 0, planData: {likes: 0, reposts: 0, comments: 0, views: 0, saves: 0, follows: 0, subscribers: 0,}}))}} type="button" className={`pickBtn ${cartObject.plan === "diy" && "active"}`}>Do it your way</button>
            </div>
            

            {/* here's where the paln selectors are */}
            <div className="planTypeCntn">
                <div onClick={() => {setCartObject(prev => ({...prev, plan: "basic", amount: 20, planData: pricingDetails[prev.platform].basic}))}} className={`unitPlanType ${cartObject.plan === "basic" && "active"}`}>
                    <div className="right">
                        <h3>Basic Plan</h3>
                        <p>Best for small business</p>

                        <h2>$<b>20</b>/Platform</h2>
                    </div>
                    <img src="/shipping.png" alt="/" />
                </div>
                <div onClick={() => {setCartObject(prev => ({...prev, plan: "business", amount: 50, planData: pricingDetails[prev.platform].business}))}} className={`unitPlanType ${cartObject.plan === "business" && "active"}`}>
                    <div className="right">
                        <h3>Business Plan</h3>
                        <p>Best for medium sized Startups</p>

                        <h2>$<b>50</b>/Platform</h2>
                    </div>
                    <img src="/shipping.png" alt="/" />
                </div>
                <div onClick={() => {setCartObject(prev => ({...prev, plan: "enterprise", amount: 100, planData: pricingDetails[prev.platform].enterprise}))}} className={`unitPlanType ${cartObject.plan === "enterprise" && "active"}`}>
                    <div className="right">
                        <h3>Enterprise Plan</h3>
                        <p>Best for large ventures scaling upwards</p>

                        <h2>$<b>100</b>/Platform</h2>
                    </div>
                    <img src="/shipping.png" alt="/" />
                </div>
            </div>

            {/* here goes the platform selectors */}
            <div className="platformSeelctorCntn">
                <h4>Select a social media you want engagements on and click on add to cart</h4>

                <div className="platformSelectors">
                    <button type="button" onClick={() => {handleSocialSetter("Instagram")}} className={`unitPlatform ${cartObject.platform === "Instagram" && "active"}`}><img src="/Instagram.png" alt="instagram" /></button>
                    <button type="button" onClick={() => {handleSocialSetter("Youtube")}} className={`unitPlatform ${cartObject.platform === "Youtube" && "active"}`}><img src="/Youtube.png" alt="youtube" /></button>
                    <button type="button" onClick={() => {handleSocialSetter("Linkedin")}} className={`unitPlatform ${cartObject.platform === "Linkedin" && "active"}`}><img src="/Linkedin.png" alt="linkedin" /></button>
                    <button type="button" onClick={() => {handleSocialSetter("Tiktok")}} className={`unitPlatform ${cartObject.platform === "Tiktok" && "active"}`}><img src="/Tiktok.png" alt="tiktok" /></button>
                    <button type="button" onClick={() => {handleSocialSetter("Facebook")}} className={`unitPlatform ${cartObject.platform === "Facebook" && "active"}`}><img src="/Facebook.png" alt="fb" /></button>
                    <button type="button" onClick={() => {handleSocialSetter("Snapchat")}} className={`unitPlatform ${cartObject.platform === "Snapchat" && "active"}`}><img src="/Snapchat.png" alt="snap" /></button>
                    <button type="button" onClick={() => {handleSocialSetter("Pinterest")}} className={`unitPlatform ${cartObject.platform === "Pinterest" && "active"}`}><img src="/Pinterest.png" alt="pinterest" /></button>
                    <button type="button" onClick={() => {handleSocialSetter("Spotify")}} className={`unitPlatform ${cartObject.platform === "Spotify" && "active"}`}><img src="/Spotify.png" alt="spotify" /></button>
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
                            <p>Views</p>
                            <p>Saves</p>
                            <p>Follows</p>
                            <p>Subscribers</p>
                        </div>
                        <div className={`unitdetail ${cartObject.plan === "basic" && "active"}`}>
                            <h3>Basic</h3>
                            <p>{pricingDetails[cartObject.platform].basic.likes ? pricingDetails[cartObject.platform].basic.likes : <img src="/null.png" alt="empty" />}</p>
                            <p>{pricingDetails[cartObject.platform].basic.reposts ? pricingDetails[cartObject.platform].basic.reposts : <img src="/null.png" alt="empty" />}</p>
                            <p>{pricingDetails[cartObject.platform].basic.comments ? pricingDetails[cartObject.platform].basic.comments : <img src="/null.png" alt="empty" />}</p>
                            <p>{pricingDetails[cartObject.platform].basic.views ? pricingDetails[cartObject.platform].basic.views : <img src="/null.png" alt="empty" />}</p>
                            <p>{pricingDetails[cartObject.platform].basic.saves ? pricingDetails[cartObject.platform].basic.saves : <img src="/null.png" alt="empty" />}</p>
                            <p>{pricingDetails[cartObject.platform].basic.follows ? pricingDetails[cartObject.platform].basic.follows : <img src="/null.png" alt="empty" />}</p>
                            <p>{pricingDetails[cartObject.platform].basic.subscribers ? pricingDetails[cartObject.platform].basic.subscribers : <img src="/null.png" alt="empty" />}</p>
                        </div>
                        <div className={`unitdetail ${cartObject.plan === "business" && "active"}`}>
                            <h3>Business</h3>
                            <p>{pricingDetails[cartObject.platform].business.likes ? pricingDetails[cartObject.platform].business.likes : <img src="/null.png" alt="empty" />}</p>
                            <p>{pricingDetails[cartObject.platform].business.reposts ? pricingDetails[cartObject.platform].business.reposts : <img src="/null.png" alt="empty" />}</p>
                            <p>{pricingDetails[cartObject.platform].business.comments ? pricingDetails[cartObject.platform].business.comments : <img src="/null.png" alt="empty" />}</p>
                            <p>{pricingDetails[cartObject.platform].business.views ? pricingDetails[cartObject.platform].business.views : <img src="/null.png" alt="empty" />}</p>
                            <p>{pricingDetails[cartObject.platform].business.saves ? pricingDetails[cartObject.platform].business.saves : <img src="/null.png" alt="empty" />}</p>
                            <p>{pricingDetails[cartObject.platform].business.follows ? pricingDetails[cartObject.platform].business.follows : <img src="/null.png" alt="empty" />}</p>
                            <p>{pricingDetails[cartObject.platform].business.subscribers ? pricingDetails[cartObject.platform].business.subscribers : <img src="/null.png" alt="empty" />}</p>
                        </div>
                        <div className={`unitdetail ${cartObject.plan === "enterprise" && "active"}`}>
                            <h3>Enterprise</h3>
                            <p>{pricingDetails[cartObject.platform].enterprise.likes ? pricingDetails[cartObject.platform].enterprise.likes : <img src="/null.png" alt="empty" />}</p>
                            <p>{pricingDetails[cartObject.platform].enterprise.reposts ? pricingDetails[cartObject.platform].enterprise.reposts : <img src="/null.png" alt="empty" />}</p>
                            <p>{pricingDetails[cartObject.platform].enterprise.comments ? pricingDetails[cartObject.platform].enterprise.comments : <img src="/null.png" alt="empty" />}</p>
                            <p>{pricingDetails[cartObject.platform].enterprise.views ? pricingDetails[cartObject.platform].enterprise.views : <img src="/null.png" alt="empty" />}</p>
                            <p>{pricingDetails[cartObject.platform].enterprise.saves ? pricingDetails[cartObject.platform].enterprise.saves : <img src="/null.png" alt="empty" />}</p>
                            <p>{pricingDetails[cartObject.platform].enterprise.follows ? pricingDetails[cartObject.platform].enterprise.follows : <img src="/null.png" alt="empty" />}</p>
                            <p>{pricingDetails[cartObject.platform].enterprise.subscribers ? pricingDetails[cartObject.platform].enterprise.subscribers : <img src="/null.png" alt="empty" />}</p>
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
                            <p>Views</p>
                            <p>Saves</p>
                            <p>Follows</p>
                            <p>Subscribers</p>
                        </div>
                        <div className={`unitdetail `}>
                            <h3>DIY</h3>
                            <input type="text" placeholder="0" onChange={(e) => {setCartObject(prev => ({...prev, planData: {...prev.planData, likes: e.target.value}}))}} value={cartObject.planData?.likes}/>
                            <input disabled={cartObject.platform === "Youtube" || cartObject.platform === "Snapchat" || cartObject.platform === "Spotify" ? true : false} type="text" placeholder="0" onChange={(e) => {setCartObject(prev => ({...prev, planData: {...prev.planData, reposts: e.target.value}}))}} value={cartObject.planData?.reposts}/>
                            <input disabled={cartObject.platform === "Snapchat" || cartObject.platform === "Spotify" ? true : false} type="text" placeholder="0" onChange={(e) => {setCartObject(prev => ({...prev, planData: {...prev.planData, comments: e.target.value}}))}} value={cartObject.planData?.comments}/>
                            <input disabled={cartObject.platform === "Youtube" || cartObject.platform === "Tiktok" ? false : true} type="text" placeholder="0" onChange={(e) => {setCartObject(prev => ({...prev, planData: {...prev.planData, views: e.target.value}}))}} value={cartObject.planData?.views}/>
                            <input  type="text" placeholder="0" onChange={(e) => {setCartObject(prev => ({...prev, planData: {...prev.planData, saves: e.target.value}}))}} value={cartObject.planData?.saves}/>
                            <input disabled={cartObject.platform === "Youtube" || cartObject.platform === "Snapchat" ? true : false} type="text" placeholder="0" onChange={(e) => {setCartObject(prev => ({...prev, planData: {...prev.planData, follows: e.target.value}}))}} value={cartObject.planData?.follows}/>
                            <input disabled={cartObject.platform === "Youtube" || cartObject.platform === "Snapchat" ? false : true} type="text" placeholder="0" onChange={(e) => {setCartObject(prev => ({...prev, planData: {...prev.planData, subscribers: e.target.value}}))}} value={cartObject.planData?.subscribers}/>
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
                            cartObject.planData.views !== 0 && (
                                <input onChange={(e) => {setCartObject(prev => ({...prev, links: {...prev.links, views: e.target.value}}))}} value={cartObject?.links?.views} required type="text" placeholder="Link to post you want views for e.g x.com/..."/>
                            )
                        }
                        {
                            cartObject.planData.saves !== 0 && (
                                <input onChange={(e) => {setCartObject(prev => ({...prev, links: {...prev.links, saves: e.target.value}}))}} value={cartObject?.links?.saves} required type="text" placeholder="Link to post you want saves for e.g x.com/..."/>
                            )
                        }
                        {
                            cartObject.planData.follows !== 0  && (
                                <input onChange={(e) => {setCartObject(prev => ({...prev, links: {...prev.links, follows: e.target.value}}))}} value={cartObject?.links?.follows} required type="text" placeholder="Link to post you want follows for e.g x.com/..."/>
                            )
                        }
                        {
                            cartObject.planData.subscribers !== 0 && (
                                <input onChange={(e) => {setCartObject(prev => ({...prev, links: {...prev.links, subscribers: e.target.value}}))}} value={cartObject?.links?.subscribers} required type="text" placeholder="Link to post you want subscribers for e.g x.com/..."/>
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
