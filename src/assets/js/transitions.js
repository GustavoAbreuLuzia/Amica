import { TimelineMax as Timeline, Power1 } from 'gsap';

const getDefaultTimeline = (node, delay) => {
  const timeline = new Timeline({ paused: true });
  const content = node.querySelector('*');
  
  timeline
    .from(node, 0.3, { display: 'none', autoAlpha: 0, delay, ease: Power1.easeIn })
    .from(content, 0.15, { autoAlpha: 0, y: 25, ease: Power1.easeInOut });

  return timeline;
}

const getHomeTimeline = (node, delay) => {
  const timeline = new Timeline({ paused: false });
  const texts = node.querySelectorAll('*');

  timeline
    .from(node, 0, { display: 'none', autoAlpha: 0, delay })
    .staggerFrom(texts, 0.375, { autoAlpha: 0, x: -25, ease: Power1.easeOut }, 0.05);

  return timeline;
}

export const play = (pathname, node, appears) => {
  const delay = 0;
  let timeline;
  
  if(node !== null){
    if (pathname === '/')
      timeline = getHomeTimeline(node, delay);
    else
      timeline = getDefaultTimeline(node, delay);
      
    window
      .loadPromise
      .then(() => requestAnimationFrame(() => timeline.play()))
  }  
}

export const exit = (node) => {
  if(node !== null){
    const timeline = new Timeline({ paused: true });

    timeline.to(node, 0.35, { autoAlpha: 0, ease: Power1.easeOut });
    timeline.play();
  }  
}