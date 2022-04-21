document.addEventListener("DOMContentLoaded", function (event) {
  const expandNavbar = (toggleId, navId, bodyId, headerId) => {
    const toggle = document.getElementById(toggleId),
      nav = document.getElementById(navId),
      bodypd = document.getElementById(bodyId),
      headerpd = document.getElementById(headerId);

    // Validate that all variables exist
    if (toggle && nav && bodypd && headerpd) {
      toggle.addEventListener("click", () => {
        // expand navbar
        nav.classList.toggle("expand");
        // add padding to body
        bodypd.classList.toggle("body-pd");
        // add padding to header
        headerpd.classList.toggle("body-pd");
      });
    }
  };

  expandNavbar("header-toggle", "nav-bar", "body-pd", "header");

  const filterSize = document.querySelectorAll(".btn-filter-size");
  function colorFilter() {
    if (filterSize) {
      filterSize.forEach((l) => l.classList.remove("active-filter"));
      this.classList.add("active-filter");
    }
  }
  filterSize.forEach((l) => l.addEventListener("click", colorFilter));

  const toggleHeader = document.getElementById("header-toggle");
  tempButton = true;
  function toggleHeaderFunc() {
    if (screen.width < 768) {
      if (tempButton) {
        toggleHeader.classList.add("toggle-header-small");
        tempButton = false;
      } else {
        toggleHeader.classList.remove("toggle-header-small");
        tempButton = true;
      }
    }
  }
  toggleHeader.addEventListener("click", toggleHeaderFunc);
});
