import{a as q,S,i as n}from"./assets/vendor-DvfmeZXB.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function e(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerPolicy&&(a.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?a.credentials="include":t.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(t){if(t.ep)return;t.ep=!0;const a=e(t);fetch(t.href,a)}})();const P="53363226-49c521b83e2d6ffa4f69ff166",$="https://pixabay.com/api/";async function g(r,s=1){const e={key:P,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:s};try{const o=await q.get($,{params:e});return console.log("API Response:",o.data),o.data}catch(o){throw console.error("Error fetching images from Pixabay:",o),new Error("Failed to fetch images.")}}const h=document.querySelector(".gallery"),p=document.querySelector(".loader-container"),y=document.querySelector(".load-more-btn"),E=new S(".gallery a",{captionsData:"alt",captionDelay:250});function v(r){const s=r.map(({webformatURL:e,largeImageURL:o,tags:t,likes:a,views:l,comments:w,downloads:I})=>`
    <li class="gallery-item">
      <a class="gallery-link" href="${o}">
        <img class="gallery-image" src="${e}" alt="${t}" loading="lazy">
        <div class="gallery-info">
          <div class="info-item">
            <span class="info-label">Likes</span>
            <span class="info-value">${a}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Views</span>
            <span class="info-value">${l}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Comments</span>
            <span class="info-value">${w}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Downloads</span>
            <span class="info-value">${I}</span>
          </div>
        </div>
      </a>
    </li>
  `).join("");h.insertAdjacentHTML("beforeend",s),E.refresh()}function O(){h.innerHTML=""}function b(){p.classList.add("visible")}function d(){p.classList.remove("visible")}function L(){y.classList.remove("hidden")}function u(){y.classList.add("hidden")}n.settings({timeout:3e3,resetOnHover:!0,position:"topRight",transitionIn:"fadeInDown",transitionOut:"fadeOutUp"});const B=document.querySelector(".form"),A="search-text",M=document.querySelector(".load-more-btn");let f="",i=1,c=0,m=15;B.addEventListener("submit",async r=>{r.preventDefault();const s=r.target.elements[A].value.trim();if(s===""){n.error({title:"Error",message:"Please enter a search term!"}),r.target.reset();return}O(),f=s,i=1,u(),b();try{const e=await g(f,i);if(d(),c=e.totalHits,e.hits&&e.hits.length>0&&(m=e.hits.length),!e.hits||e.hits.length===0){n.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!"}),r.target.reset();return}v(e.hits),i*m<c?(L(),n.success({title:"Success",message:`Found ${c} images!`})):(u(),n.info({title:"Info",message:"We're sorry, but you've reached the end of search results."}))}catch(e){d(),console.error(e.message),n.error({title:"Request Failed",message:`An error occurred: ${e.message}`})}finally{r.target.reset()}});M.addEventListener("click",async()=>{i+=1,u(),b();try{const r=await g(f,i);d(),v(r.hits);const s=document.querySelector(".gallery-item");if(s){const o=s.getBoundingClientRect().height;window.scrollBy({top:o*2,behavior:"smooth"})}i*m<c?L():(u(),n.info({title:"Info",message:"We're sorry, but you've reached the end of search results."}))}catch(r){d(),console.error(r.message),n.error({title:"Request Failed",message:`An error occurred: ${r.message}`})}});
//# sourceMappingURL=index.js.map
