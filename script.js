(function locomotiveJS() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
})();
(function navAnimation() {
  const nav = document.querySelector("nav");

  nav.addEventListener("mouseenter", () => {
    var tl = gsap.timeline();
    tl.to("#nav-bottom", {
      height: "18vh",
    });
    tl.to(".nav-part2 h5", {
      display: "block",
      opacity: 1,
      duration: 0.1,
    });
    tl.from(".nav-part2 h5 span", {
      y: 25,
      stagger: { amount: 0.3 },
    });
  });

  nav.addEventListener("mouseleave", () => {
    var tl = gsap.timeline();
    tl.to(".nav-part2 h5", {
      display: "none",
      opacity: 0,
      duration: 0.2,
    });
    tl.to("#nav-bottom", {
      height: "0px",
      duration: 0.3,
    });
  });
  document.querySelector("#main").addEventListener("mousemove", () => {
    var tl = gsap.timeline();
    tl.to(".nav-part2 h5", {
      display: "none",
      opacity: 0,
      duration: 0.2,
    });
    tl.to("#nav-bottom", {
      height: "0px",
      duration: 0.3,
    });
  });
})();
(function page2Animation() {
  const page2Right = document.querySelector("#page2-right");
  const rightElem = document.querySelectorAll(".right-elem");

  rightElem.forEach((e) => {
    e.addEventListener("mouseenter", (dets) => {
      gsap.to(e.childNodes[3], {
        opacity: 1,
        scale: 1,
      });
    });
    e.addEventListener("mouseleave", () => {
      gsap.to(e.childNodes[3], {
        opacity: 0,
        scale: 0,
      });
    });
    e.addEventListener("mousemove", (dets) => {
      gsap.to(e.childNodes[3], {
        x: dets.x - e.getBoundingClientRect().x - 50,
        y: dets.y - e.getBoundingClientRect().y - 140,
      });
    });
  });
})();
(function page3Animation() {
  const icon = document.querySelector("#icon");
  icon.addEventListener("mouseenter", () => {
    gsap.to("#icon-text", {
      opacity: 1,
      y: "0%",
      scale: 1,
      duration: 0.2,
    });
  });
  icon.addEventListener("mouseleave", () => {
    gsap.to("#icon-text", {
      opacity: 0,
      scale: 0.8,
      y: "15%",
      duration: 0.2,
    });
  });
  const video = document.querySelector("#page3-video");
  icon.addEventListener("click", () => {
    video.play();
    gsap.to(video, {
      scaleX: 1,
      opacity: 1,
      scaleY: 1,
      borderRadius: "0px",
      z: 999,
    });
    gsap.from(video, {
      transform: "translateY(80%)",
    });
  });

  video.addEventListener("click", () => {
    video.load();
    gsap.to(video, {
      scaleX: 0.7,
      opacity: 0,
      scaleY: 0,
      borderRadius: "30px",
    });
  });
})();
(function page4Animation() {
  const page4Right = document.querySelectorAll(".sec-right");

  page4Right.forEach((e) => {
    const crsr = e.childNodes[5];
    e.addEventListener("mouseenter", () => {
      e.childNodes[3].style.opacity = 1;
      e.childNodes[3].play();
    });
    e.addEventListener("mouseleave", () => {
      e.childNodes[3].style.opacity = 0;
      e.childNodes[3].load();
      gsap.to(crsr, {
        scale: 0,
        opacity: 0.75,
      });
    });

    e.addEventListener("mousemove", (dets) => {
      const crsrX = dets.x - e.getBoundingClientRect().x - 100;
      const crsrY = dets.y - e.getBoundingClientRect().y - 100;
      gsap.to(crsr, {
        x: crsrX,
        y: crsrY,
        scale: 1,
        opacity: 1,
      });
    });
  });
})();
(function page5Animation() {
  const Containers = document.querySelectorAll(".page5-main");
  Containers.forEach((e) => {
    const crsr = e.childNodes[1];
    crsr.addEventListener("click", () => {
      if (e.childNodes[3].open == true) {
        e.childNodes[3].open = false;
        e.childNodes[1].childNodes[1].textContent = "Open";
      } else {
        e.childNodes[3].open = true;
        e.childNodes[1].childNodes[1].textContent = "Close";
      }
    });
    e.addEventListener("mousemove", (dets) => {
      const crsrX = dets.x - e.getBoundingClientRect().x - 50;
      const crsrY = dets.y - e.getBoundingClientRect().y - 70;
      gsap.to(crsr, {
        opacity: 1,
        scale: 1,
        x: crsrX,
        y: crsrY,
      });
    });
    e.addEventListener("mouseleave", () => {
      gsap.to(crsr, {
        opacity: 0,
        scale: 0,
      });
    });
  });
})();
(function page6Animation() {
  gsap.from("#btm6-part2 h4,#btm6-part4 h4,#btm6-part3 h4", {
    x: 0,
    duration: 1,
    ease: "Power 4",
    scrollTrigger: {
      scroller: "#main",
      trigger: "#btm6-part2",
      start: "top 80%",
      end: "top 20%",
      scrub: true,
    },
  });
})();
(function loadingAnimation(params) {
  var tl = gsap.timeline();
  tl.from("#page1", {
    opacity: 0,
    duration: 0.3,
  });
  tl.from("#page1", {
    transform: "scaleX(0.7) scaleY(0.2) translateY(80%)",
    borderRadius: "150px",
    duration: 1,
    ease: "power2.out",
  });
  tl.from("nav", {
    opacity: 0,
    delay: 0.1,
  });

  tl.from("#page1 h1 ,#page1 p , #page1 div", {
    opacity: 0,
    duration: 0.5,
    ease: "power2.out",
  });
})();
