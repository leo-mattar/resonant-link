gsap.registerPlugin(ScrollTrigger, CustomEase);

gsap.config({
  nullTargetWarn: false,
  trialWarn: false
});

// Reload at the top
$(window).on("beforeunload", function () {
  history.scrollRestoration = "manual";
});

// --- LENIS
window.lenis = new Lenis();

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// ScrollTo link in another page
// let urlHash = window.location.href.split("#")[1];
// let scrollElem = document.querySelector("#" + urlHash);

// if (urlHash && scrollElem) {
//   gsap.to(smoother, {
//     scrollTop: smoother.offset(scrollElem, "top top"),
//     ease: "power1.inOut",
//     duration: 1,
//     delay: 0.3
//   });
// }

// Testimonials type size
if (window.innerWidth >= 992) {
  let elements = document.getElementsByClassName("is-te");

  for (let i = 0; i < elements.length; i++) {
    let element = elements[i];
    let text = element.innerText || element.textContent;

    if (text.length >= 220) {
      element.classList.add("is-small");
    }
  }
}

// Returns the current year
let currentYear = document.querySelector("[current-year]");
if (currentYear) {
  currentYear.innerHTML = new Date().getFullYear();
}

// Fade
function fade() {
  gsap.set("[fade]", { opacity: 0, y: "4em" });

  ScrollTrigger.batch("[fade]", {
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.1
      })
  });
}

function line() {
  // Draw line
  gsap.set("[line]", { opacity: 1, scaleX: 0, transformOrigin: "top left" });

  ScrollTrigger.batch("[line]", {
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, {
        scaleX: 1,
        delay: 0.1,
        duration: 2,
        ease: "power3.out",
        stagger: 0.1
      })
  });
}

// Decorations
function decorations() {
  gsap.set("[decoration]", { xPercent: "110" });

  ScrollTrigger.batch("[decoration]", {
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, {
        opacity: 1,
        xPercent: 0,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.1
      })
  });
}

// Image reveal
function imageReveal() {
  gsap.set("[image-reveal]", {
    clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)"
  });

  ScrollTrigger.batch("[image-reveal]", {
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        delay: 0.1,
        duration: 1.6,
        ease: "expo.out",
        stagger: 0.1
      })
  });
}

// Plus
function plus() {
  gsap.set("[plus]", { xPercent: "110", rotation: -135 });

  ScrollTrigger.batch("[plus]", {
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, {
        opacity: 1,
        xPercent: 0,
        rotation: 0,
        duration: 1.5,
        ease: "power3.out",
        stagger: 0.2
      })
  });
}

function domPlacement() {
  $(".c-partner.view").appendTo(".o-grid.partners");
  $(".c-partner.view-xxl").appendTo(".o-grid.partners-xxl");
}

function domPlacementMobile() {
  $(".c-partner.view").appendTo(".o-grid.partners");
}

// Recalculate height
// $("[no-transition]").on("click", function () {
//   setTimeout(function () {
//     ScrollTrigger.refresh();
//   }, 50);
// });

// Main button hover
$(".c-btn.is-main").each(function (index) {
  let mainText = $(this).find(".is-1").text();
  $(this).find(".is-2").text(mainText);
});

// Typesplit
let typeSplit = new SplitType(
  ".t-label-4.is-1, .t-label-4.is-2, .t-label-2.is-1, .t-label-2.is-2, [split-text]",
  {
    types: "words, chars, lines",
    tagName: "span"
  }
);

function homeHeroPlay() {
  let tl = gsap.timeline({ paused: true });

  // Vimeo play
  $(".c-reel-pause-wrap").on("click", function () {
    tl.restart();
    $(this).toggleClass("is-active");
    $(".c-reel-play-wrap").toggleClass("is-active");
  });

  // Vimeo pause
  $(".c-reel-play-wrap").on("click", function () {
    tl.reverse();
    $(this).toggleClass("is-active");
    $(".c-reel-pause-wrap").toggleClass("is-active");
  });
}

