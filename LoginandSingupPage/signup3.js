document.addEventListener("DOMContentLoaded", function () {
    let progressBar = document.getElementById("progressBar");
    let nextBtn = document.getElementById("nextBtn");

    // Start Progress at 50%
    progressBar.style.width = "75%";

    nextBtn.addEventListener("click", function () {
        window.location.href = "signup4.html"; // Next page
    });
});
