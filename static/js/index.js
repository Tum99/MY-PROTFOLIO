// 1. Initialize Smooth Scrolling (Lenis)
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true
});

lenis.on('scroll', ScrollTrigger.update);

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// 2. Register GSAP Plugin (Only once)
gsap.registerPlugin(ScrollTrigger);

// 3. Section Transitions & Stack Replacement Effects
const sections = document.querySelectorAll('.transition-target');

sections.forEach((section, index) => {
  const bgColor = section.getAttribute('data-color');
  const textColor = section.getAttribute('data-text');

  // Core Theme Color Swapper Engine
  ScrollTrigger.create({
    trigger: section,
    start: "top 50%",
    end: "bottom 50%",
    onEnter: () => {
      gsap.to(".portfolio-container", { background: bgColor, color: textColor, duration: 0.8 });
    },
    onEnterBack: () => {
      gsap.to(".portfolio-container", { background: bgColor, color: textColor, duration: 0.8 });
    }
  });

  // Sticky Card Out-Fade Effect (Skips the final section layout)
  if (index === sections.length - 1) return;

  gsap.to(section, {
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: "bottom top",
      scrub: true,
      pin: true,          
      pinSpacing: false   
    },
    opacity: 0,
    scale: 0.96,
    ease: "none" // Set to none for smooth scrolling linking
  });
});

// 4. Reveal Titles On Scroll
document.querySelectorAll('.reveal-text').forEach((text) => {
  gsap.fromTo(text, 
    { y: 40, opacity: 0 }, 
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: text,
        start: "top 90%",
        toggleActions: "play none none none"
      }
    }
  );
});

// 5. Smart Multi-Directional Fade Engine (Handles both layouts)
document.querySelectorAll('.fade-in-up, .fade-in-directed').forEach((el) => {
  const direction = el.getAttribute('data-direction') || 'up'; 
  
  let initialX = 0;
  let initialY = 0;
  const distance = 40; 

  if (direction === 'up')    initialY = distance;
  if (direction === 'down')  initialY = -distance;
  if (direction === 'left')  initialX = -distance;
  if (direction === 'right') initialX = distance;

  gsap.fromTo(el,
    { 
      x: initialX,
      y: initialY, 
      opacity: 0 
    },
    {
      x: 0,
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none none"
      }
    }
  );
});

// Horizontal Slider Button Controller
const slider = document.querySelector('.project-slider');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

if (slider && prevBtn && nextBtn) {
  // Quantifies scroll distance based on the dynamic width of one project card
  const getScrollAmount = () => {
    const card = slider.querySelector('.project-card');
    return card ? card.offsetWidth + 40 : 400; // Card width + gap size
  };

  // Next Click Event
  nextBtn.addEventListener('click', () => {
    slider.scrollBy({
      left: getScrollAmount(),
      behavior: 'smooth' // Native smooth scrolling animation
    });
  });

  // Previous Click Event
  prevBtn.addEventListener('click', () => {
    slider.scrollBy({
      left: -getScrollAmount(),
      behavior: 'smooth'
    });
  });
}