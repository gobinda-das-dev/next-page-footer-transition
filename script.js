const $ = (e, p = document) => p.querySelector(e);
const $$ = (e, p = document) => p.querySelectorAll(e);

const nxtFooter = $('#next-page-footer');
const footerPath = $('.footer__path', nxtFooter);
const next = $('.next', nxtFooter);
const title = $('.title', nxtFooter);
const indicator = $('.indicator', nxtFooter);
const keepScrollingText = new SplitType('.keep-scrolling', { types: 'chars' });



// Calling F(x)
const lenis = smoothScroll();

const pathData = {
   bend: 100,
   height: 100
}

const scrollTl = gsap.timeline({
   scrollTrigger: {
      trigger: nxtFooter,
      scroller: 'body',
      markers: true,
      scrub: true,
      start: 'top top',
      end: 'top -200%',
      pin: true,
      snap: {
         snapTo: p => (p > 0.8) ? 1 : 0,
         directional: false,
         delay: 0,
         duration: { min: 0.3, max: 0.6 },
         ease: 'none'
      },
      onUpdate: ({ progress }) => {
         gsap.set(footerPath, { attr: { d: `M 0 100 V ${pathData.height} Q 50 ${pathData.bend} 100 ${pathData.height} V 100 z` } })

         if (progress >= 0.99) {
            lenis.stop();
            scrollTl.kill();
            
            gsap.timeline({ defaults: { duration: 1, ease: 'expo.inOut' } })
               .to(keepScrollingText.chars, {
                  yPercent: -110,
                  stagger: 0.03,
                  duration: 1 - (keepScrollingText.chars.length * 0.03),
                  opacity: 0,
               })
               .to(indicator, { scaleX: 0 }, 0)
               .to(footerPath, {attr: {d: 'M 0 100 V 0 Q 50 0 100 0 V 100 z'}}, 0)
               .to(title, { yPercent: '-=100', opacity: 0 }, 0)
               .set(title, { textContent: 'New Page', yPercent: 100 })
               .set(next, { textContent: 'Welcome', yPercent: 100, opacity: 0 })
               .to(footerPath, {attr: {d: 'M 0 0 V 0 Q 50 0 100 0 V 0 z'}})
               .to([title, next], { yPercent: 0, opacity: 1, stagger: -0.1 }, '<+0.1')
         }
      }
   },
})

scrollTl
   .to(pathData, { height: 70 })
   .to(pathData, { bend: 20, ease: 'power3.in' }, '<')
   .to(next, { yPercent: -150, willChange: 'transform' }, 0)
   .to(title, { yPercent: -100, willChange: 'transform' }, 0)
   .to(indicator, { scaleX: 1, willChange: 'transform' }, 0)

// scrollTl
//    .to(pathData, { height: 90, bend: 60, duration: 0.2, ease:'power1.in' })
//    .to(pathData, { height: 70, bend: 0, ease: 'power1', duration: 0.3 })















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