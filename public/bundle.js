(()=>{"use strict";window.util={getDeclination:(e,t,r=[2,0,1,1,1,2])=>t[e%100>4&&e%100<20?2:r[e%10<5?e%10:5]],isEscEvent:(e,t)=>{"Escape"===e.key&&t()},isEnterEvent:(e,t)=>{"Enter"===e.key&&t()},isMouseButtonLeftEvent:(e,t)=>{0===e.button&&t()},isDocumentClickEvent:e=>{document.addEventListener("click",(()=>{e()}))}},window.debounce=e=>{let t=null;return(...r)=>{t&&clearTimeout(t),t=setTimeout((()=>{e(...r)}),500)}},(()=>{const e=document.querySelector("main"),t=()=>{r(),a()},r=()=>{const e=document.querySelector(".success"),t=document.querySelector(".error");e?e.remove():t&&t.remove()},o=e=>{window.util.isEscEvent(e,t)},n=()=>{window.util.isDocumentClickEvent(t)},s=()=>{document.addEventListener("keydown",o),document.addEventListener("click",n)},a=()=>{document.removeEventListener("keydown",o),document.removeEventListener("click",n)};window.message={errorHandler:e=>{const t=document.createElement("div");t.style="z-index: 100; margin: 0 auto; text-align: center; background-color: #a5142a;",t.style.position="absolute",t.style.left=0,t.style.right=0,t.style.fontSize="24px",t.style.color="#ed8b77",t.textContent=e,document.body.insertAdjacentElement("afterbegin",t)},errorMessage:()=>{const t=document.querySelector("#error").content.querySelector(".error"),r=t.querySelector(".error__button");e.insertAdjacentElement("afterbegin",t),r.addEventListener("click",(()=>{t.remove()})),s()},successMessage:()=>{const t=document.querySelector("#success").content.querySelector(".success");e.insertAdjacentElement("afterbegin",t),s()}}})(),(()=>{const e=(e,t)=>{const r=new XMLHttpRequest;return r.responseType="json",r.addEventListener("load",(()=>{let o;switch(r.status){case 200:e(r.response);break;case 400:break;case 404:o="Cтраница не найдена";break;case 500:o="Внутренняя ошибка сервера";break;default:o=`Статус ответа: ${r.status} ${r.statusText}`}o&&t(o)})),r.addEventListener("error",(()=>{t("Произошла ошибка соединения")})),r.timeout=5e3,r.addEventListener("timeout",(()=>{t(`Запрос не успел выполниться за ${r.timeout} мс`)})),r};window.server={load:(t,r)=>{const o=e(t,r);o.open("GET","https://21.javascript.pages.academy/keksobooking/data"),o.send()},upload:(t,r,o)=>{const n=e(r,o);n.open("POST","https://21.javascript.pages.academy/keksobooking"),n.send(t)}}})(),(()=>{let e=[];const t=e=>{const t=document.querySelector("#pin").content.querySelector(".map__pin").cloneNode(!0),r=t.querySelector("img");return t.style.left=e.location.x-r.width/2+"px",t.style.top=e.location.y-r.height+"px",r.src=e.author.avatar,r.alt=e.offer.title,t.addEventListener("click",(()=>{(()=>{const e=document.querySelector(".map__pin--active");e&&e.classList.remove("map__pin--active")})(),t.classList.add("map__pin--active"),window.card.createCard(window.card.getCard(e))})),t},r=e=>{const r=document.createDocumentFragment(),o=e.length<5?e.length:5;for(let n=0;n<o;n++)r.appendChild(t(e[n]));document.querySelector(".map__pins").append(r)};window.pins={successHandler:t=>{e=t,r(t)},removePins:()=>{const e=document.querySelectorAll(".map__pin:not(.map__pin--main)");e&&e.forEach((e=>{e.remove()}))},getPin:t,renderPins:r,getPins:()=>e}})(),(()=>{const e=document.querySelector(".map"),t=document.querySelector(".map__pin--main"),r=document.querySelector("#address"),o=t.offsetHeight+10,n=Math.floor(t.offsetWidth/2),s=e.offsetWidth,a={MIN:0-n,MAX:s-n},i={MIN:130-o,MAX:630-o};t.addEventListener("mousedown",(e=>{e.preventDefault();let s=!1,c={X:e.clientX,Y:e.clientY};const d=e=>{e.preventDefault(),s=!0;const d=c.X-e.clientX,u=c.Y-e.clientY;c={X:e.clientX,Y:e.clientY};let l=t.offsetTop-u,m=t.offsetLeft-d;l<=i.MIN?l=i.MIN:l>=i.MAX&&(l=i.MAX),m<=a.MIN?m=a.MIN:m>=a.MAX&&(m=a.MAX),t.style.top=l+"px",t.style.left=m+"px",r.value=`${m+n}, ${l+o}`},u=e=>{if(e.preventDefault(),document.removeEventListener("mousemove",d),document.removeEventListener("mouseup",u),s){const e=r=>{r.preventDefault(),t.removeEventListener("click",e)};t.addEventListener("click",e)}};document.addEventListener("mousemove",d),document.addEventListener("mouseup",u)})),window.mainPin={setAddress:()=>{const n=Math.round(parseInt(t.style.left,10)+t.clientWidth/2),s=e.classList.contains("map--faded")?Math.round(parseInt(t.style.top,10)+t.clientHeight/2):Math.round(parseInt(t.style.top,10)+o);r.value=`${n}, ${s}`},getStartСoordinates:()=>{t.style.top="375px",t.style.left="570px"}}})(),(()=>{const e={palace:"Дворец",flat:"Квартира",house:"Дом",bungalow:"Бунгало"},t=e=>{window.util.isEscEvent(e,r)},r=()=>{o(),document.removeEventListener("keydown",t)},o=()=>{const e=document.querySelector(".map__card");e&&e.remove()};window.card={getCard:t=>{const r=document.querySelector("#card").content.querySelector(".map__card").cloneNode(!0),o=r.querySelector(".popup__close"),n=r.querySelector(".popup__photos"),s=n.querySelector(".popup__photo"),a=r.querySelector(".popup__features");return r.querySelector(".popup__title").textContent=t.offer.title,r.querySelector(".popup__text--address").textContent=t.offer.address,r.querySelector(".popup__text--price").textContent=t.offer.price+"₽/ночь",r.querySelector(".popup__type").textContent=e[t.offer.type],r.querySelector(".popup__text--capacity").textContent=`${t.offer.rooms} ${window.util.getDeclination(t.offer.rooms,["комната","комнаты","комнат"])} для ${t.offer.guests} ${window.util.getDeclination(t.offer.guests,["гостя","гостей","гостей"])}`,r.querySelector(".popup__text--time").textContent=`Заезд после ${t.offer.checkin}, выезд до ${t.offer.checkout}`,r.querySelector(".popup__description").textContent=t.offer.description,r.querySelector(".popup__avatar").src=t.author.avatar,t.offer.photos?(n.innerHTML="",t.offer.photos.forEach((e=>{const t=s.cloneNode(!0);t.src=e,n.append(t)}))):n.remove(),t.offer.features?(a.innerHTML="",t.offer.features.forEach((e=>{const t=document.createElement("li");t.classList.add("popup__feature","popup__feature--"+e),a.append(t)}))):a.remove(),o.addEventListener("click",(()=>{r.remove()})),r},createCard:e=>{const r=document.querySelector(".map__filters-container");o(),document.addEventListener("keydown",t),document.querySelector(".map").insertBefore(e,r)},removeCard:o}})(),(()=>{const e=document.querySelector(".ad-form"),t=e.querySelector(".ad-form__reset"),r=e.querySelectorAll("fieldset"),o=e.querySelector("#address"),n=e.querySelector("#room_number"),s=e.querySelector("#capacity"),a=e.querySelector("#title"),i=e.querySelector("#price"),c=e.querySelector("#type"),d=e.querySelector("#timein"),u=e.querySelector("#timeout"),l=e.querySelector("#avatar"),m=e.querySelector("#images"),p=()=>{const e=parseInt(n.value,10),t=parseInt(s.value,10);let r="";e<t?r="Недопустимое количество гостей для выбранного количества комнат":e<100&&0===t?r="Для данного количества комнат необходимо выбрать количество гостей":100===e&&t>0?r="Выбранное количество комнат не предназначено для гостей":s.valid=!0,s.setCustomValidity(r)},f=()=>{a.setAttribute("required","true"),a.setAttribute("minlength",30),a.setAttribute("maxlength",100)},v=()=>{i.setAttribute("required","true"),i.setAttribute("max",1e6),"bungalow"===c.value?(i.setAttribute("min",0),i.setAttribute("placeholder",0)):"flat"===c.value?(i.setAttribute("min",1e3),i.setAttribute("placeholder",1e3)):"house"===c.value?(i.setAttribute("min",5e3),i.setAttribute("placeholder",5e3)):"palace"===c.value&&(i.setAttribute("min",1e4),i.setAttribute("placeholder",1e4))},w=(e,t)=>{e.value=t},y=()=>{e.reset()},g=()=>{y(),window.message.successMessage(),window.main.disactivatePage()},h=()=>{window.message.errorMessage()};e.addEventListener("submit",(t=>{t.preventDefault(),window.server.upload(new FormData(e),g,h)})),t.addEventListener("click",(e=>{e.preventDefault(),window.main.disactivatePage()})),window.form={disableForm:()=>{e.classList.add("ad-form--disabled"),r.forEach((e=>e.setAttribute("disabled","true"))),y()},enableForm:()=>{e.classList.remove("ad-form--disabled"),r.forEach((e=>e.removeAttribute("disabled"))),[n,s].forEach((e=>{e.addEventListener("change",(()=>{p()}))})),a.addEventListener("change",(()=>{f()})),[i,c].forEach((e=>{e.addEventListener("change",(()=>{v()}))})),d.addEventListener("change",(()=>{w(u,d.value)})),u.addEventListener("change",(()=>{w(d,u.value)})),p(),f(),v(),o.setAttribute("readonly","true"),[l,m].forEach((e=>{e.setAttribute("accept","image/*")}))}}})(),(()=>{const e=["gif","jpg","jpeg","png"],t=document.querySelector(".ad-form__field input[type=file]"),r=document.querySelector(".ad-form-header__preview img"),o=document.querySelector(".ad-form__upload input[type=file]"),n=document.querySelector(".ad-form__photo"),s=document.createElement("img"),a=(t,r)=>{const o=t.target.files[0],n=o.name.toLowerCase();if(e.some((e=>n.endsWith(e)))){const e=new FileReader;e.addEventListener("load",(()=>{r(e.result)})),e.readAsDataURL(o)}},i=e=>{r.src=e},c=e=>{n.appendChild(s),s.src=e,s.style.width=n.offsetWidth+"px",s.style.height=n.offsetHeight+"px"};window.image={changePreview:()=>{t.addEventListener("change",(e=>{a(e,i)})),o.addEventListener("change",(e=>{a(e,c)}))},resetPreview:()=>{s.remove(),r.src="img/muffin-grey.svg"}}})(),(()=>{const e=document.querySelector(".map");window.map={disableMap:()=>{e.classList.add("map--faded")},enableMap:()=>{e.classList.remove("map--faded")}}})(),(()=>{const e=document.querySelector(".map__filters"),t=e.querySelector("#housing-type"),r=e.querySelector("#housing-price"),o=e.querySelector("#housing-rooms"),n=e.querySelector("#housing-guests"),s="any",a=window.debounce((()=>{window.card.removeCard(),window.pins.removePins(),window.pins.renderPins(window.pins.getPins().filter((a=>{return u=a.offer.type,(t.value===s||u===t.value)&&(d=a.offer.rooms,o.value===s||d===Number(o.value))&&(c=a.offer.guests,n.value===s||c===Number(n.value))&&(e=>{switch(r.value){case"middle":return e>=1e4&&e<=5e4;case"low":return e<=1e4;case"high":return e>=5e4;default:return r.value===s}})(a.offer.price)&&(i=a.offer.features,Array.from(e.querySelectorAll(".map__checkbox:checked")).every((e=>i.includes(e.value))));var i,c,d,u})))}));window.filter={disableFilter:()=>{e.reset(),e.removeEventListener("change",a)},enableFilter:()=>{e.addEventListener("change",a)}}})(),(()=>{const e=document.querySelector(".map__pin--main"),t=()=>{e.removeEventListener("mousedown",r),e.removeEventListener("keydown",o)},r=e=>{window.util.isMouseButtonLeftEvent(e,s),t()},o=e=>{window.util.isEnterEvent(e,s),t()},n=()=>{window.map.disableMap(),window.form.disableForm(),window.mainPin.setAddress(),window.pins.removePins(),window.mainPin.getStartСoordinates(),window.card.removeCard(),window.filter.disableFilter(),e.addEventListener("mousedown",r),e.addEventListener("keydown",o),window.image.resetPreview()};n();const s=()=>{window.map.enableMap(),window.form.enableForm(),window.mainPin.setAddress(),window.server.load(window.pins.successHandler,window.message.errorHandler),window.filter.enableFilter(),window.image.changePreview()};window.main={disactivatePage:n}})()})();