import React, { useEffect } from "react"
import Layout from "../components/Layout"
import FAQSection from "../components/FAQSection"
import { graphql } from "gatsby"

export const useAccordion = () => {
  const toggleChildrenClass = (element: React.ReactNode) => {
    console.log(nextUntil(element, 'h3'))
    Array.from(nextUntil(element, 'h3')).map(p =>
      p.classList.toggle('show')
    );
  };

  var nextUntil = function (elem: any, selector: string) {

    // Setup siblings array
    var siblings = [];
  
    // Get the next sibling element
    let nextElement = elem.nextElementSibling;
  
    // As long as a sibling exists
    while (nextElement) {
  
      // If we've reached our match, bail
      if (nextElement.matches(selector)) break;
  
      // Otherwise, push it to the siblings array
      siblings.push(nextElement);
  
      // Get the next sibling element
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

export default ({ pageContext, data }: any) => {
  useAccordion()

  const sections = data.allMarkdownRemark.edges
    .map((e: any) => e.node)
    .sort((a: any, b: any) => {
      const aPosition = a.frontmatter.position
      const bPosition = b.frontmatter.position
      if (aPosition < bPosition) {
        return -1
      }
      return 1
    })

  return (
    <Layout title="FAQ | GraphQL" pageContext={pageContext}>
    <section>
      <div className="documentationContent">
        <section className="inner-content">
          <h1>Frequently Asked Questions (FAQ)</h1>
          <div className="faq-content">
            {sections.map(
              (
                {
                  frontmatter: { title, permalink },
                  rawMarkdownBody,
                }: any,
              i
            ) => (
              <FAQSection
                key={i}
                title={title}
                permalink={permalink}
                rawMarkdownBody={rawMarkdownBody}
                pageContext={pageContext}
              />
            )
            )}
          </div>
        </section>
      </div>
    </section>
    </Layout>
  )
}

export const query = graphql`
  query getAllFAQSections {
    allMarkdownRemark(
      filter: { frontmatter: { permalink: { regex: "/faq/" } } }
    ) {
      edges {
        node {
          frontmatter {
            title
            permalink
            questions
            position
          }
          id
          rawMarkdownBody
        }
      }
    }
  }
`
