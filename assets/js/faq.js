document.querySelectorAll(".faq-question").forEach(function (button) {
    button.addEventListener("click", function () {
        var panel = document.getElementById(button.dataset.target);

        panel.hidden = !panel.hidden;
        button.classList.toggle("open", !panel.hidden);
    });
});