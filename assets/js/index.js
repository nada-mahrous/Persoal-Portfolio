// *** select elements

// & Theme Toggle select elements
var themeToggleBtn = document.getElementById("theme-toggle-button"); // This selects the button that will toggle the theme when clicked
var htmlElement = document.documentElement; // This selects the <html> element, which is where we will apply the theme classes

// & Portfolio : Navs & Tabs select elements
var filterBtns = document.querySelectorAll(".portfolio-filter"); // This selects all elements with the class "portfolio-filter", which are the buttons used to filter portfolio items
var portfolioItems = document.querySelectorAll(".portfolio-item"); // This selects all elements with the class "portfolio-item", which are the items in the portfolio that will be filtered

// & Testimonials : Carousel select elements
var carousel = document.getElementById("testimonials-carousel"); // This selects the element with the ID "testimonials-carousel", which is the container for the testimonial cards that will be slid left and right
var nextBtn = document.getElementById("next-testimonial"); // This selects the element with the ID "next-testimonial", which is the button that will slide the testimonials to the next one when clicked
var prevBtn = document.getElementById("prev-testimonial"); // This selects the element with the ID "prev-testimonial", which is the button that will slide the testimonials to the previous one when clicked
// convert nodelist to array to use array methods on it (this is the dots that indicate the current testimonial card)
var indicators = Array.from(document.querySelectorAll(".carousel-indicator"));

// & Scroll to Top Button select elements
var scrollToTopBtn = document.getElementById("scroll-to-top"); // This selects the element with the ID "scroll-to-top", which is the button that will scroll the page to the top when clicked

// & Settings Sidebar select elements
var settingsToggle = document.getElementById("settings-toggle"); // This is the button that will toggle the settings sidebar when clicked
var settingsSidebar = document.getElementById("settings-sidebar"); // This is the sidebar that will be shown and hidden when the user clicks the settings toggle button or the close button in the sidebar.
var closeSettings = document.getElementById("close-settings"); // This is the button inside the settings sidebar that will close the sidebar when clicked

// & Font Options select elements
var fontOptions = document.querySelectorAll(".font-option"); // This selects all elements with the class "font-option", which are the buttons used to change the font of the page

// & Colors Theme Options select elements
var themeColorsGrid = document.getElementById("theme-colors-grid"); // This selects the element with the ID "theme-colors-grid", which is the container where the theme color buttons will be added dynamically

// & Reset All Settings Button select elements
var resetBtn = document.getElementById("reset-settings"); // This selects the element with the ID "reset-settings", which is the button that will reset all settings to their default values when clicked

// ** toggle theme
var savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  htmlElement.classList.add("dark");
} else {
  htmlElement.classList.remove("dark");
}
// **======================================================
// **======================================================

// ** Portfolio : Navs & Tabs
for (var i = 0; i < filterBtns.length; i++) {
  //   filterBtns[i].addEventListener("click", function (e) {
  //   console.log(this);
  //   console.log(e.target);
  // });

  filterBtns[i].addEventListener("click", function (e) {
    // remove active class from all buttons
    for (var j = 0; j < filterBtns.length; j++) {
      filterBtns[j].classList.remove("active");
    }

    // add active class to current button that user clicked
    this.classList.add("active");

    // current button filter value that user clicked on to filter items by category
    // get current filter value to compare it with item category to decide if we show it or hide it
    var currentFilter = this.getAttribute("data-filter");
    // var currentFilter = e.currentTarget.getAttribute("data-filter");

    // loop through items to show/hide them based on filter value and item category
    for (var j = 0; j < portfolioItems.length; j++) {
      // get current item category to compare it with current filter value to decide if we show it or hide it
      var currentCategory = portfolioItems[j].getAttribute("data-category");

      // show matching items
      if (currentFilter == "all" || currentFilter == currentCategory) {
        portfolioItems[j].style.display = "block";
      }

      // hide other items
      else {
        portfolioItems[j].style.display = "none";
      }
    }
  });
}

// **======================================================
// **======================================================

// ** Testimonials : Carousel
/* 
we declare a variable called currentIndex and set it to 0. cuz when we call updateCarousel() for the first time, 
it will use this currentIndex to show the first testimonial card and set the first dot indicator as active.
*/
var currentIndex = 0;

// dots indicators
for (var i = 0; i < indicators.length; i++) {
  indicators[i].addEventListener("click", function (e) {
    currentIndex = +e.target.getAttribute("data-index");
    /* 
      / / OR
      currentIndex = +e.target
      .closest(".carousel-indicator")
      .getAttribute("data-index"); 
    */
    /* 
      / / OR
      currentIndex = Number(
      e.target.getAttribute("data-index")
      );
    */

    updateCarousel();
  });
}

