import Link from 'next/link';



const Details = () => {

    return (
        <section className="orderSucessSect">
            <div className="orderSuccessCntn">
                <h1>Order successful</h1>
                <img src="/success.png" alt="success mark" />
                <p>Your request has been submitted successfully. <br /> We&apos;ll get back to you within the next hour. <br /> We need to confirm if the social media can handle your request</p>
                <Link className='blueBtn' href={"/dashboard"}>Proceed to dashboard</Link>
            </div>
        </section>
    )
}

export default Details
