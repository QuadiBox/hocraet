import React from 'react'
import Navbar from '../navbar'
import Pickplan from '../home/pickplan'
import Footer from '../footer'

const Page = () => {
    return (
        <main className="grandCntn">
            <Navbar></Navbar>
            <div className="processTracker">
                <div className="unittracker"><img src="/done.png" alt="mark sign" /> Pick a plan</div>
                <span></span>
                <div className="unittracker ongoing"><b>2</b> Confirm Bouquet</div>
                <span></span>
                <div className="unittracker pending"><b>3</b> Checkout</div>
                <span></span>
                <div className="unittracker pending"><b>4</b> Request complete</div>
            </div>
            <Pickplan cartAdder={true}></Pickplan>
            <Footer></Footer>
        </main>
    )
}

export default Page
