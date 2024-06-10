import React from 'react'
import './scrollheadlines.css'
function ScrollingHeadlines() {
    const headLines = [
        "Big Sale: Up to 50% off on selected items!",
        "Free shipping on orders over $50.",
        "New arrivals are here. Check them out!",
        "Limited-time offer: Buy one get one free on all dairy products.",
        "Fresh vegetables available daily!"
    ]
    return (
        <div className="scrolling-headlines">
            <div className="headline-container">
                {
                    headLines.map((headline, index) => {
                        return <span key={index} className="headline">{headline}</span>
                    })
                }
            </div>
        </div>
    )
}

export default ScrollingHeadlines;
