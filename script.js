const $ = (e, p = document) => p.querySelector(e);
const $$ = (e, p = document) => p.querySelectorAll(e);

const footerPath = document.querySelector('.footer__path');




// Calling F(x)
const lenis = smoothScroll();

const pathData = {
   bend: 100,
   height: 100
}

const scrollTl = gsap.timeline({
   scrollTrigger: {
      trigger: '.next-page-footer',
      scroller: 'body',
      markers: true,
      scrub: true,
      start: 'top top',
      end: 'top -200%',
      pin: true,
      snap: {
         snapTo: p => (p > 0.99) ? 1 : 0,
         directional: false,
         delay: 0,
         duration: { min: 0.3, max: 1 },
         ease: 'power1.inOut'
      },
      onUpdate: () => {
         gsap.set(footerPath, { attr: { d: `M 0 100 V ${pathData.height} Q 50 ${pathData.bend} 100 ${pathData.height} V 100 z` } })
      }
   },
})

scrollTl
   .to(pathData, { height: 90, bend: 60, duration: 0.2, ease:'power1.in' })
   .to(pathData, { height: 70, bend: 0, ease: 'power1', duration: 0.3 })
















// Imp F(x)
function smoothScroll() {
   const lenis = new Lenis();

   function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
   }

   requestAnimationFrame(raf);

   return lenis;
}