import { useCallback } from 'react';

export function usePageTransition() {
  const playEntry = useCallback((selectors = ['.input-section', '.examples-section']) => {
  
    try {
      setTimeout(() => {
        document.body.classList.remove('page-transition');
        document.body.classList.add('loaded');
        document.querySelectorAll(selectors.join(', ')).forEach((el, index) => {
          setTimeout(() => el.classList.add('content-loaded'), index * 200);
        });
      }, 100);
    } catch (e) {
      
    }
  }, []);

  const playExit = useCallback((duration = 500) => {
    
    return new Promise((resolve) => {
      try {
       
        document.querySelectorAll('.content-loaded').forEach(el => el.classList.remove('content-loaded'));
      
        document.body.classList.add('page-transition');
      } catch (e) {
        
      }

      setTimeout(() => resolve(), duration);
    });
  }, []);

  return { playEntry, playExit };
}

export default usePageTransition;
