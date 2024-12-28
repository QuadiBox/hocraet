import { UserProfile } from '@clerk/nextjs'
import { light } from "@clerk/themes";


const page = () => {
    return (
        <div className='dashmainCntn profile clients'>
            <h1>Profile Settings</h1>
            <div className="profileDisplayCntn">
                <UserProfile
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
                    path='/dashboard/profile_settings'
                ></UserProfile>
            </div>
        </div>
    )
}

export default page