function pageLoad() {
  // Load
  $(".c-reel-pause-wrap").click();
  $(".c-load").css("display", "flex");
  // smoother.paused(true);
  lenis.stop();
  $(".c-body").addClass("no-scroll");

  let counter = {
    value: 0
  };

  function endLoader() {
    $(".c-body").css("background-color", "#fafbff");
    let tl = gsap.timeline({
      onStart: () => {
        $(".c-reel-play-wrap").click();
      }
    });

    tl.fromTo(
      ".c-load",
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
      },
      {
        clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
        duration: 1.2,
        ease: "power2.out"
      }
    );

    setTimeout(function () {
      // smoother.paused(false);
      lenis.start();
      $(".c-body").removeClass("no-scroll");
    }, 1200);
  }

  let loaderDuration = 4;
  let customEase =
    "M0,0,C0,0,0.13,0.34,0.238,0.442,0.305,0.506,0.322,0.514,0.396,0.54,0.478,0.568,0.468,0.56,0.522,0.584,0.572,0.606,0.61,0.719,0.714,0.826,0.798,0.912,1,1,1,1";

  // If not a first time visit in this tab
  if (sessionStorage.getItem("visited") !== null) {
    loaderDuration = 3;
    counter = {
      value: 60
    };
  }
  sessionStorage.setItem("visited", "true");

  function textProgress() {
    let progress = Math.round(counter.value);
    $(".t-load").text(progress);
  }

  let load = gsap.timeline({ onComplete: endLoader });
  load.to(counter, {
    onUpdate: textProgress,
    value: 100,
    duration: loaderDuration,
    ease: CustomEase.create("custom", customEase)
  });
  load.to(
    ".c-load-progress",
    {
      width: "100%",
      duration: loaderDuration,
      ease: CustomEase.create("custom", customEase)
    },
    0
  );
  load.to(
    ".percentage",
    {
      opacity: 1,
      duration: 0.4
    },
    0.4
  );
  load.to(".o-wrapper", { opacity: 1, duration: 0, delay: 0.1 }, ">0.2");
  load.to(".c-logo-link", { opacity: 1, duration: 0, delay: 0.1 }, 0);
  load.to(".c-header", { opacity: 1, duration: 0, delay: 0.1 }, 0);
}

function pageLoadMobile() {
  // Load
  $(".c-load").css("display", "flex");
  // smoother.paused(true);
  lenis.stop();
  $(".c-body").addClass("no-scroll");

  let counter = {
    value: 45
  };

  function endLoader() {
    $(".c-body").css("background-color", "#fafbff");
    let tl = gsap.timeline();

    tl.fromTo(
      ".c-load",
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
      },
      {
        clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
        duration: 1.2,
        ease: "power2.out"
      }
    );

    setTimeout(function () {
      // smoother.paused(false);
      lenis.start();
      $(".c-body").removeClass("no-scroll");
    }, 1200);
  }

  let loaderDuration = 4;
  let customEase =
    "M0,0,C0,0,0.13,0.34,0.238,0.442,0.305,0.506,0.322,0.514,0.396,0.54,0.478,0.568,0.468,0.56,0.522,0.584,0.572,0.606,0.61,0.719,0.714,0.826,0.798,0.912,1,1,1,1";

  // If not a first time visit in this tab
  if (sessionStorage.getItem("visited") !== null) {
    loaderDuration = 3;
    counter = {
      value: 45
    };
  }
  sessionStorage.setItem("visited", "true");

  function textProgress() {
    let progress = Math.round(counter.value);
    $(".t-load").text(progress);
  }

  let load = gsap.timeline({ onComplete: endLoader });
  load.to(counter, {
    onUpdate: textProgress,
    value: 100,
    duration: loaderDuration,
    ease: CustomEase.create("custom", customEase)
  });
  load.to(
    ".c-load-progress",
    {
      width: "100%",
      duration: loaderDuration,
      ease: CustomEase.create("custom", customEase)
    },
    0
  );
  load.to(
    ".percentage",
    {
      opacity: 1,
      duration: 0.4
    },
    0.4
  );
  load.to(".o-wrapper", { opacity: 1, duration: 0, delay: 0.1 }, ">0.2");
  load.to(".c-logo-link", { opacity: 1, duration: 0, delay: 0.1 }, 0);
  load.to(".c-header", { opacity: 1, duration: 0, delay: 0.1 }, 0);
}

