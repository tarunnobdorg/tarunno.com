(() => {
  const API = (window.TARUNNO_CONFIG || {}).appsScriptUrl || "";
  let lang = localStorage.getItem("tarunno-lang") || "bn";
  const $ = (selector) => document.querySelector(selector);
  const IMAGE_API = "https://api.github.com/repos/tarunnobdorg/tarunno.com/contents/assets/images?ref=main";
  let githubImages = [];
  const localImages = {
    logo: "assets/images/logo/logo.png",
    banner: "assets/images/banners/banner.png",
    programs: ["assets/images/programs/programs-1.jpg", "assets/images/programs/programs-2.jpg"],
    projects: ["assets/images/projects/projects-1.jpg"],
    blood: ["assets/images/blood/748026106_122166790910821371_7449100105567366020_n.jpg", "assets/images/blood/749355701_122167198238821371_332805056435179730_n.jpg", "assets/images/blood/760444403_122168305196821371_4997405863992760089_n.jpg"]
  };
  async function listGitHubImages(path="assets/images") {
    const url = `https://api.github.com/repos/tarunnobdorg/tarunno.com/contents/${path}?ref=main`;
    const res = await fetch(url, {headers:{Accept:"application/vnd.github+json"}});
    if (!res.ok) return [];
    const files = await res.json();
    const result=[];
    for (const f of files) {
      if (f.type === "file" && /\.(png|jpe?g|webp|gif|svg)$/i.test(f.name)) result.push(f);
      else if (f.type === "dir") result.push(...await listGitHubImages(f.path));
    }
    return result;
  }
  async function loadRepositoryImages() {
    const logo = $("#siteLogo");
    if (logo) { logo.src = localImages.logo; logo.style.display="block"; logo.onerror=()=>{logo.style.display="none"; if($("#brandFallback")) $("#brandFallback").style.display="grid";}; if($("#brandFallback")) $("#brandFallback").style.display="none"; }
    const banner = $("#heroBanner"); if (banner) { banner.src=localImages.banner; banner.hidden=false; }
    try {
      githubImages = await listGitHubImages();
      const gallery = $("#galleryGrid");
      if (gallery && (!gallery.querySelector(".gallery-item")) && githubImages.length) {
        gallery.innerHTML = githubImages.map(f => `<figure class="gallery-item"><img src="${esc(f.download_url)}" alt="${esc(f.name)}" loading="lazy"><figcaption>${esc(f.name.replace(/[-_]/g," "))}</figcaption></figure>`).join("");
      }
    } catch(e) { console.warn("Could not discover GitHub images; local images remain available", e); }
  }

  const esc = (v="") => String(v).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const pick = (item, bn, en) => item[lang === "bn" ? bn : en] || item[bn] || item[en] || "";
  function applyLanguage() {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-bn][data-en]").forEach(el => el.textContent = el.dataset[lang]);
    const toggle = $("#languageToggle"); if (toggle) toggle.textContent = lang === "bn" ? "English" : "বাংলা";
    localStorage.setItem("tarunno-lang", lang);
  }
  $("#languageToggle")?.addEventListener("click", () => { lang = lang === "bn" ? "en" : "bn"; applyLanguage(); });
  $("#menuToggle")?.addEventListener("click", () => $("#mainNav")?.classList.toggle("open"));
  document.querySelectorAll("#mainNav a").forEach(a => a.addEventListener("click", () => $("#mainNav")?.classList.remove("open")));
  async function getData(sheet) {
    if (!API) throw new Error("API URL is missing");
    const response = await fetch(`${API}?action=${encodeURIComponent(sheet)}`);
    const result = await response.json();
    if (!result.success) throw new Error(result.error || "API error");
    return result.data || [];
  }
  function renderCards(target, items, titleBn, titleEn, descBn, descEn, imageField="image") {
    const node = $(target); if (!node) return;
    if (!items.length) {
      const fallback = target === "#programsGrid" ? localImages.programs : target === "#projectsGrid" ? localImages.projects : target === "#newsGrid" ? localImages.programs : [];
      if (!fallback.length) { node.innerHTML = `<div class="empty-state">${lang === "bn" ? "এখনো কোনো তথ্য যোগ করা হয়নি।" : "No content has been added yet."}</div>`; return; }
      items = fallback.map((image, i) => ({ titleBn: target === "#programsGrid" ? ["আমাদের কার্যক্রম", "মানবিক উদ্যোগ"][i] : "তারুণ্যের উদ্যোগ", titleEn: target === "#programsGrid" ? ["Our Programs", "Community Support"][i] : "Tarunno Initiative", descriptionBn: "তারুণ্যের সামাজিক ও মানবিক কার্যক্রমের অংশ।", descriptionEn: "Part of Tarunno’s community and humanitarian work.", image }));
    }
    node.innerHTML = items.map(item => {
      const title = esc(pick(item, titleBn, titleEn) || (lang === "bn" ? "শিরোনাম" : "Untitled"));
      const desc = esc(pick(item, descBn, descEn));
      const image = item[imageField] || item.imageUrl || item.photo || "";
      const img = image ? `<div class="card-image"><img src="${esc(image)}" alt="${title}" loading="lazy"></div>` : `<div class="card-placeholder"><span>ত</span></div>`;
      return `<article class="content-card">${img}<div class="card-body"><h3>${title}</h3>${desc ? `<p>${desc}</p>` : ""}${item.date ? `<small>${esc(item.date)}</small>` : ""}</div></article>`;
    }).join("");
  }
  async function load(sheet, target, fields, imageField) {
    try { const data = await getData(sheet); renderCards(target, data, ...fields, imageField); }
    catch (e) { const node = $(target); if (node) node.innerHTML = `<div class="empty-state">${lang === "bn" ? "তথ্য লোড করা যায়নি। API URL ও Deploy পরীক্ষা করুন।" : "Could not load data. Check the API URL and deployment."}</div>`; console.error(sheet, e); }
  }
  async function loadGallery() {
    const node = $("#galleryGrid"); if (!node) return;
    try {
      const items = await getData("Gallery");
      if (!items.length) { node.innerHTML = localImages.programs.concat(localImages.projects, localImages.blood).map((url,i) => `<figure class="gallery-item"><img src="${esc(url)}" alt="Tarunno activity ${i+1}" loading="lazy"><figcaption>${lang === "bn" ? "তারুণ্যের কার্যক্রম" : "Tarunno activity"}</figcaption></figure>`).join(""); return; }
      node.innerHTML = items.map(item => { const url = item.imageUrl || item.image || ""; if (!url) return ""; return `<figure class="gallery-item"><img src="${esc(url)}" alt="${esc(item.title || "Tarunno gallery photo")}" loading="lazy"><figcaption>${esc(item.title || "")}</figcaption></figure>`; }).join("");
    } catch(e) { node.innerHTML = localImages.programs.concat(localImages.projects, localImages.blood).map((url,i) => `<figure class="gallery-item"><img src="${esc(url)}" alt="Tarunno activity ${i+1}" loading="lazy"><figcaption>${lang === "bn" ? "তারুণ্যের কার্যক্রম" : "Tarunno activity"}</figcaption></figure>`).join(""); }
  }
  function normalizeBangladeshPhone(value) {
    let n = String(value || "").trim().replace(/[\s()-]/g, "");
    if (/^1[3-9]\d{8}$/.test(n)) n = "0" + n;
    if (/^8801[3-9]\d{8}$/.test(n)) n = "0" + n.slice(3);
    return n;
  }
  async function submitForm(form, action, statusSelector) {
    const status = $(statusSelector); const button = form.querySelector("button[type=submit]");
    if (!API) { status.textContent = "API URL is missing."; return; }
    const data = Object.fromEntries(new FormData(form).entries());
    data.language = lang;
    if (data.phone) data.phone = normalizeBangladeshPhone(data.phone);
    if (form.querySelector('[name="consent"]')) data.consent = form.querySelector('[name="consent"]').checked ? "true" : "false";
    button.disabled = true; status.textContent = lang === "bn" ? "জমা হচ্ছে…" : "Submitting…";
    try {
      const response = await fetch(API, { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify({ action, data }) });
      const result = await response.json();
      if (!result.success) throw new Error(result.error || "Submission failed");
      let successMessage = action === "registerDonor" ? (lang === "bn" ? "রক্তদাতা হিসেবে নিবন্ধন সফল হয়েছে। আপনার তথ্য এখন রক্তদাতা অনুসন্ধানে দেখা যাবে।" : "Blood donor registration successful. Your details are now available in donor search.") : (lang === "bn" ? "সদস্যপদ আবেদন জমা হয়েছে। অনুমোদনের পর সদস্য নম্বর ইমেইলে পাঠানো হবে।" : "Membership application submitted. Your membership number will be emailed after approval.");
      if (data.email && result.confirmationEmailSent === false) successMessage += lang === "bn" ? " তবে confirmation email পাঠানো যায়নি; Apps Script-এর execution log দেখুন।" : " However, the confirmation email could not be sent; check Apps Script execution logs.";
      if (result.adminEmailSent === false) successMessage += lang === "bn" ? " Admin notification-ও পাঠানো যায়নি; Apps Script-এর MailApp permission পরীক্ষা করুন।" : " The admin notification also failed; check Apps Script MailApp permissions.";
      status.textContent = successMessage;
      form.reset();
    } catch (e) {
      status.textContent = (lang === "bn" ? "জমা দেওয়া যায়নি: " : "Could not submit: ") + e.message + (lang === "bn" ? "। Apps Script POST/CORS পরীক্ষা প্রয়োজন হতে পারে।" : ". Apps Script POST/CORS may need testing.");
      console.error(action, e);
    } finally { button.disabled = false; }
  }
  $("#donorForm")?.addEventListener("submit", e => { e.preventDefault(); submitForm(e.currentTarget, "registerDonor", "#donorStatus"); });
  $("#donationForm")?.addEventListener("submit", e => { e.preventDefault(); submitForm(e.currentTarget, "submitDonation", "#donationStatus"); });
  let donorRecords = [];
  let donorLoadError = false;
  let donorSearchSubmitted = false;
  async function initDonorFinder() {
    if (!$("#donorResults")) return;
    // Keep results empty until the visitor explicitly submits a search.
    $("#donorResults").innerHTML = "";
    try { donorRecords = await getData("BloodDonors"); donorLoadError = false; }
    catch(e) { donorRecords = []; donorLoadError = true; console.error("BloodDonors", e); }
  }
  function renderDonors() {
    const node = $("#donorResults"); if (!node) return;
    donorSearchSubmitted = true;
    if (donorLoadError) {
      node.innerHTML = `<div class="empty-state">${lang === "bn" ? "এই মুহূর্তে রক্তদাতার তথ্য পাওয়া যাচ্ছে না। পরে আবার চেষ্টা করুন।" : "Donor information is currently unavailable. Please try again later."}</div>`;
      return;
    }
    const group = $("#searchBloodGroup")?.value || "";
    const area = ($("#searchArea")?.value || "").trim().toLocaleLowerCase();
    const district = ($("#searchDistrict")?.value || "").trim().toLocaleLowerCase();
    const normalize = value => String(value || "").trim().toLocaleLowerCase();
    const approved = donorRecords.filter(d => {
      const status = normalize(d.status || d.approvalStatus);
      const consent = normalize(d.consent);
      const isApproved = ["approved","active","verified","অনুমোদিত"].includes(status) || d.approved === true || String(d.approved).toLowerCase() === "true";
      const canContact = ["true","yes","1","হ্যাঁ"].includes(consent) || d.contactConsent === true;
      return isApproved && canContact && (!group || String(d.bloodGroup || "").toUpperCase() === group.toUpperCase()) && (!district || normalize(d.district) === district) && (!area || normalize(d.upazila) === area);
    });
    if (!approved.length) {
      node.innerHTML = `<div class="empty-state">${lang === "bn" ? "এই অনুসন্ধানে কোনো রক্তদাতা পাওয়া যায়নি।" : "No donors matched your search."}</div>`;
      return;
    }
    const normalizedPhone = value => { let n=String(value||"").replace(/[^+0-9]/g,""); if(/^1[3-9]\d{8}$/.test(n)) n="0"+n; if(/^8801[3-9]\d{8}$/.test(n)) n="+"+n; return n; };
    node.innerHTML = approved.map(d => {
      const phone = normalizedPhone(d.phone);
      const address = [d.address,d.upazila,d.district].filter(Boolean).join(", ");
      return `<article class="content-card donor-card"><div class="card-body"><h3>${esc(d.name || (lang === "bn" ? "রক্তদাতা" : "Blood donor"))}</h3><p><strong>${esc(d.bloodGroup || "")}</strong></p>${address ? `<p>${esc(address)}</p>` : ""}${phone ? `<p><strong>${lang === "bn" ? "ফোন:" : "Phone:"}</strong> <a href="tel:${esc(phone)}">${esc(phone)}</a></p>` : ""}</div></article>`;
    }).join("");
  }
  $("#donorSearchForm")?.addEventListener("submit", e => { e.preventDefault(); renderDonors(); });
  // The upper CTA opens the registration form without adding a duplicate CTA lower on the page.
  function openDonorRegistration(e) {
    e?.preventDefault();
    const wrap = $("#donorRegistrationWrap");
    if (wrap) { wrap.hidden = false; wrap.scrollIntoView({behavior:"smooth",block:"start"}); }
  }
  $("#openDonorFormTop")?.addEventListener("click", openDonorRegistration);
  $("#openDonorForm")?.addEventListener("click", openDonorRegistration);

  async function loadCommitteeSections() {
    if (!$("#founderGrid")) return;
    try {
      let people = []; try { people = await getData("TeamMembers"); } catch(e) { people = await getData("Members"); }
      const categories = [
        {id:"#founderGrid", words:["founder","প্রতিষ্ঠাতা"]},
        {id:"#advisorGrid", words:["advisor","adviser","উপদেষ্টা"]},
        {id:"#executiveGrid", words:["executive","committee","কার্যনির্বাহী","কমিটি"]}
      ];
      categories.forEach(section => {
        const node = $(section.id); if (!node) return;
        const matches = people.filter(person => {
          const category = `${person.category || ""} ${person.role || ""}`.toLocaleLowerCase();
          return section.words.some(word => category.includes(word));
        });
        if (!matches.length) {
          node.innerHTML = `<div class="empty-state">${lang === "bn" ? "তথ্য যোগ করা হলে এখানে দেখা যাবে।" : "Details will appear here when added."}</div>`;
          return;
        }
        node.innerHTML = matches.map(person => {
          const name = esc(person.name || "");
          const role = esc(person.designation || person.role || person.category || "");
          const bio = esc(pick(person, "bioBn", "bioEn"));
          const photo = person.photo || person.image || "";
          return `<article class="content-card">${photo ? `<div class="card-image"><img src="${esc(photo)}" alt="${name}" loading="lazy"></div>` : `<div class="card-placeholder"><span>ত</span></div>`}<div class="card-body"><h3>${name}</h3>${role ? `<p><strong>${role}</strong></p>` : ""}${bio ? `<p>${bio}</p>` : ""}</div></article>`;
        }).join("");
      });
    } catch (e) { console.warn("Committee data unavailable", e); }
  }
  function compressImage(file) {
    return new Promise((resolve,reject) => {
      if (!file) return resolve("");
      if (!/^image\/(jpeg|png|webp)$/.test(file.type)) return reject(new Error("Please choose a JPG, PNG or WebP image."));
      const reader = new FileReader(); reader.onerror=()=>reject(new Error("Could not read image."));
      reader.onload=()=>{ const img=new Image(); img.onerror=()=>reject(new Error("Invalid image.")); img.onload=()=>{ const scale=Math.min(1,600/Math.max(img.width,img.height)); const c=document.createElement("canvas"); c.width=Math.round(img.width*scale); c.height=Math.round(img.height*scale); c.getContext("2d").drawImage(img,0,0,c.width,c.height); resolve(c.toDataURL("image/jpeg",0.72)); }; img.src=reader.result; }; reader.readAsDataURL(file);
    });
  }
  $("#memberPhoto")?.addEventListener("change", async e => { const preview=$("#memberPhotoPreview"); try { const data=await compressImage(e.target.files[0]); $("[name=photoData]").value=data; if(data){preview.src=data;preview.hidden=false;} else preview.hidden=true; } catch(err){ e.target.value=""; $("#memberStatus").textContent=err.message; } });
  $("#memberForm")?.addEventListener("submit", async e => { e.preventDefault(); const form=e.currentTarget; const status=$("#memberStatus"); try { const file=$("#memberPhoto")?.files[0]; if(file && !$("[name=photoData]").value) $("[name=photoData]").value=await compressImage(file); const data=Object.fromEntries(new FormData(form).entries()); data.language=lang; if(data.phone) data.phone=normalizeBangladeshPhone(data.phone); data.applicationType="membership"; await submitPayload("registerMember",data,status,form); } catch(err){ status.textContent=err.message; } });
  async function submitPayload(action,data,status,form) {
    if (!API) { status.textContent="API URL is missing."; return; }
    const button=form.querySelector("button[type=submit]"); button.disabled=true; status.textContent=lang === "bn" ? "জমা হচ্ছে…" : "Submitting…";
    try { const response=await fetch(API,{method:"POST",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify({action,data})}); const result=await response.json(); if(!result.success) throw new Error(result.error||"Submission failed"); status.textContent=lang === "bn" ? "আবেদন জমা হয়েছে। অনুমোদনের পর সদস্য নম্বর ইমেইলে পাঠানো হবে।" : "Application submitted. Your membership number will be emailed after approval."; if(data.email && result.confirmationEmailSent === false) status.textContent += lang === "bn" ? " তবে confirmation email পাঠানো যায়নি; Apps Script execution log দেখুন।" : " Confirmation email failed; check Apps Script execution logs."; if(result.adminEmailSent === false) status.textContent += lang === "bn" ? " Admin notification পাঠানো যায়নি; MailApp permission পরীক্ষা করুন।" : " Admin notification failed; check MailApp permissions."; form.reset(); $("#memberPhotoPreview").hidden=true; $("[name=photoData]").value=""; }
    catch(err){ status.textContent=(lang === "bn" ? "জমা দেওয়া যায়নি: " : "Could not submit: ")+err.message; }
    finally { button.disabled=false; }
  }
  function boot() {
    applyLanguage(); loadRepositoryImages(); initDonorFinder(); const year = $("#year"); if (year) year.textContent = new Date().getFullYear();
    load("Projects", "#projectsGrid", ["titleBn", "titleEn", "descriptionBn", "descriptionEn"]);
    load("Programs", "#programsGrid", ["titleBn", "titleEn", "descriptionBn", "descriptionEn"]);
    load("Members", "#membersGrid", ["name", "name", "bioBn", "bioEn"], "photo");
    load("NewsEvents", "#newsGrid", ["titleBn", "titleEn", "descriptionBn", "descriptionEn"]);
    loadGallery(); loadCommitteeSections();
  }
  document.addEventListener("DOMContentLoaded", boot);
})();
