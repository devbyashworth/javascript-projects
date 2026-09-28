gsap.registerPlugin(ScrollTrigger);

const getRatio = (el) =>
  window.innerHeight / (window.innerHeight + el.offsetHeight);

const mm = gsap.matchMedia();

// Only run the scroll-linked parallax for people who haven't asked for
// reduced motion; otherwise each .bg just keeps the static, centered
// position already set in the CSS.
mm.add("(prefers-reduced-motion: no-preference)", () => {
  gsap.utils.toArray("section").forEach((section, idx) => {
    const bg = section.querySelector(".bg");
    if (!bg) return;

    gsap.fromTo(
      bg,
      {
        backgroundPosition: idx
          ? `50% ${-window.innerHeight * getRatio(section)}px`
          : "50% 0px",
      },
      {
        backgroundPosition: () =>
          `50% ${window.innerHeight * (1 - getRatio(section))}px`,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: () => (idx ? "top bottom" : "top top"),
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
        },
      },
    );
  });
});
