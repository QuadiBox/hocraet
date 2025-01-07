import Link from "next/link";
import { SignOutButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import NavButton from "./navButton";


export default async function RootLayout({ children }) {
    const user = await currentUser();


    return (
        <div className="dashboardGrandCntn">
            
            <nav className="thedashBoardNav">
                <Link href={"/"}><img src="/nav_logo.png" alt="Hocreat logo" /></Link>
                <div className="linkList">
                    <Link className="one" href={"/dashboard"}><i className="icofont-ghost"></i>Overview</Link>
                    <Link className="two" href={"/dashboard/profile_settings"}><i className="icofont-ui-settings"></i>Profile Settings</Link>
                </div>

                <div className="logoutBtnCntn">
                    <h3>You are logged in as <span>{user?.username}</span></h3>
                    <SignOutButton>Log out</SignOutButton>
                    {/* <button type="button">Log out</button> */}
                </div>


            </nav>
            <NavButton></NavButton>
                
            <main className='dashboardCntn'>
                <div className="header">
                    <div className="searchBox">
                        <button type="button"><i className="icofont-search"></i></button>
                        <input type="search" name="searchbox" id="searchbox" placeholder="What are you looking for?"/>
                    </div>
                    <div className="dateTime">
                        <h2>Enter dates <i className="icofont-ui-calendar"></i></h2>
                        <div className="bottom">
                            <input type="text" placeholder="dd-mm-yyyy"/>
                            <input type="text" placeholder="dd-mm-yyyy"/>
                        </div>
                    </div>
                    <div className="dashNavProfile">
                        <img src={`${user?.imageUrl}`} alt="profile picture" />
                        <h3>{user?.username}</h3>
                    </div>
                </div>
                { children }
                
            </main>
        </div>
    );
}