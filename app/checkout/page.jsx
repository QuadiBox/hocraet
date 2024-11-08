import Navbar from '../navbar'
import Footer from '../footer'
import Details from './details'

const Page = () => {
    return (
        <main className="grandCntn">
            <Navbar></Navbar>
            <div className="processTracker">
                <div className="unittracker"><img src="/done.png" alt="mark sign" /> Pick a plan</div>
                <span></span>
                <div className="unittracker"><img src="/done.png" alt="mark sign" /> Confirm Bouquet</div>
                <span></span>
                <div className="unittracker ongoing"><b>3</b> Checkout</div>
                <span></span>
                <div className="unittracker pending"><b>4</b> Request complete</div>
            </div>
            <Details></Details>
            
            <Footer></Footer>
        </main>
    )
}

export default Page