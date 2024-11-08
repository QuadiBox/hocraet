import Navbar from '../navbar'
import Footer from '../footer'
import Link from 'next/link'
import Details from './details'

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
            <Details></Details>
            <Footer></Footer>
        </main>
    )
}

export default page
