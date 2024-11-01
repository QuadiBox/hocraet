import Navbar from '../navbar'
import Footer from '../footer'
import Link from 'next/link'

const page = () => {
    return (
        <main className="grandCntn">
            <Navbar></Navbar>
            <div className="processTracker">
                <div className="unittracker"><img src="/done.png" alt="mark sign" /> Pick a plan</div>
                <span></span>
                <div className="unittracker"><img src="/done.png" alt="mark sign" /> Confirm Bouquet</div>
                <span></span>
                <div className="unittracker"><img src="/done.png" alt="mark sign" /> Checkout</div>
                <span></span>
                <div className="unittracker"><img src="/done.png" alt="mark sign" /> Request complete</div>
            </div>
            <section className="orderSucessSect">
                <div className="orderSuccessCntn">
                    <h1>Order successful</h1>
                    <img src="/success.png" alt="success mark" />
                    <p>Your request has been submitted successfully. <br /> We'll get back to you within the next hour. <br /> We need to confirm if the social media can handle your request</p>
                    <Link className='blueBtn' href={"/dashboard"}>Proceed to dashboard</Link>
                </div>
            </section>
            <Footer></Footer>
        </main>
    )
}

export default page
