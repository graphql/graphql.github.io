import React, { useEffect } from "react"

export const useFAQAccordion = () => {
    const toggleChildrenClass = (element: React.ReactNode) => {
      Array.from(nextUntil(element, 'h3')).map(p =>
        p.classList.toggle('show')
      );
    };
  
    const nextUntil = (elem: any, selector: string) => {
      const siblings = [];
      let nextElement = elem.nextElementSibling;

      while (nextElement) {
        if (nextElement.matches(selector)) break;

        siblings.push(nextElement);

        nextElement = nextElement.nextElementSibling;
      }
    
      return siblings;
    
    };
  
    useEffect(() => {
      const hash = location.hash ? location.hash.split('#')[1] : '';
  
      if (hash) {
        const anchor = document && document.getElementById(hash)
        const heading: any = anchor && anchor.parentNode;
  
        if (heading) {
          heading.classList.toggle('open');
          toggleChildrenClass(heading);
        }
      }
  
      const toggleClasses = (e: any) => {
        if (e.target.localName !== 'h3') return;
        history.replaceState({}, '', '#' + e.target.getElementsByTagName('a')[0].id);
        history.scrollRestoration = 'manual';
  
        e.target.classList.toggle('open');
        toggleChildrenClass(e.target);
      };
  
      document.addEventListener('click', toggleClasses);
  
      return () => document.removeEventListener('click', toggleClasses);
    }, []);
  };