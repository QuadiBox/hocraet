import Link from "next/link";
import Reviews from "./home/reviews";
import Pickplan from "./home/pickplan";
import Navbar from "./navbar";
import Footer from "./footer";

export default function Home() {

  return (
    <div>
      <main className="grandCntn">
        <section className="heroSectionCntn">
          <div className="decorCircle"></div>
          <Navbar></Navbar>
          <div className="heroSection">
            <img className="happy_customer" src="/happy_customers.png" alt="top followers" />
            <h1>Boost Your Social Media with Real-Time Engagement <img src="/curved_arrow.png" alt="curved arrow" /></h1>
            <p>Boost your social presence and drive meaningful interactions 100% Organic engagements</p>

            <form className="bookDemo">
              <input type="email" name="email" id="email" placeholder="Enter your email"/> 
              <button type="submit">Book a Demo</button>
            </form>
            <img className="theHeroImg" src="/hero_img.png" alt="hero image" />
          </div>

          <button type="button" className="circleTextBtn"><img src="/curved_text.png" alt="" /></button>

        </section>

        <section className="sponsors">
          <div className="sponsorCntn">
            <img src="/slum.png" alt="slum art logo" />
            <img src="/flip.png" alt="flip to tech logo" />
            <img src="/fcmb.png" alt="fcmb logo" />
            <img src="/zenith.png" alt="zenith bank logo" />
            <img src="/nasco.png" alt="nasco logo" />

            <h2>They trusted our service</h2>
          </div>
        </section>


        <section className="benefitsSection">
          <h3>About us</h3>
          <h2>One solution for <br /> all social media engagement</h2>
          <p>Reach your target audience faster with social media</p>
          <div className="gridCntn">
            <div className="gridRight">
              <img className="gridDesktop" src="/media_growth.png" />
              <img className="gridDesktopMobile" src="/media_growth_mobile.png" />
            </div>
            <div className="gridLeft">
              <div className="topTop">
                <div className="unitGrid">
                  <img src="/gain_user.png" alt="gain user" />
                  <img src="/impression_graph.png" alt="impression graph" />
                </div>
                <div className="unitGrid">
                  <img src="/get_active.png" alt="get active user" />
                  <img src="/grid_img2.png" alt="impression graph" />
                </div>
              </div>
              <div className="downBelow">
                <div className="unitGrid">
                  <img src="/stay_ontop.png" alt="gain user" />
                  <div className="totalMentions">
                    <h3>TOTAL MENTIONS</h3>
                    <h2>260,000</h2>
                  </div>
                </div>
                <div className="unitGrid">
                  <img src="/get_engage.png" alt="get active user" />
                  <img src="/grid_img1.png" alt="impression graph" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="benefitsSection standout">
          <h3>Why we stand out</h3>
          <h2>We&apos;re not here for jokes <br /> We&apos;re here at your service!</h2>
          <p>Reach your target audience faster with social media</p>
          <div className="reasons">
            <div className="unitReason">
              <h3>001</h3>
              <h2>100% Organic engagement</h2>

              <img src="/hocreate_icon.png" alt="hocreate icon" />
            </div>
            <div className="unitReason">
              <h3>002</h3>
              <h2>Bespoke subscription package</h2>

              <img src="/hocreate_icon.png" alt="hocreate icon" />
            </div>
            <div className="unitReason">
              <h3>003</h3>
              <h2>Easy payment system</h2>

              <img src="/hocreate_icon.png" alt="hocreate icon" />
            </div>
            <div className="unitReason">
              <h3>004</h3>
              <h2>Monitor your progress</h2>

              <img src="/hocreate_icon.png" alt="hocreate icon" />
            </div>
          </div>
        </section>

        <section id="services" className="benefitsSection services">
          <h3>Our services</h3>
          <h2>Here is why we&apos;re <br /> here for you</h2>
          <p>The fuel to growth, is engagement</p>
          <div className="services_grid">
            <img src="/services_img.jpg" alt="" />

            <div className="detail_services">
              <h2>We get you authentic social media engagements</h2>

              <p>In today&apos;s fast-paced digital world, having a strong social media presence is essential for building brand awareness and driving business growth. However, it&apos;s not just about numbers—it&apos;s about quality. That&apos;s where we come in.</p>

              <ul>
                <li>What We Do <br /> We help businesses of all sizes connect with their target audience by delivering authentic engagements across major social media platforms. We understand that real success comes from meaningful interactions that convert into long-term relationships and loyal customers. Instead of simply boosting vanity metrics like followers or likes, we focus on what truly matters: genuine conversations, user-generated content, and organic audience growth.</li>
                <li>How We Achieve It <br /> Our approach combines cutting-edge social listening tools with a deep understanding of human behavior on social media. Here&apos;s how we ensure authenticity:
                  <ul>
                    <li>Target audience strategy</li>
                    <li>Quality Content Creation</li>
                    <li>Organic Growth Techniques</li>
                    <li>Authentic Interactions</li>
                  </ul>

                </li>
              </ul>

            </div>
          </div>
        </section>
        <Pickplan></Pickplan>
        <Reviews></Reviews>

      </main>
      <Footer></Footer>
    </div>
  );
}