// Mega menu desktop
function meMenu() {
  // Mega menu
  let megaMenu = gsap.timeline({ paused: true });
  megaMenu.set(".c-menu", { display: "flex" });
  megaMenu.fromTo(
    ".c-menu",
    {
      clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)"
    },
    {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 1,
      ease: "power3.inOut"
    }
  );
  megaMenu.from(
    ".c-menu-close",
    {
      rotation: 45,
      opacity: 0,
      duration: 1.2,
      ease: "power2.inOut"
    },
    0
  );

  megaMenu.from(
    ".c-menu-links .line",
    {
      yPercent: 120,
      duration: 0.6,
      ease: "power2.inOut",
      stagger: 0.08
    },
    0.3
  );

  megaMenu.from(
    ".c-menu-sub-links .line",
    {
      yPercent: 120,
      duration: 0.6,
      ease: "power2.inOut",
      stagger: 0.08
    },
    "<0.3"
  );
  megaMenu.from(
    ".c-btn.is-menu",
    {
      yPercent: 120,
      duration: 0.6,
      ease: "power2.inOut"
    },
    "<0"
  );

  $(".c-nav-btn").on("click", function () {
    if (!megaMenu.isActive()) {
      // smoother.paused(true);
      lenis.stop();
      $(".c-body").addClass("no-scroll");
      $(this).addClass("is-open");
      megaMenu.restart();
    }
  });

  $(".c-menu-close").on("click", function () {
    if (!megaMenu.isActive()) {
      // smoother.paused(false);
      lenis.start();
      $(".c-body").removeClass("no-scroll");
      $(this).removeClass("is-open");
      megaMenu.reverse();
    }
  });
}
meMenu();

function sectionDark() {
  // Nav header color change on dark background
  $("[is-dark]").each(function (index) {
    ScrollTrigger.create({
      trigger: $(this),
      start: "top 10%",
      end: "bottom 10%",
      onEnter: () => {
        $(".c-header-nav").addClass("is-light");
      },
      onLeave: () => {
        $(".c-header-nav").removeClass("is-light");
      },
      onEnterBack: () => {
        $(".c-header-nav").addClass("is-light");
      },
      onLeaveBack: () => {
        $(".c-header-nav").removeClass("is-light");
      }
    });
  });
}
sectionDark();

function navCarbon() {
  // Nav header color change on dark background
  $("[is-carbon]").each(function (index) {
    ScrollTrigger.create({
      trigger: $(this),
      start: "top 10%",
      end: "bottom 10%",
      onEnter: () => {
        $(".c-header-nav").addClass("is-carbon");
      },
      onLeave: () => {
        $(".c-header-nav").removeClass("is-carbon");
      },
      onEnterBack: () => {
        $(".c-header-nav").addClass("is-carbon");
      },
      onLeaveBack: () => {
        $(".c-header-nav").removeClass("is-carbon");
      }
    });
  });
}
navCarbon();

function logoWhite() {
  // Logo light
  $("[logo-light]").each(function (index) {
    ScrollTrigger.create({
      trigger: $(this),
      start: "top 10%",
      end: "bottom 10%",
      onEnter: () => {
        $(".c-logo-link").addClass("is-light");
      },
      onLeave: () => {
        $(".c-logo-link").removeClass("is-light");
      },
      onEnterBack: () => {
        $(".c-logo-link").addClass("is-light");
      },
      onLeaveBack: () => {
        $(".c-logo-link").removeClass("is-light");
      }
    });
  });
}
logoWhite();

function logoDark() {
  // Logo Dark
  $("[logo-dark]").each(function (index) {
    ScrollTrigger.create({
      trigger: $(this),
      start: "top 10%",
      end: "bottom 10%",
      onEnter: () => {
        $(".c-logo-link").addClass("is-dark");
      },
      onLeave: () => {
        $(".c-logo-link").removeClass("is-dark");
      },
      onEnterBack: () => {
        $(".c-logo-link").addClass("is-dark");
      },
      onLeaveBack: () => {
        $(".c-logo-link").removeClass("is-dark");
      }
    });
  });
}
logoDark();

