(function () {
  var dialog = document.getElementById("lightbox");
  var dialogImg = document.getElementById("lightbox-img");
  var closeBtn = dialog && dialog.querySelector(".lightbox-close");
  if (!dialog || !dialogImg || !closeBtn) return;

  function openFor(img) {
    dialogImg.src = img.currentSrc || img.src;
    dialogImg.alt = img.alt || "";
    dialog.showModal();
    closeBtn.focus();
  }

  function closeLightbox() {
    if (dialog.open) dialog.close();
  }

  dialog.addEventListener("close", function () {
    dialogImg.removeAttribute("src");
    dialogImg.alt = "";
  });

  closeBtn.addEventListener("click", closeLightbox);

  dialog.addEventListener("click", function (event) {
    if (event.target === dialog) closeLightbox();
  });

  document.querySelectorAll("main img").forEach(function (img) {
    img.classList.add("zoomable");
    img.setAttribute("tabindex", "0");
    img.setAttribute("role", "button");
    img.setAttribute("aria-haspopup", "dialog");
    var label = img.alt ? img.alt + ". View full size" : "View full size";
    img.setAttribute("aria-label", label);

    img.addEventListener("click", function () {
      openFor(img);
    });
    img.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openFor(img);
      }
    });
  });
})();
