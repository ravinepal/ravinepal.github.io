(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[196],{8886:function(e,r,t){"use strict";t.d(r,{A:function(){return l}});var n=t(1664),a=t(5893),o=function(){return(0,a.jsxs)("div",{className:"header",children:[(0,a.jsxs)("h1",{children:["Ravi Kumar, ",(0,a.jsx)("a",{href:"https://twitter.com/RaviNepal",rel:"noreferrer",target:"_blank",children:"@RaviNepal"})]}),(0,a.jsxs)("p",{className:"alignright",children:[(0,a.jsx)(n.default,{href:"/",children:" Home "})," ",(0,a.jsx)(n.default,{href:"/speaking",children:" | Speaking "})," ",(0,a.jsx)(n.default,{href:"/blogs",children:" | Blog "})," ",(0,a.jsx)(n.default,{href:"/media",children:" | Media "})]}),(0,a.jsx)("div",{style:{clear:"both"}})]})},i=t(9008),c=function(){return(0,a.jsxs)(i.default,{children:[(0,a.jsx)("link",{rel:"shortcut icon",href:"/favicon/favicon.ico"}),(0,a.jsx)("meta",{name:"theme-color",content:"#000"}),(0,a.jsx)("title",{children:"Ravi Kumar, @RaviNepal"}),(0,a.jsx)("meta",{name:"description",content:"Developing data-driven, open source and user-centered solutions to improve lives, and building a data literate world."}),(0,a.jsx)("link",{rel:"icon",href:"/images/ravi.jpg"}),(0,a.jsx)("meta",{property:"og:image",content:"/images/ravi.jpg"})]})},l=function(e){var r=e.children;return(0,a.jsxs)("div",{className:"wrapper",children:[(0,a.jsx)(o,{}),(0,a.jsx)(c,{}),r]})}},2167:function(e,r,t){"use strict";var n=t(3848);r.default=void 0;var a,o=(a=t(7294))&&a.__esModule?a:{default:a},i=t(1063),c=t(4651),l=t(7426);var s={};function u(e,r,t,n){if(e&&i.isLocalURL(r)){e.prefetch(r,t,n).catch((function(e){0}));var a=n&&"undefined"!==typeof n.locale?n.locale:e&&e.locale;s[r+"%"+t+(a?"%"+a:"")]=!0}}var d=function(e){var r,t=!1!==e.prefetch,a=c.useRouter(),d=o.default.useMemo((function(){var r=i.resolveHref(a,e.href,!0),t=n(r,2),o=t[0],c=t[1];return{href:o,as:e.as?i.resolveHref(a,e.as):c||o}}),[a,e.href,e.as]),f=d.href,p=d.as,v=e.children,h=e.replace,g=e.shallow,m=e.scroll,j=e.locale;"string"===typeof v&&(v=o.default.createElement("a",null,v));var _=(r=o.default.Children.only(v))&&"object"===typeof r&&r.ref,x=l.useIntersection({rootMargin:"200px"}),b=n(x,2),y=b[0],w=b[1],O=o.default.useCallback((function(e){y(e),_&&("function"===typeof _?_(e):"object"===typeof _&&(_.current=e))}),[_,y]);o.default.useEffect((function(){var e=w&&t&&i.isLocalURL(f),r="undefined"!==typeof j?j:a&&a.locale,n=s[f+"%"+p+(r?"%"+r:"")];e&&!n&&u(a,f,p,{locale:r})}),[p,f,w,j,t,a]);var N={ref:O,onClick:function(e){r.props&&"function"===typeof r.props.onClick&&r.props.onClick(e),e.defaultPrevented||function(e,r,t,n,a,o,c,l){("A"!==e.currentTarget.nodeName||!function(e){var r=e.currentTarget.target;return r&&"_self"!==r||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which}(e)&&i.isLocalURL(t))&&(e.preventDefault(),null==c&&n.indexOf("#")>=0&&(c=!1),r[a?"replace":"push"](t,n,{shallow:o,locale:l,scroll:c}))}(e,a,f,p,h,g,m,j)},onMouseEnter:function(e){i.isLocalURL(f)&&(r.props&&"function"===typeof r.props.onMouseEnter&&r.props.onMouseEnter(e),u(a,f,p,{priority:!0}))}};if(e.passHref||"a"===r.type&&!("href"in r.props)){var k="undefined"!==typeof j?j:a&&a.locale,D=a&&a.isLocaleDomain&&i.getDomainLocale(p,k,a&&a.locales,a&&a.domainLocales);N.href=D||i.addBasePath(i.addLocale(p,k,a&&a.defaultLocale))}return o.default.cloneElement(r,N)};r.default=d},7426:function(e,r,t){"use strict";var n=t(3848);Object.defineProperty(r,"__esModule",{value:!0}),r.useIntersection=function(e){var r=e.rootMargin,t=e.disabled||!i,l=a.useRef(),s=a.useState(!1),u=n(s,2),d=u[0],f=u[1],p=a.useCallback((function(e){l.current&&(l.current(),l.current=void 0),t||d||e&&e.tagName&&(l.current=function(e,r,t){var n=function(e){var r=e.rootMargin||"",t=c.get(r);if(t)return t;var n=new Map,a=new IntersectionObserver((function(e){e.forEach((function(e){var r=n.get(e.target),t=e.isIntersecting||e.intersectionRatio>0;r&&t&&r(t)}))}),e);return c.set(r,t={id:r,observer:a,elements:n}),t}(t),a=n.id,o=n.observer,i=n.elements;return i.set(e,r),o.observe(e),function(){i.delete(e),o.unobserve(e),0===i.size&&(o.disconnect(),c.delete(a))}}(e,(function(e){return e&&f(e)}),{rootMargin:r}))}),[t,r,d]);return a.useEffect((function(){if(!i&&!d){var e=o.requestIdleCallback((function(){return f(!0)}));return function(){return o.cancelIdleCallback(e)}}}),[d]),[p,d]};var a=t(7294),o=t(3447),i="undefined"!==typeof IntersectionObserver;var c=new Map},8611:function(e,r,t){"use strict";t.r(r),t.d(r,{__N_SSG:function(){return g},default:function(){return m}});var n=t(2809),a=t(9487),o=t.n(a),i=t(7186),c=t.n(i),l=t(5893),s=function(e){var r=e.content;return(0,l.jsx)("div",{className:c().markdown,dangerouslySetInnerHTML:{__html:r}})},u=t(1664),d=function(e){return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsxs)("div",{className:o().breadcrumbs,children:[(0,l.jsx)("span",{children:(0,l.jsx)(u.default,{href:"/blogs",passHref:!0,children:(0,l.jsx)("a",{children:"Blogs"})})}),(0,l.jsx)("span",{children:e.title})]}),(0,l.jsxs)("div",{className:o().card,children:[(0,l.jsx)("div",{className:o().image_container,children:(0,l.jsx)("div",{className:o().image,style:{backgroundImage:"url(".concat(e.coverImage.url,")")}})}),e.coverImage.credits&&(0,l.jsx)("p",{className:o().credits,children:e.coverImage.credits}),(0,l.jsx)("div",{className:o().title,children:e.title}),(0,l.jsxs)("div",{className:o().author,children:[(0,l.jsx)("span",{children:e.author.name}),(0,l.jsx)("span",{children:e.author.email})]}),(0,l.jsx)("div",{className:o().content_wrapper,children:(0,l.jsx)(s,{content:e.content})})]})]})},f=t(8886),p=t(9008);function v(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function h(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?v(Object(t),!0).forEach((function(r){(0,n.Z)(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):v(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}var g=!0,m=function(e){var r,t=e.blog;return(0,l.jsxs)(f.A,{children:[(0,l.jsxs)(p.default,{children:[(0,l.jsx)("title",{children:null===t||void 0===t?void 0:t.title}),(0,l.jsx)("meta",{name:"description",content:null===t||void 0===t?void 0:t.excerpt}),(0,l.jsx)("meta",{property:"og:image",content:null===t||void 0===t||null===(r=t.ogImage)||void 0===r?void 0:r.url})]}),(0,l.jsx)(d,h({},t))]})}},9806:function(e,r,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/blogs/[slug]",function(){return t(8611)}])},7186:function(e){e.exports={markdown:"markdown-styles_markdown__1x9gM"}},9487:function(e){e.exports={card:"BlogDetail_card__1aQUv",title:"BlogDetail_title__3Cxg7",image_container:"BlogDetail_image_container__OKVK8",image:"BlogDetail_image__2B7Sc",author:"BlogDetail_author__2GY3U",credits:"BlogDetail_credits__tDTOZ",content_wrapper:"BlogDetail_content_wrapper__3Lb7m",breadcrumbs:"BlogDetail_breadcrumbs__6Vjnb"}},9008:function(e,r,t){e.exports=t(639)},1664:function(e,r,t){e.exports=t(2167)}},function(e){e.O(0,[774,888,179],(function(){return r=9806,e(e.s=r);var r}));var r=e.O();_N_E=r}]);