function footerShape() {
  // Footer shape animation
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".c-section.footer",
      start: "top center"
    }
  });

  tl.fromTo(
    ".footer-shape",
    {
      clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)"
    },
    {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 1.4,
      ease: "power3.out"
    }
  );
}

function socialHover() {
  // Social footer links hover
  $(".c-social-item").each(function (index) {
    let tl = gsap.timeline({ paused: true });

    tl.to($(this), {
      backgroundColor: "#141519",
      color: "#fafbff",
      duration: 0.4,
      ease: "power2.inOut"
    });

    $(this).on("mouseenter", function () {
      tl.restart();
    });

    $(this).on("mouseleave", function () {
      tl.reverse();
    });
  });
}

function socialMenuHover() {
  // Social menu links hover
  $(".c-social-menu-item").each(function (index) {
    let tl = gsap.timeline({ paused: true });

    tl.to($(this), {
      backgroundColor: "#fafbff",
      color: "#141519",
      duration: 0.4,
      ease: "power2.inOut"
    });

    $(this).on("mouseenter", function () {
      tl.restart();
    });

    $(this).on("mouseleave", function () {
      tl.reverse();
    });
  });
}

function mobileHeight() {
  let vh = window.innerHeight * 0.01;

  document.documentElement.style.setProperty("--vh", `${vh}px`);

  window.addEventListener("resize", () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  });
}

function mainButtonHover() {
  $(".c-btn.is-main").each(function (index) {
    let listOne = $(this).find(".t-label-4.is-1 .char");
    let listTwo = $(this).find(".t-label-4.is-2 .char");

    let tl = gsap.timeline({
      paused: true,
      defaults: { duration: 0.6, ease: "power4.inOut" }
    });
    tl.to(listOne, { y: "-100%", stagger: { each: 0.03 } });
    tl.from(listTwo, { y: "100%", stagger: { each: 0.03 } }, 0.1);

    $(this).on("mouseenter", function () {
      if (!tl.isActive()) {
        tl.restart();
      }
    });
  });
}

function bookHover() {
  $(".c-demo").each(function (index) {
    // let listOne = $(this).find(".t-label-2.is-1 .char");
    let listOne = $(this).find(".t-label-2.is-1 .char, .t-label-4.is-1 .char");
    let listTwo = $(this).find(".t-label-2.is-2 .char, .t-label-4.is-2 .char");

    let tl = gsap.timeline({
      paused: true,
      defaults: { duration: 0.6, ease: "power4.inOut" }
    });
    tl.to(listOne, { y: "-100%", stagger: { each: 0.03 } });
    tl.from(listTwo, { y: "100%", stagger: { each: 0.03 } }, 0.1);

    $(this).on("mouseenter", function () {
      if (!tl.isActive()) {
        tl.restart();
      }
    });
  });
}

function mobilePauseContent() {
  $(".sm-pause-txt").appendTo(".c-pause-md-sub-wrap");
  $(".c-hm-pause-mask").appendTo(".c-pause-md-txt-wrap");
}

function approachHero() {
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".c-section.ap-hero",
      start: "top top",
      end: "bottom bottom",
      pin: ".c-ap-hero",
      pinSpacing: false,
      scrub: 2
    }
  });

  tl.fromTo(
    ".c-img-contain.ap-hero",
    {
      width: "50%",
      height: "85vh",
      borderRadius: "0.5em",
      y: "10vh"
    },
    {
      width: "100%",
      height: "100vh",
      borderRadius: 0,
      y: 0
    }
  );
}

function soTextMobile() {
  // Solution pages combine content titles on mobile
  let soTextOne = $(".so-text-1").text();
  let soTextTwo = $(".so-text-2").text();
  $(".so-text-result").text(soTextOne + " " + soTextTwo);
}

// Resources - news counter
$(".c-news-num-counter").each(function (index) {
  if ($(".c-news-num-counter").length <= 9) {
    $(".more-news-num").text("0" + (index + 1));
  } else {
    $(".more-news-num").text(index + 1);
  }
});

// Resources - newsroom total counter
$(".c-newsroom-total-item").each(function (index) {
  if ($(".c-newsroom-total-item").length <= 9) {
    $(".newsroom-num").text("0" + (index + 1));
  } else {
    $(".newsroom-num").text(index + 1);
  }
});

