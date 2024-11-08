import { SignUp } from '@clerk/nextjs'
import Link from 'next/link'
import { light } from "@clerk/themes";
import Navbar from '@/app/navbar';

const Page = () => {
    return (
        <div className='signInCntn'>
            <div className="left" style={{backgroundImage: "url(/signup.png)"}}>
                <Link href={"/"}><img src="/nav_logo.png" alt="Hocreate Logo" /></Link>

                <h2>Let&apos;s get you geared up</h2>
            </div>
            <div className="right">
                <div className="theNav">
                    <Navbar></Navbar>
                </div>
                <SignUp
                    appearance={{
                        baseTheme: light,
                        variables: {
                            colorBackground: "#ffffff",
                            fontSize: "14px",
                            colorText: "#000000",
                            colorNeutral: "#80808026",
                            colorInputBackground: "transparent"
                        }
                    }}
                ></SignUp>
            </div>
        </div>
    )
}

export default Page
