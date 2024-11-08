'use client'
import { useEffect, useState } from "react"

const Reviews = () => {
    const [currentOne, setCurrentOne] = useState(2);
    const [totalReviews, setTotaReviews] = useState(3)
    const [mobileShowing, setmobileShowing] = useState(1);
    const [transformPercent, settransformPercent] = useState(33);

    function scrollToCenterElement(element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'center'
        });
    };

    let num = 1;


    useEffect(() => {
        const targetElement = document.querySelector('.reviews');
        const container = document.querySelector('.reviewCntn');


    
        function handleScroll(e) {
            // Add your scrolling logic here
            if (window.innerWidth > 600) {
              const allElements = container?.children;
              if (e.target.className === "prevScrollBtn" || e.target.className === "icofont-rounded-left") {
                  if (currentOne > 1) {
                      scrollToCenterElement(allElements[currentOne - 2]);  
                      setCurrentOne(prev => prev - 1);
                  }
              } else if (e.target.className === "nextScrollBtn" || e.target.className === "icofont-rounded-right") {
                  if (currentOne < totalReviews) {
                    scrollToCenterElement(allElements[currentOne - 2]);  
                    setCurrentOne(prev => prev + 1);
                  }
              }

            } else {
              if (e.target.className === "prevScrollBtn" || e.target.className === "icofont-rounded-left") {
                if (num > 1) {
                  settransformPercent(prev => prev + 33);
                  num = num - 1
                }
              } else if (e.target.className === "nextScrollBtn" || e.target.className === "icofont-rounded-right") {
                  if (num < totalReviews) {
                    settransformPercent(prev => prev - 33);
                    num = num + 1
                  }
              }
            }
        }
    
        targetElement?.addEventListener("click", handleScroll);
    
        return () => {
            targetElement?.removeEventListener("click", handleScroll);
        };
    }, []);


    return (
        <section id="reviews" className="benefitsSection reviews">
          <h3>Reviews</h3>
          <h2>Here is what they <br /> said about us</h2>
          <p>They tested us and trusted us</p>
          <div className="reviews_grid">

            <div className="reviewCntn">
              <div className={`unitReviews ${currentOne === 1 && "active"}`}>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio exercitationem numquam modi. Odit repellat fugit itaque quidem voluptates tenetur dolorum!</p>
                <div className="bottomsect">
                  <div className="profile">
                    <div className="pfp"><img src="/pfp_1.png" alt="reviewer image" /></div>
                    <div className="pfpData">
                      <h4>Adetunji Adenle</h4>
                      <p>CEO Flip to Tech. nig.</p>
                    </div>
                  </div>

                  <div className="ratingBox">
                    <img src="/star.png" alt="star" />
                    <img src="/star.png" alt="star" />
                    <img src="/star.png" alt="star" />
                    <img src="/star.png" alt="star" />
                    <img src="/star.png" alt="star" />
                  </div>
                </div>
              </div>
              <div className={`unitReviews ${currentOne === 2 && "active"}`}>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio exercitationem numquam modi. Odit repellat fugit itaque quidem voluptates tenetur dolorum!</p>
                <div className="bottomsect">
                  <div className="profile">
                    <div className="pfp"><img src="/pfp_1.png" alt="reviewer image" /></div>
                    <div className="pfpData">
                      <h4>Adetunji Adenle</h4>
                      <p>CEO Flip to Tech. nig.</p>
                    </div>
                  </div>

                  <div className="ratingBox">
                    <img src="/star.png" alt="star" />
                    <img src="/star.png" alt="star" />
                    <img src="/star.png" alt="star" />
                    <img src="/star.png" alt="star" />
                    <img src="/star.png" alt="star" />
                  </div>
                </div>
              </div>
              <div className={`unitReviews ${currentOne === 3 && "active"}`}>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio exercitationem numquam modi. Odit repellat fugit itaque quidem voluptates tenetur dolorum!</p>
                <div className="bottomsect">
                  <div className="profile">
                    <div className="pfp"><img src="/pfp_1.png" alt="reviewer image" /></div>
                    <div className="pfpData">
                      <h4>Adetunji Adenle</h4>
                      <p>CEO Flip to Tech. nig.</p>
                    </div>
                  </div>

                  <div className="ratingBox">
                    <img src="/star.png" alt="star" />
                    <img src="/star.png" alt="star" />
                    <img src="/star.png" alt="star" />
                    <img src="/star.png" alt="star" />
                    <img src="/star.png" alt="star" />
                  </div>
                </div>
              </div>

            </div>
            <div style={{transform: `translateX(${transformPercent}%)`}} className="reviewCntn mobile">
              <div className={`unitReviews ${currentOne === 1 && "active"}`}>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio exercitationem numquam modi. Odit repellat fugit itaque quidem voluptates tenetur dolorum!</p>
                <div className="bottomsect">
                  <div className="profile">
                    <div className="pfp"><img src="/pfp_1.png" alt="reviewer image" /></div>
                    <div className="pfpData">
                      <h4>Adetunji Adenle</h4>
                      <p>CEO Flip to Tech. nig.</p>
                    </div>
                  </div>

                  <div className="ratingBox">
                    <img src="/star.png" alt="star" />
                    <img src="/star.png" alt="star" />
                    <img src="/star.png" alt="star" />
                    <img src="/star.png" alt="star" />
                    <img src="/star.png" alt="star" />
                  </div>
                </div>
              </div>
              <div className={`unitReviews ${currentOne === 2 && "active"}`}>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio exercitationem numquam modi. Odit repellat fugit itaque quidem voluptates tenetur dolorum!</p>
                <div className="bottomsect">
                  <div className="profile">
                    <div className="pfp"><img src="/pfp_1.png" alt="reviewer image" /></div>
                    <div className="pfpData">
                      <h4>Adetunji Adenle</h4>
                      <p>CEO Flip to Tech. nig.</p>
                    </div>
                  </div>

                  <div className="ratingBox">
                    <img src="/star.png" alt="star" />
                    <img src="/star.png" alt="star" />
                    <img src="/star.png" alt="star" />
                    <img src="/star.png" alt="star" />
                    <img src="/star.png" alt="star" />
                  </div>
                </div>
              </div>
              <div className={`unitReviews ${currentOne === 3 && "active"}`}>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio exercitationem numquam modi. Odit repellat fugit itaque quidem voluptates tenetur dolorum!</p>
                <div className="bottomsect">
                  <div className="profile">
                    <div className="pfp"><img src="/pfp_1.png" alt="reviewer image" /></div>
                    <div className="pfpData">
                      <h4>Adetunji Adenle</h4>
                      <p>CEO Flip to Tech. nig.</p>
                    </div>
                  </div>

                  <div className="ratingBox">
                    <img src="/star.png" alt="star" />
                    <img src="/star.png" alt="star" />
                    <img src="/star.png" alt="star" />
                    <img src="/star.png" alt="star" />
                    <img src="/star.png" alt="star" />
                  </div>
                </div>
              </div>

            </div>

            <div className="prevNextCntn">
                <button type="button" className="scrollBtn prevScrollBtn"><i className="icofont-rounded-left"></i></button>
                <button type="button" className="scrollBtn nextScrollBtn"><i className="icofont-rounded-right"></i></button>
            </div>
          </div>
        </section>
    )
}

export default Reviews