// Insights - total counter
$(".c-card-item-re").each(function (index) {
  if ($(".c-card-item-re").length <= 9) {
    $(".insights-num").text("0" + (index + 1));
  } else {
    $(".insights-num").text(index + 1);
  }
});

// Resources - insight cards stack
function insightStack() {
  let cardThree = $(".c-card-item:nth-child(3)");
  let cardFour = $(".c-card-item:nth-child(4)");
  let cardFive = $(".c-card-item:nth-child(5)");
  let cardSix = $(".c-card-item:nth-child(6)");

  $(".c-card-item").each(function (index) {
    ScrollTrigger.create({
      trigger: $(this),
      start: "-100 top",
      endTrigger: ".o-grid.down",
      end: "bottom 70%",
      pin: true,
      pinSpacing: false
    });

    gsap.to(cardThree, { yPercent: 4 });
    gsap.to(cardFour, { yPercent: 4 });
    gsap.to(cardFive, { yPercent: 8 });
    gsap.to(cardSix, { yPercent: 8 });
  });
}

// About - values card
function valuesCard() {
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".o-grid.values",
      start: "top bottom",
      scrub: 3,
      end: "bottom bottom"
    }
  });

  tl.fromTo(".c-card.values.is-1", { y: "15em" }, { y: "0em" });
  tl.fromTo(".c-card.values.is-2", { y: "30em" }, { y: "0em" }, 0.1);
  tl.fromTo(".c-card.values.is-3", { y: "45em" }, { y: "0em" }, 0.1);
}

// Resources - latest news
function latestNews() {
  $("[news-parallax]").each(function (index) {
    gsap.from($(this), {
      // opacity: 0,
      y: "12em",
      stagger: { each: 2, from: "end", ease: "none", grid: "auto" },
      scrollTrigger: {
        trigger: $(this),
        end: "top center",
        scrub: 2
      }
    });
  });
}

// Our Approach - Circles animation
function circle() {
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".c-section.ap-intro",
      start: "top bottom",
      end: "bottom bottom",
      scrub: 2
    }
  });

  tl.from(".c-circle.is-1", { height: "100%" }, 0);
  tl.from(".c-circle.is-2", { height: "100%", width: "55em" }, 0);
  tl.from(".c-circle.is-3", { height: "100%", width: "55em" }, 0);
  tl.from(".c-circle.is-4", { height: "100%", width: "55em" }, 0);
  tl.from(".c-circle.is-5", { height: "100%", width: "55em" }, 0);
  tl.from(".c-circle.is-6", { height: "100%", width: "55em" }, 0);
}

//  Parallax
function parallax() {
  $("[parallax]").each(function (index) {
    let tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: $(this),
        scrub: true
      }
    });
    tl.fromTo($(this).find(".c-img"), { yPercent: -5 }, { yPercent: 5 });
  });
}

function teamBio() {
  // Team modal
  $(".c-bio-item").each(function (index) {
    let teamModal = gsap.timeline({ paused: true });
    teamModal.set(".c-bio-panel", { display: "flex" });
    teamModal.set(".c-bio-overlay", { display: "flex" });

    teamModal.fromTo(
      $(this).find(".c-bio-panel"),
      {
        clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)"
      },
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 0.6,
        ease: "power3.inOut"
      }
    );

    teamModal.from(
      $(this).find(".c-bio-overlay"),
      {
        opacity: 0,
        duration: 0.6,
        ease: "power3.inOut"
      },
      0
    );

    $(this).on("click", function () {
      $(this).toggleClass("is-active");
      $(this).find(".c-bio-overlay").appendTo(".c-body");
      $(this).find(".c-bio-panel").appendTo(".c-body");
      // smoother.paused(true);
      lenis.stop();
      $(".c-body").addClass("no-scroll");
      teamModal.restart();
    });

    $(".c-bio-close").on("click", function () {
      $(this).toggleClass("is-active");
      // smoother.paused(false);
      lenis.start();
      teamModal.reverse();
      $(this).find(".c-bio-overlay").appendTo($(this));
      $(this).find(".c-bio-panel").appendTo($(this));
      $(".c-body").removeClass("no-scroll");
    });

    $(".c-bio-overlay").on("click", function () {
      $(this).toggleClass("is-active");
      // smoother.paused(false);
      lenis.start();
      teamModal.reverse();
      $(this).find(".c-bio-overlay").appendTo($(this));
      $(this).find(".c-bio-panel").appendTo($(this));
      $(".c-body").removeClass("no-scroll");
    });
  });
}
teamBio();

