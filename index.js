import{a as w,S as q,i as n}from"./assets/vendor-DvfmeZXB.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function r(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(e){if(e.ep)return;e.ep=!0;const o=r(e);fetch(e.href,o)}})();const S="53363226-49c521b83e2d6ffa4f69ff166",$="https://pixabay.com/api/";async function m(s,t=1){const r={key:S,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:t};try{const a=await w.get($,{params:r});return console.log("API Response:",a.data),a.data}catch(a){throw console.error("Error fetching images from Pixabay:",a),new Error("Failed to fetch images.")}}const g=document.querySelector(".gallery"),p=document.querySelector(".loader-container"),y=document.querySelector(".load-more-btn"),E=new q(".gallery a",{captionsData:"alt",captionDelay:250});function h(s){const t=s.map(({webformatURL:r,largeImageURL:a,tags:e,likes:o,views:l,comments:L,downloads:I})=>`
    <li class="gallery-item">
      <a class="gallery-link" href="${a}">
        <img class="gallery-image" src="${r}" alt="${e}" loading="lazy">
        <div class="gallery-info">
          <div class="info-item">
            <span class="info-label">Likes</span>
            <span class="info-value">${o}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Views</span>
            <span class="info-value">${l}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Comments</span>
            <span class="info-value">${L}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Downloads</span>
            <span class="info-value">${I}</span>
          </div>
        </div>
      </a>
    </li>
  `).join("");g.insertAdjacentHTML("beforeend",t),E.refresh()}function P(){g.innerHTML=""}function v(){p.classList.add("visible")}function u(){p.classList.remove("visible")}function b(){y.classList.remove("hidden")}function f(){y.classList.add("hidden")}n.settings({timeout:3e3,resetOnHover:!0,position:"topRight",transitionIn:"fadeInDown",transitionOut:"fadeOutUp"});const O=document.querySelector(".form"),B="search-text",A=document.querySelector(".load-more-btn");let c="",i=1,d=0;O.addEventListener("submit",async s=>{s.preventDefault();const t=s.target.elements[B].value.trim();if(t===""){n.error({title:"Error",message:"Please enter a search term!"});return}t!==c&&(c=t,i=1,P()),f(),v();try{const r=await m(c,i);if(u(),d=r.totalHits,!r.hits||r.hits.length===0){n.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!"});return}h(r.hits),i*15<d?(b(),n.success({title:"Success",message:`Found ${d} images!`})):(f(),n.info({title:"Info",message:"We're sorry, but you've reached the end of search results."})),s.target.reset()}catch(r){u(),console.error(r.message),n.error({title:"Request Failed",message:`An error occurred: ${r.message}`})}});A.addEventListener("click",async()=>{i+=1,f(),v();try{const s=await m(c,i);u(),h(s.hits);const t=document.querySelector(".gallery-item");if(t){const a=t.getBoundingClientRect().height;window.scrollBy({top:a*2,behavior:"smooth"})}i*15<d?b():(f(),n.info({title:"Info",message:"We're sorry, but you've reached the end of search results."}))}catch(s){u(),console.error(s.message),n.error({title:"Request Failed",message:`An error occurred: ${s.message}`})}});
//# sourceMappingURL=index.js.map
