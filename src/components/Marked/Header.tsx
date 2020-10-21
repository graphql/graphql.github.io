import React from 'react';
import {toSlug} from '../../utils/slug';

export default (props) => {
    var usedSlugs = props.usedSlugs || {};
    var append = '';
    var loopCount = 0;
    do {
        
      var slug = toSlug((props.toSlug || props.children) + append);
      append = '-' + (++loopCount);
    } while (usedSlugs[slug]);
    usedSlugs[slug] = slug;
    var Heading = 'h' + props.level;
    var url = props.url || '';
  
    //id is required for gatsby's anchor tags to work
    return (
      <Heading {...props}>
        <a className="anchor" id={slug} name={slug}></a>
        {props.children}
        {' '}<a className="hash-link" href={url + '#' + slug}>#</a>
      </Heading>
    );
  }
  