// Page transition
function pageTransition() {
  let transitionTrigger = $(".transition-trigger");
  let introDurationMS = 150;
  let exitDurationMS = 150;
  let excludedClass = "no-transition";

  // On Page Load
  if (transitionTrigger.length > 0) {
    transitionTrigger.click();
    // smoother.paused(true);
    lenis.stop();
    $("body").addClass("no-scroll-transition");
    setTimeout(() => {
      // smoother.paused(false);
      lenis.start();
      $("body").removeClass("no-scroll-transition");
    }, introDurationMS);
  }
  // On Link Click
  $("a")
    .not("[no-transition]")
    .on("click", function (e) {
      if (
        $(this).prop("hostname") == window.location.host &&
        $(this).attr("href").indexOf("#") === -1 &&
        !$(this).hasClass(excludedClass) &&
        $(this).attr("target") !== "_blank" &&
        transitionTrigger.length > 0
      ) {
        e.preventDefault();
        // smoother.paused(true);
        lenis.stop();
        $("body").addClass("no-scroll-transition");
        let transitionURL = $(this).attr("href");
        transitionTrigger.click();
        setTimeout(function () {
          window.location = transitionURL;
        }, exitDurationMS);
      }
    });

  // On Back Button Tap
  window.onpageshow = function (event) {
    if (event.persisted) {
      window.location.reload();
    }
  };
  // Hide Transition on Window Width Resize
  setTimeout(() => {
    $(window).on("resize", function () {
      setTimeout(() => {
        $(".transition").css("display", "none");
        // smoother.paused(false);
        lenis.start();
      }, 50);
    });
  }, introDurationMS);
}

// Vertical decoration
function verticalDecoration() {
  ScrollTrigger.batch(".c-ornement-icon rect", {
    once: true,
    onEnter: (batch) =>
      gsap.from(batch, {
        height: 0,
        duration: 1,
        ease: "power3.out",
        stagger: { each: 0.1, from: "start", grid: "auto" }
        // stagger: 0.15
      })
  });
}
verticalDecoration();

let libraryPage = document.querySelector("[data-page='library']");
let resourceCenter = document.querySelector("[data-page='resource-center']");

function industriesTypesCMSLink() {
  let host = window.location.host;
  let industryLink = document.querySelectorAll("[industry-link]");

  industryLink.forEach(link => {
    let currentLink = link.href;
    let url = new URL(currentLink);
    let searchParams = url.search;

    // Construct the new URL
    let newLink = `https://${host}/library${searchParams}`;

    // Update the link's href with the new link
    link.href = newLink;
  });
}

// --- LIBRARY PAGE
function library() {

  // Add "All" button to the list
  let typeAllButton = document.querySelector("[rc-type-all-btn]");
  let typeList = document.querySelector("[rc-type-list]");
  let industryAllButton = document.querySelector("[rc-industry-all-btn]");
  let industryList = document.querySelector("[rc-industry-list]");

  typeList.insertBefore(typeAllButton, typeList.firstChild);
  industryList.insertBefore(industryAllButton, industryList.firstChild);

  // Load more scroll position 
  let loadMoreButton = document.querySelector(".c-rc-pagination");
  loadMoreButton.addEventListener("click", function () {
    gsap.to(".o-page-wrapper", { opacity: 0, duration: 0.2 });
    gsap.delayedCall(0.3, () => {
      lenis.scrollTo(".c-section.library", {
        // lerp: 0.01,
        lock: true,
        duration: 0.01
      });
    });
    gsap.to(".o-page-wrapper", { opacity: 1, duration: 0.3, delay: 0.4 });
  });
}

