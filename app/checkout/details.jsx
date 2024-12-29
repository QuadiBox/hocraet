'use client'

import Link from "next/link";
import { useState, useEffect } from "react"
import { useUser } from "@clerk/nextjs";
import { addDocument, deleteDocument, fetchDocumentsWithCondition } from "../db/firestoreService";
import { PaystackButton } from 'react-paystack';
import { useRouter } from 'next/navigation'
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";


const Details = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showCount, setshowCount] = useState(3);
  const [nairaRate, setnairaRate] = useState(0);
  const [showPaymentWidget, setShowPaymentWidget] = useState(false);

  const router = useRouter();

  const base_url = process.env.NEXT_PUBLIC_BASE_URL

  const { isLoaded, isSignedIn, user } = useUser();

  //object to be addded to cart object to monitor progress, status and location
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

  const filteredList = cartItems.filter((elem, idx) => idx <= showCount);

  const twoWeeksInMilliseconds = 2 * 7 * 24 * 60 * 60 * 1000;
  let futureDate = new Date();

  const deliveryDate = new Intl.DateTimeFormat('en-US', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true }).format(futureDate)
  // const deliveryDate = "Mond 4 30 2024"

  // Using reduce to calculate the total amount
  const totalAmount = cartItems?.reduce((sum, item) => {
    return sum + parseInt(item.amount, 10); // Convert amount to integer and add to sum
  }, 0);

  //paystack widget configuration
  const config = {
    reference: (new Date()).getTime().toString(),
    email: `${user?.emailAddresses[user?.emailAddresses.length - 1].emailAddress}`,
    amount: (totalAmount + (totalAmount * 0.02)) * 100 * 1650, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey: 'pk_test_680463a03d8cd455d731195ceb8835ce288d94e9',
  };

  //paypal SDK script options
  const paypalConfig = {
    clientId: "AfFmkHQFORL9h3KGgSB3aXPMPLWs0em2zGzBMM0X2mEnHVYQ53RZhQSR8GYNC-18ngxbsW8rrZZo1g1x",
    currency: "USD",
    intent: "capture",
  };

  //action for when the paystack widget payment goes through successfully
  const handlePaystackSuccessAction = async (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    await handleRequestProcessAfterPayment();
    router.push("/request_complete");
  };

  // you can call this function anything
  const handlePaystackCloseAction = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log('closed')
  }

  const componentProps = {
    ...config,
    text: 'Pay with Paystack',
    onSuccess: (reference) => handlePaystackSuccessAction(reference),
    onClose: handlePaystackCloseAction,
  };

  const handleRequestProcessAfterPayment = async () => {
    const response = await fetch('/api/get-location'); // Defaults to GET
    const data = await response.json();

    const locationData = data || {
      ip: "197.211.53.80",
      city: "Lagos",
      region: "Lagos",
      country: "NG",
      loc: "6.4541,3.3947",
      org: "AS37148 Globacom Limited",
      timezone: "Africa/Lagos"
    }

    setShowPaymentWidget(false);

    if (cartItems) {
        // Add documents to the "requests" collection
        for (const elem of cartItems) {
            const todb = { ...elem, ...checkoutObject, locationData };
            await addDocument("requests", todb);
        }

        // Delete documents from the "carts" collection
        for (const elem of cartItems) {
            await deleteDocument("carts", elem.id);
        }
        // Log a message after both processes are complete
        console.log("All cart items processed and deleted.");

    }
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


  //fecthes all items in the cart that belongs to the current user, using the u_id for matching
  useEffect(() => {
    const fectItems = async () => {
      const items = await fetchDocumentsWithCondition("carts", "u_id", `${user?.id}`);
      
      setCartItems(items)
    }

    fectItems();
  
  }, [isLoaded, isSignedIn]);

  useEffect(() => {
    const newNiraRate = getDollarToNairaRate();
    setnairaRate(newNiraRate);
  }, []);

  //alternative paystack paystack that utilizes the backend api coordination
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
        <button className="blueBtn" onClick={() => {setShowPaymentWidget(true)}}>Checkout</button>
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
      
      <button className="blueBtn mobileOnly" onClick={() => {setShowPaymentWidget(true)}}>Checkout</button>
      {/* <button className="blueBtn mobileOnly" onClick={() => {initializeTransaction(`${user?.emailAddresses[user?.emailAddresses.length - 1].emailAddress}`, `${(totalAmount + (totalAmount * 0.02)) * 100 * 1650}`)}}>Checkout</button> */}


      {
        showPaymentWidget && (
          <div className="paymentWidgetCntn">
            <div className="paymentWidget">
              <span onClick={() => {setShowPaymentWidget(false)}}><i className="icofont-close-line"></i></span>
              <PaystackButton {...componentProps}></PaystackButton>
              <PayPalScriptProvider options={paypalConfig}>
                  <PayPalButtons 
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        purchase_units: [
                          {
                            amount: {
                              value: totalAmount + (totalAmount * 0.02), // Use the specified amount here
                            },
                          },
                        ],
                      });
                    }}
                    onApprove={async (data, actions) => {
                      try {
                        // handle the request formatting and update db data
                        await handleRequestProcessAfterPayment();
              
                        // Navigate to the new route after async function completes
                        router.push("/request_complete");
                      } catch (error) {
                        console.error("Error during approval:", error);
                      }
                    }}
                    onError={(err) => {
                      console.error("PayPal Checkout error:", err);
                    }}
                  />
              </PayPalScriptProvider>
            </div>
          </div>
        )
      }

    </div>
  )
}

export default Details