// **function updateCarousel to update the carousel position and the active dot indicator based on the current index
function updateCarousel() {
  // we use translateX to move the carousel container left and right based on the current index.
  carousel.style.transform = `
    translateX(${currentIndex * 33.333}%)
  `;

  // update dots indicators by removing active classes from all indicators and adding active classes to the current indicator based on the current index.
  for (var i = 0; i < indicators.length; i++) {
    // remove active classes from all indicators to make them gray by default.
    indicators[i].classList.remove("bg-accent");
    indicators[i].classList.remove("scale-125");

    // add inactive class to all indicators to make them gray by default.
    indicators[i].classList.add("bg-slate-400");
  }

  // add active classes to the current indicator based on the current index.
  indicators[currentIndex].classList.add("bg-accent");
  indicators[currentIndex].classList.add("scale-125");

  // remove inactive class from the current indicator based on the current index.
  indicators[currentIndex].classList.remove("bg-slate-400");
}

// ** function slide
function slide(step) {
  // currentIndex = currentIndex + step;
  currentIndex += step;

  //check if the current index is equal to the length of the indicators array(more than ), then we reset it to 0 to loop back to the first card.
  if (currentIndex === indicators.length) {
    currentIndex = 0;
  }
  //check if the current index is less than 0, then we reset it to the last card to loop back to the last card.
  else if (currentIndex < 0) {
    currentIndex = indicators.length - 1;
  }

  updateCarousel();
}

// first load
updateCarousel();

// **======================================================
// **======================================================

// ** Scroll to Top Button
scrollToTopBtn.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// **======================================================
// **======================================================

// ** Sidebar Toggle

// open settings sidebar
settingsToggle.addEventListener("click", function () {
  // open settings sidebar
  settingsSidebar.classList.remove("translate-x-full");

  // move the icon with it
  settingsToggle.style.right = "320px";
});

// close settings sidebar
closeSettings.addEventListener("click", function () {
  // close settings sidebar
  settingsSidebar.classList.add("translate-x-full");

  // move the icon back to its original position
  settingsToggle.style.right = "0px";
});

// ////////////////////

// ************** Fonts Settings

// get saved font from localStorage
// if no saved font exists use tajawal as default
var currentFont = localStorage.getItem("portfolio-font") || "tajawal";

// calling function applyFont to apply the saved font or the default font to the page when it loads
applyFont(currentFont);

// loop through all font buttons
for (var i = 0; i < fontOptions.length; i++) {
  fontOptions[i].addEventListener("click", function () {
    // get selected font name
    var selectedFont = this.getAttribute("data-font");
    // var selectedFont = e.currentTarget.getAttribute("data-font"); // if i use this then i have to put e as a parameter in the function

    // apply selected font
    applyFont(selectedFont);

    // save selected font
    localStorage.setItem("portfolio-font", selectedFont);
  });
}

// ** Function Apply Font
function applyFont(fontName) {
  // remove previous font classes
  document.body.classList.remove(
    "font-tajawal",
    "font-cairo",
    "font-alexandria",
  );

  // add selected font class
  document.body.classList.add("font-" + fontName);

  // remove active state from all buttons
  for (var i = 0; i < fontOptions.length; i++) {
    fontOptions[i].classList.remove(
      "active",
      "border-primary",
      "bg-primary/10",
    );

    // accessibility
    fontOptions[i].setAttribute("aria-checked", "false");
  }

  // select active button based on selected font name
  var activeBtn = document.querySelector(`[data-font="${fontName}"]`);

  // check if button exists
  if (activeBtn) {
    // add active styles
    activeBtn.classList.add("active", "border-primary", "bg-primary/10");

    // accessibility
    activeBtn.setAttribute("aria-checked", "true");
  }
}

// ////////////////////

// *************** colors theme settings

// // grid container
// var themeColorsGrid = document.getElementById("theme-colors-grid");

// array of objects
var themeColors = [
  {
    name: "purple",
    primary: "#6366f1",
    secondary: "#8b5cf6",
    accent: "#ec4899",
  },

  {
    name: "blue",
    primary: "#0ea5e9",
    secondary: "#2563eb",
    accent: "#38bdf8",
  },

  {
    name: "green",
    primary: "#10b981",
    secondary: "#059669",
    accent: "#34d399",
  },

  {
    name: "orange",
    primary: "#f97316",
    secondary: "#ea580c",
    accent: "#fb923c",
  },

  {
    name: "red",
    primary: "#ef4444",
    secondary: "#dc2626",
    accent: "#f87171",
  },
];

