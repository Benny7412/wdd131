
if (window.location.pathname.includes("review.html")) {
    let reviewCount = Number(localStorage.getItem("reviewCount")) || 0;
    reviewCount++;
    localStorage.setItem("reviewCount", reviewCount);

    const reviewCounter = document.createElement("p");
    reviewCounter.textContent = `Total Reviews Submitted: ${reviewCount}`;
    document.body.appendChild(reviewCounter);
}