function resourceCenterPage() {
  // Add "featured all" button to the list
  let featuredButton = document.querySelector("[rc-featured-btn]");
  let featuredList = document.querySelector("[featured-list]");

  if (!featuredButton) return;
  featuredList.insertBefore(featuredButton, featuredList.firstChild);
}

if (libraryPage) {
  library();
}

if (resourceCenter) {
  resourceCenterPage();
}

if (resourceCenter || libraryPage) {
  industriesTypesCMSLink();
}

// Form scroll to top after submission
$(".c-submit").on("click", function () {
  $(window).scrollTop(0);
});

// Industrial product rotatiom
function industrialHero() {
  let tl = gsap.timeline();

  tl.to(".c-img.so-industrial", {
    rotation: 12,
    duration: 9,
    ease: "power1.out"
  });
}

// --- CONTACT PAGE 
// Function to store the previous page title in local storage

// function storePreviousPageTitle() {

//   let originInput = document.querySelector("input[name='origin_page']");

//   let referrer = document.referrer;

//   // Check if referrer is not empty and is from the same origin
//   if (referrer && new URL(referrer).origin === window.location.origin) {
//     // Fetch the referrer page
//     fetch(referrer)
//       .then(response => response.text())
//       .then(html => {
//         // Create a temporary DOM element to parse the HTML
//         let parser = new DOMParser();
//         let doc = parser.parseFromString(html, 'text/html');

//         // Get the title of the previous page
//         let previousPageTitle = doc.querySelector('title').innerText;

//         // Store the title in local storage
//         localStorage.setItem('previousPageTitle', previousPageTitle);

//         originInput.value = previousPageTitle;
//       })
//       .catch(error => {
//         console.error('Error fetching the previous page:', error);
//       });
//   } else {
//     console.log('No referrer or referrer is from a different origin.');
//   }
// }

// storePreviousPageTitle();

function storePreviousPageTitle() {
  let originInput = document.querySelector("input[name='origin_page']");
  let referrer = document.referrer;

  // Check if referrer is not empty and is from the same origin
  if (referrer && new URL(referrer).origin === window.location.origin) {
    // Fetch the referrer page
    fetch(referrer)
      .then(response => response.text())
      .then(html => {
        // Create a temporary DOM element to parse the HTML
        let parser = new DOMParser();
        let doc = parser.parseFromString(html, 'text/html');

        // Get the title of the previous page
        let previousPageTitle = doc.querySelector('title').innerText;

        // Store the title in local storage
        localStorage.setItem('previousPageTitle', previousPageTitle);

        console.log(previousPageTitle)

        // Set the input value if the input element exists
        if (originInput) {
          originInput.value = previousPageTitle;
        }
      })
      .catch(error => {
        console.error('Error fetching the previous page:', error);
      });
  } else {
    console.log('No referrer or referrer is from a different origin.');
  }
}

storePreviousPageTitle();

// --- PRODUCTS NUM
let products = document.querySelectorAll(".c-product");

function productsNum() {
  products.forEach((product, index) => {
    let counter = product.querySelector("[product-num]");

    counter.textContent = 0 + `${index + 1}`;
  });
}

if (products) {
  productsNum();
}

// PT Signature
const pprtgr = [
  'color: #F2F3F3',
  'background: #080808',
  'font-size: 12px',
  'padding-left: 10px',
  'line-height: 2',
  'border-left: 5px solid #ff3c31',
].join(';');
console.info(`

%cWebsite by Paper Tiger${' '}
www.papertiger.com${'     '}

`, pprtgr);

// Matchmedia desktop
let mm = gsap.matchMedia();

mm.add("(min-width: 992px)", () => {
  fade();
  line();
  imageReveal();
  footerShape();
  socialHover();
  socialMenuHover();
  mainButtonHover();
  bookHover();
  domPlacement();
  decorations();
  plus();
  approachHero();
  pageTransition();
  parallax();
  insightStack();
  latestNews();
  industrialHero();
  return () => {
    //
  };
});

// Matchmedia tablet, landscape and mobile
mm.add("(max-width: 991px)", () => {
  // mobileHeight();
  domPlacementMobile();
  soTextMobile();
  pageTransition();
  return () => {
    //
  };
});