// create color buttons
for (var i = 0; i < themeColors.length; i++) {
  var color = themeColors[i];

  // create button
  var btn = document.createElement("button");

  // add button to grid
  themeColorsGrid.appendChild(btn);

  // styles
  btn.className =
    "theme-color-btn relative w-14 h-14 rounded-full border-2 border-slate-700 transition-all duration-300 hover:scale-110";

  // background color - gradient color
  //
  btn.style.background = `linear-gradient(
  135deg,
  ${color.primary},
  ${color.accent}
)`;

  // save color name in data attribute
  btn.setAttribute("data-theme", color.name);

  // click event
  btn.addEventListener("click", function (e) {
    var selectedTheme = e.target.getAttribute("data-theme");

    applyTheme(selectedTheme);
  });
}

// ==========================
// ** apply theme function
function applyTheme(themeName) {
  // find selected theme object
  var selectedTheme;

  for (var i = 0; i < themeColors.length; i++) {
    if (themeColors[i].name === themeName) {
      selectedTheme = themeColors[i];
    }
  }

  // change css variables
  document.documentElement.style.setProperty(
    "--color-primary",
    selectedTheme.primary,
  );

  document.documentElement.style.setProperty(
    "--color-secondary",
    selectedTheme.secondary,
  );

  document.documentElement.style.setProperty(
    "--color-accent",
    selectedTheme.accent,
  );

  // save theme
  localStorage.setItem("theme-color", themeName);

  // update active button
  updateActiveColor(themeName);
}

// ** active button styles
function updateActiveColor(themeName) {
  var allBtns = themeColorsGrid.querySelectorAll("button");

  // remove active styles
  for (var i = 0; i < allBtns.length; i++) {
    allBtns[i].classList.remove("scale-110");

    allBtns[i].style.boxShadow = "none";
  }

  // get selected theme
  var selectedTheme;

  for (var i = 0; i < themeColors.length; i++) {
    if (themeColors[i].name === themeName) {
      selectedTheme = themeColors[i];
    }
  }

  // active button
  var activeBtn = document.querySelector(`[data-theme="${themeName}"]`);

  if (activeBtn) {
    activeBtn.classList.add("scale-110");

    activeBtn.style.boxShadow = `
      0 0 0 3px #0f172a,
      0 0 0 5px ${selectedTheme.primary}
    `;
  }
}

// load saved theme
var savedTheme = localStorage.getItem("theme-color");

// if no saved theme, use purple as default
if (!savedTheme) {
  savedTheme = "purple";
}

// apply saved theme
applyTheme(savedTheme);

// ////////////////////
// ***************reset all settings button

// var resetBtn = document.getElementById("reset-settings");

resetBtn.addEventListener("click", function () {
  // RESET THEME COLOR
  applyTheme("purple");

  // RESET FONT
  applyFont("tajawal");

  localStorage.setItem("portfolio-font", "tajawal");

  // RESET DARK MODE
  htmlElement.classList.add("dark");

  localStorage.setItem("theme", "dark");


  // close sidebar
  settingsSidebar.classList.add("translate-x-full");

  // move the icon back to its original position
  settingsToggle.style.right = "0px";
});

// **======================================================
// **======================================================

// ** scroll spy for nav links

// all nav links in the header
var navLinks = document.querySelectorAll(".nav-links a");

// all sections in the page
var sections = document.querySelectorAll("section");


// ** function to remove active class from all nav links 
function removeActiveClass() {

  for (var i = 0; i < navLinks.length; i++) {

    navLinks[i].classList.remove("active");

  }

}


// ** function to set active link
function setActiveLink() {

  var currentSection = "";

  // if at the top of the page
  if (window.scrollY < 200) {

    currentSection = "hero-section";

  }

  // loop through all sections
  for (var i = 0; i < sections.length; i++) {

    var sectionTop = sections[i].offsetTop - 200;

    var sectionHeight = sections[i].offsetHeight;

    if (

      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight

    ) {

      currentSection = sections[i].getAttribute("id");

    }

  }

  // remove active class from all nav links
  removeActiveClass();

  // get the required link
  var activeLink = document.querySelector(
    `.nav-links a[href="#${currentSection}"]`
  );

  // if exists, add active class
  if (activeLink) {

    activeLink.classList.add("active");

  }

}


// ** function to set active link on page load اول ما الصفحة تفتح
setActiveLink();


// ** event listener to set active link through scroll أثناء الاسكرول
window.addEventListener("scroll", function () {

  setActiveLink();

});

// *=============================================

// ?? ALL EventListeners

// ** Theme Toggle
// click eventListener for theme toggle button
themeToggleBtn.addEventListener("click", function () {
  // toggle dark class
  htmlElement.classList.toggle("dark");

  // check if dark mode is active
  if (htmlElement.classList.contains("dark")) {
    // save dark in localStorage
    localStorage.setItem("theme", "dark");
  } else {
    // save light in localStorage
    localStorage.setItem("theme", "light");
  }
});

// ** Testimonials : Carousel
// next button
nextBtn.addEventListener("click", function () {
  slide(1);
});

// prev button
prevBtn.addEventListener("click", function () {
  slide(-1);
});
