'use client'

import Link from "next/link";
import { useState, useEffect } from "react"
import { useUser } from "@clerk/nextjs";
import { onSnapshotWithCondition } from "../db/firestoreService";
import { PaystackButton } from 'react-paystack';
import { useRouter } from 'next/navigation'


const Details = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showCount, setshowCount] = useState(3);
  const [nairaRate, setnairaRate] = useState(0);

  const router = useRouter();

  const base_url = process.env.NEXT_PUBLIC_BASE_URL


  const { isLoaded, isSignedIn, user } = useUser();

  const filteredList = cartItems.filter((elem, idx) => idx <= showCount);

  const twoWeeksInMilliseconds = 2 * 7 * 24 * 60 * 60 * 1000;
  let futureDate = new Date();

  const deliveryDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',   // Mon
    day: 'numeric',     // 8
    month: 'short',     // Feb
    year: 'numeric',    // 2024
    hour: 'numeric',    // 8
    minute: '2-digit',  // 50
    hour12: true        // pm/am format
  }).format(futureDate)
  // const deliveryDate = "Mond 4 30 2024"

  // Using reduce to calculate the total amount
  const totalAmount = cartItems?.reduce((sum, item) => {
    return sum + parseInt(item.amount, 10); // Convert amount to integer and add to sum
  }, 0);

  const config = {
    reference: (new Date()).getTime().toString(),
    email: `${user?.emailAddresses[user?.emailAddresses.length - 1].emailAddress}`,
    amount: (totalAmount + (totalAmount * 0.02)) * 100 * 1650, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey: 'pk_test_680463a03d8cd455d731195ceb8835ce288d94e9',
  };

  const handlePaystackSuccessAction = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    console.log(reference);
    router.push("/request_complete");
  };

  // you can call this function anything
  const handlePaystackCloseAction = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log('closed')
  }

  const componentProps = {
    ...config,
    text: 'Checkout',
    onSuccess: (reference) => handlePaystackSuccessAction(reference),
    onClose: handlePaystackCloseAction,
  };



  const getDollarToNairaRate = async () => {
    try {
      const response = await fetch('https://api.getgeoapi.com/v2/currency/convert?api_key=b5df88d143db6c6ffefe374e1b2e46e267acf5e8&from=USD&to=NGN&amount=1&format=json');
      if (!response.ok) {
        throw new Error('Failed to fetch conversion rate');
      }

      const data = await response.json();

      console.log(`1 USD = ${response} NGN`);
      return data.result;
    } catch (error) {
      console.error('Error:', error);
    }
  };


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
    const newNiraRate = getDollarToNairaRate();
    setnairaRate(newNiraRate);
  }, []);

  const initializeTransaction = async (vlad, clad) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: vlad,
        amount: clad,
      })
    };

    try {
      const response = await fetch('/api/initializeSub', options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.status) {
        //after the response is successfully received
        // Redirect to paystack's authorization_url to checkout
        window.location.href = data.data.authorization_url;
      } else {
        console.error('Failed to initialize transaction.');
        
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    <div className="confirmGrandCntn special">
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
              </div>

            ))
          }

        </div>
        <PaystackButton {...componentProps}></PaystackButton>
        {/* <button onClick={() => {initializeTransaction(`${user?.emailAddresses[user?.emailAddresses.length - 1].emailAddress}`, `${(totalAmount + (totalAmount * 0.02)) * 100 * 1650}`)}}>Checkout</button> */}

      </div>
      <div className="checkoutDetails">
        <h2>Checkout Details</h2>
        <div className="summary">
          <p><b>Total Requests</b> <span>{cartItems.length} Platforms</span></p>
          <p><b>Delivery Date</b> <span>{deliveryDate}</span></p>
        </div>
        <div className="summary">
          <p><b>Total Package</b> <span>${totalAmount}</span></p>
          <p><b>Tax</b> <span>${totalAmount * 0.02}</span></p>
        </div>
        <div className="total">
          <b>Total</b>
          <span>${totalAmount + (totalAmount * 0.02)}</span>
        </div>
      </div>
      
      <button className="blueBtn mobileOnly" onClick={() => {initializeTransaction(`${user?.emailAddresses[user?.emailAddresses.length - 1].emailAddress}`, `${(totalAmount + (totalAmount * 0.02)) * 100 * 1650}`)}}>Checkout</button>

    </div>
  )
}

export default Details
