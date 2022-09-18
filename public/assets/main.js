// hello world ^-^
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("ReactModal__Overlay");
  const close = document.getElementById("close");
  const startButtons = document.getElementsByClassName("start");
  const scrollToTop = document.getElementById("scroll-top");

  scrollToTop.onclick = async () => {
    while (window.scrollY != 0) {
      window.scrollTo(0, window.scrollY - 24);
      await new Promise((r) => setTimeout(r, 10));
    }
  };
  close.onclick = () => {
    modal.style.display = "none";
  };
  for (let i = 0; i < startButtons.length; i++) {
    startButtons.item(i).onclick = () => {
      console.log(`item: ${startButtons.item(i)}; done`);
      modal.style.display = "flex";
    };
  }
});
