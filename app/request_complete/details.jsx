'use client'

import { useSearchParams } from 'next/navigation';
import { addDocument, deleteDocument, fetchDocumentWithCondition } from '../db/firestoreService';
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { onSnapshotWithCondition } from '../db/firestoreService';



const Details = () => {
    const searchParams = useSearchParams();
    const [cartItems, setCartItems] = useState([]);
    const [complete, setComplete] = useState(false);

    const { isLoaded, isSignedIn, user} = useUser();

    const reference = searchParams.get('reference');

    const checkoutObject = {
        progress: {
            likes: [],
            reposts: [],
            comments: [],
            views: [],
            saves: [],
            follows: [],
            subscribers: [],
        },
        status: "pending"
    }

    useEffect(() => {
        const processCartItems = async () => {
            if (cartItems) {
                // Add documents to the "requests" collection
                for (const elem of cartItems) {
                    const todb = { ...elem, ...checkoutObject };
                    await addDocument("requests", todb);
                }
    
                // Delete documents from the "carts" collection
                for (const elem of cartItems) {
                    await deleteDocument("carts", elem.id);
                }
                setComplete(true)
                // Log a message after both processes are complete
                console.log("All cart items processed and deleted.");

            }
        };
    
        processCartItems();
    }, [cartItems]);

    useEffect(() => {
        const fecthCart = fetchDocumentWithCondition(
            "carts",
            "u_id",
            `${user?.id}`,
        )

        const processCartItems = async () => {
            if (reference && cartItems) {
                // Add documents to the "requests" collection
                for (const elem of cartItems) {
                    const todb = { ...elem, ...checkoutObject };
                    await addDocument("requests", todb);
                }
    
                // Delete documents from the "carts" collection
                for (const elem of cartItems) {
                    await deleteDocument("carts", elem.id);
                }
                setComplete(true)
                // Log a message after both processes are complete
                console.log("All cart items processed and deleted.");

            }
        };
        
        if (fecthCart) {
            processCartItems();
        }
      
    }, [isLoaded, isSignedIn]);

    return (
        <section className="orderSucessSect">
            <div className="orderSuccessCntn">
                <h1>Order successful</h1>
                <img src="/success.png" alt="success mark" />
                <p>Your request has been submitted successfully. <br /> We&apos;ll get back to you within the next hour. <br /> We need to confirm if the social media can handle your request</p>
                {
                    complete && (
                        <Link className='blueBtn' href={"/dashboard"}>Proceed to dashboard</Link>
                    )
                }
            </div>
        </section>
    )
}

export default Details
