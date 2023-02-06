let themeButton = document.querySelector(".switch_theme");

themeButton.addEventListener("click", () => {
    themeButton.classList.toggle("dark");

    if (themeButton.classList.contains("dark")) {
        document.documentElement.style.setProperty('--background', '#121212');
        document.documentElement.style.setProperty('--blue_tint', '#1D1D1D');
        document.documentElement.style.setProperty('--primary', '#BA85FB');
        document.documentElement.style.setProperty('--lighter gray', '#BEBEBE');
        document.documentElement.style.setProperty('--ligth_gray', '#9E9E9E');
        document.documentElement.style.setProperty('--text', '#FFF');
    } else {
        document.documentElement.style.setProperty('--background', '#fff');
        document.documentElement.style.setProperty('--blue_tint', '#f4f7fc');
        document.documentElement.style.setProperty('--primary', '#407FEC');
        document.documentElement.style.setProperty('--lighter gray', '#BEBEBE');
        document.documentElement.style.setProperty('--ligth_gray', '#9E9E9E');
        document.documentElement.style.setProperty('--text', '#2B2B2B');
    }

});


