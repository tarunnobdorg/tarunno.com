(() => {
 const districts = {
  "Bagerhat":"Bagerhat Sadar,Chitalmari,Fakirhat,Kachua,Mollahat,Mongla,Morrelganj, Rampal,Sarankhola",
  "Bandarban":"Bandarban Sadar,Alikadam,Naikhongchhari,Rowangchhari,Ruma,Thanchi,Lama",
  "Barguna":"Barguna Sadar, Amtali,Betagi,Bamna,Patharghata,Taltali",
  "Barishal":"Barishal Sadar,Agailjhara,Babuganj,Bakerganj,Banaripara,Gournadi,Hizla,Mehendiganj,Muladi,Wazirpur",
  "Bhola":"Bhola Sadar,Borhanuddin,Char Fasson,Daulatkhan,Lalmohan,Manpura,Tazumuddin",
  "Bogura":"Bogura Sadar,Adamdighi,Dhunat,Dhunot,Dupchanchia,Gabtali,Kahaloo,Nandigram,Sariakandi,Shajahanpur, Sherpur,Shibganj,Sonatala",
  "Brahmanbaria":"Brahmanbaria Sadar,Ashuganj,Bancharampur,Bijoynagar,Kasba,Nabinagar,Nasirnagar,Sarail,Akhaura",
  "Chandpur":"Chandpur Sadar,Faridganj,Haimchar,Hajiganj,Kachua,Matlab Dakshin,Matlab Uttar,Shahrasti",
  "Chapai Nawabganj":"Chapai Nawabganj Sadar,Bholahat,Gomastapur,Nachole,Shibganj",
  "Chattogram":"Chattogram Sadar,Anwara,Banshkhali,Boalkhali,Chandanaish,Fatikchhari,Hathazari,Karnaphuli,Lohagara,Mirsharai,Patiya,Rangunia,Raozan, Sandwip,Sitakunda",
  "Chuadanga":"Chuadanga Sadar,Alamdanga,Damurhuda,Jibannagar",
  "Cumilla":"Cumilla Adarsha Sadar,Barura,Brahmanpara,Burichang,Chandina,Chauddagram,Daudkandi,Debidwar,Homna,Laksam,Meghna,Monoharganj,Muradnagar,Nangalkot,Titas",
  "Cox's Bazar":"Cox's Bazar Sadar,Chakaria,Eidgaon,Kutubdia,Maheshkhali,Pekua,Ramu, Teknaf,Ukhiya",
  "Dhaka":"Dhamrai,Dohar,Keraniganj,Nawabganj,Savar",
  "Dinajpur":"Dinajpur Sadar,Birampur,Birganj,Biral,Bochaganj,Chirirbandar,Phulbari,Ghoraghat,Hakimpur,Kaharole,Khansama,Parbatipur",
  "Faridpur":"Faridpur Sadar,Alfadanga,Bhanga,Boalmari,Charbhadrasan,Madhukhali,Nagarkanda,Sadarpur,Shaltha",
  "Feni":"Feni Sadar,Chhagalnaiya,Daganbhuiyan,Parshuram,Fulgazi,Sonagazi",
  "Gaibandha":"Gaibandha Sadar,Fulchhari,Gobindaganj,Palashbari,Sadullapur,Saghata,Sundarganj",
  "Gazipur":"Gazipur Sadar, কালীগঞ্জ, কালিয়াকৈর, কাপাসিয়া, শ্রীপুর",
  "Gopalganj":"Gopalganj Sadar,Kashiani,Kotalipara,Muksudpur,Tungipara",
  "Habiganj":"Habiganj Sadar,Ajmiriganj,Baniachong,Chunarughat,Lakhai,Madhabpur,Nabiganj,Shayestaganj",
  "Jamalpur":"Jamalpur Sadar,Bakshiganj,Dewanganj,Islampur,Madarganj,Melandaha,Sarishabari",
  "Jashore":"Jashore Sadar,Abhaynagar,Bagherpara,Chaugachha, ঝিকরগাছা, Keshabpur,Manirampur,Sharsha",
  "Jhalokati":"Jhalokati Sadar,Kanthalia,Nalchity,Rajapur",
  "Jhenaidah":"Jhenaidah Sadar,Harinakunda,Kaliganj,Kotchandpur,Maheshpur,Shailkupa",
  "Joypurhat":"Joypurhat Sadar,Akkelpur,Kalai,Khetlal,Panchbibi",
  "Khagrachhari":"Khagrachhari Sadar,Dighinala,Guimara,Lakshmichhari, Mahalchhari,Manikchhari,Matiranga,Panchhari,Ramgarh",
  "Khulna":"Dacope,Dumuria,Dighalia, কয়রা,Paikgachha,Phultala,Rupsa,Terokhada,Batiaghata",
  "Kishoreganj":"Kishoreganj Sadar,Austagram,Bajitpur,Bhairab,Hossainpur,Itna,Karimganj,Katiadi,Kuliarchar,Mithamain,Nikli, পাকুন্দিয়া,Tarail",
  "Kurigram":"Kurigram Sadar,Bhurungamari,Char Rajibpur,Chilmari,Phulbari,Rajarhat,Raomari,Rowmari,Ulipur,Nageshwari",
  "Kushtia":"Kushtia Sadar,Bheramara,Daulatpur,Khoksa,Kumarkhali,Mirpur",
  "Lakshmipur":"Lakshmipur Sadar, কমলনগর,Raipur,Ramganj,Ramgati",
  "Lalmonirhat":"Lalmonirhat Sadar,Aditmari,Hatibandha,Kaliganj,Patgram",
  "Madaripur":"Madaripur Sadar,Kalkini,Rajoir,Shibchar",
  "Magura":"Magura Sadar,Mohammadpur,Shalikha,Sreepur",
  "Manikganj":"Manikganj Sadar,Daulatpur,Ghior,Harirampur,Saturia,Shibalaya,Singair",
  "Meherpur":"Meherpur Sadar,Gangni,Mujibnagar",
  "Moulvibazar":"Moulvibazar Sadar,Barlekha,Juri,Kamalganj,Kulaura,Rajnagar,Sreemangal",
  "Munshiganj":"Munshiganj Sadar,Gazaria,Lauhajang,Sirajdikhan,Sreenagar,Tongibari",
  "Mymensingh":"Mymensingh Sadar,Bhaluka,Dhobaura,Fulbaria,Gaffargaon,Gauripur,Haluaghat,Ishwarganj, মুক্তাগাছা,Nandail,Phulpur,Trishal",
  "Naogaon":"Naogaon Sadar,Atrai,Badalgachhi,Dhamoirhat,Manda, মহাদেবপুর,Niamatpur,Patnitala,Porsha,Raninagar,Sapahar",
  "Narail":"Narail Sadar,Kalia,Lohagara",
  "Narayanganj":"Narayanganj Sadar,Araihazar,Bandar,Rupganj,Sonargaon",
  "Narsingdi":"Narsingdi Sadar,Belabo,Monohardi,Palash,Raipura,Shibpur",
  "Natore":"Natore Sadar,Bagatipara,Baraigram,Gurudaspur,Lalpur, Singra",
  "Netrokona":"Netrokona Sadar,Atpara,Barhatta,Durgapur,Kalmakanda,Kendua,Khaliajuri,Madan, Mohanganj,Purbadhala",
  "Nilphamari":"Nilphamari Sadar,Dimla,Domar,Jaldhaka,Kishoreganj,Saidpur",
  "Noakhali":"Noakhali Sadar,Begumganj,Chatkhil,Companiganj,Hatiya,Kabirhat, সেনবাগ,Sonaimuri,Subarnachar",
  "Pabna":"Pabna Sadar,Atgharia,Bera,Bhangura,Chatmohar,Faridpur,Ishwardi,Santhia,Sujanagar",
  "Panchagarh":"Panchagarh Sadar,Atwari,Boda,Debiganj,Tetulia",
  "Patuakhali":"Patuakhali Sadar,Bauphal,Dashmina,Dumki,Galachipa,Kalapara,Mirzaganj,Rangabali",
  "Pirojpur":"Pirojpur Sadar,Bhandaria,Indurkani,Kawkhali,Mathbaria,Nazirpur,Nesarabad",
  "Rajbari":"Rajbari Sadar,Baliakandi,Goalandaghat,Pangsha,Kalukhali",
  "Rajshahi":"Bagha,বাঘমারা,Charghat,Durgapur,Gোদাগাড়ী,Mohanpur,Paba,Puthia,Tanore, Rajshahi Sadar",
  "Rangamati":"Rangamati Sadar,Baghaichhari,Barkal,Belaichhari,Juraichhari,Kaptai,Kawkhali,Langadu,Naniarchar,Rajasthali",
  "Rangpur":"Rangpur Sadar,Badarganj,Gangachara,Kaunia,Mithapukur,Pirganj,Pirগাছা,Taraganj",
  "Satkhira":"Satkhira Sadar,Assasuni,Debhata,Kaliganj,শ্যামনগর,Tala,Kolaroa",
  "Shariatpur":"Shariatpur Sadar,Bhedarganj,Damudya,Gosairhat,Naria,Zajira",
  "Sherpur":"Sherpur Sadar,Jhenaigati,Nakla,Nalitabari,Sreebardi",
  "Sirajganj":"Sirajganj Sadar,Belকুচি,Chauhali,Kamarkhanda,Kazipur,Raiganj,Shahjadpur,Tarash,Ullapara",
  "Sunamganj":"Sunamganj Sadar,Bishwambarpur,Chhatak,Derai,Dharampasha,Dowarabazar,Jamalganj,শান্তিগঞ্জ,শাল্লা,Tahirpur",
  "Sylhet":"Sylhet Sadar,Balaganj,Beanibazar,Bishwanath,Companiganj,Fenchuganj,Golapganj,Gowainghat,Jointapur,Kanaighat,Osmaninagar,Zakiganj",
  "Tangail":"Tangail Sadar,Basail,Bhuapur,Delduar,Dhanbari,Ghatail,Gopalpur,Kalihati,Madhupur,Mirzapur,Nagarpur,Sakhipur",
  "Thakurgaon":"Thakurgaon Sadar,Baliadangi,Haripur,Pirganj,Ranisankail"
 };
 const bnDistricts = {"Bagerhat":"বাগেরহাট","Bandarban":"বান্দরবান","Barguna":"বরগুনা","Barishal":"বরিশাল","Bhola":"ভোলা","Bogura":"বগুড়া","Brahmanbaria":"ব্রাহ্মণবাড়িয়া","Chandpur":"চাঁদপুর","Chapai Nawabganj":"চাঁপাইনবাবগঞ্জ","Chattogram":"চট্টগ্রাম","Chuadanga":"চুয়াডাঙ্গা","Cumilla":"কুমিল্লা","Cox's Bazar":"কক্সবাজার","Dhaka":"ঢাকা","Dinajpur":"দিনাজপুর","Faridpur":"ফরিদপুর","Feni":"ফেনী","Gaibandha":"গাইবান্ধা","Gazipur":"গাজীপুর","Gopalganj":"গোপালগঞ্জ","Habiganj":"হবিগঞ্জ","Jamalpur":"জামালপুর","Jashore":"যশোর","Jhalokati":"ঝালকাঠি","Jhenaidah":"ঝিনাইদহ","Joypurhat":"জয়পুরহাট","Khagrachhari":"খাগড়াছড়ি","Khulna":"খুলনা","Kishoreganj":"কিশোরগঞ্জ","Kurigram":"কুড়িগ্রাম","Kushtia":"কুষ্টিয়া","Lakshmipur":"লক্ষ্মীপুর","Lalmonirhat":"লালমনিরহাট","Madaripur":"মাদারীপুর","Magura":"মাগুরা","Manikganj":"মানিকগঞ্জ","Meherpur":"মেহেরপুর","Moulvibazar":"মৌলভীবাজার","Munshiganj":"মুন্সিগঞ্জ","Mymensingh":"ময়মনসিংহ","Naogaon":"নওগাঁ","Narail":"নড়াইল","Narayanganj":"নারায়ণগঞ্জ","Narsingdi":"নরসিংদী","Natore":"নাটোর","Netrokona":"নেত্রকোণা","Nilphamari":"নীলফামারী","Noakhali":"নোয়াখালী","Pabna":"পাবনা","Panchagarh":"পঞ্চগড়","Patuakhali":"পটুয়াখালী","Pirojpur":"পিরোজপুর","Rajbari":"রাজবাড়ী","Rajshahi":"রাজশাহী","Rangamati":"রাঙামাটি","Rangpur":"রংপুর","Satkhira":"সাতক্ষীরা","Shariatpur":"শরীয়তপুর","Sherpur":"শেরপুর","Sirajganj":"সিরাজগঞ্জ","Sunamganj":"সুনামগঞ্জ","Sylhet":"সিলেট","Tangail":"টাঙ্গাইল","Thakurgaon":"ঠাকুরগাঁও"};
 const $=s=>document.querySelector(s);
 function fillDistrict(select){ if(!select)return; const previous=select.value; const isSearch=select.id==='searchDistrict'; select.innerHTML=`<option value="">${document.documentElement.lang==='bn'?(isSearch?'সব জেলা':'জেলা নির্বাচন করুন'):(isSearch?'All districts':'Select district')}</option>`; Object.keys(districts).sort().forEach(d=>{const o=document.createElement('option');o.value=d;o.dataset.bn=bnDistricts[d]||d;o.dataset.en=d;o.textContent=document.documentElement.lang==='bn'?(bnDistricts[d]||d):d;select.appendChild(o);}); select.value=previous||'Panchagarh'; if(isSearch) select.value=previous||'Panchagarh'; }
 const bnUpazila={ 'Panchagarh Sadar':'পঞ্চগড় সদর','Atwari':'আটোয়ারী','Boda':'বোদা','Debiganj':'দেবীগঞ্জ','Tetulia':'তেঁতুলিয়া' };
 function fillUpazila(districtSelect, upazilaSelect){if(!districtSelect||!upazilaSelect)return;const selected=districtSelect.value;upazilaSelect.innerHTML=`<option value="">${document.documentElement.lang==='bn'?'সব থানা / উপজেলা':'All police stations / upazilas'}</option>`;(districts[selected]||'').split(',').map(x=>x.trim()).filter(Boolean).forEach(name=>{const o=document.createElement('option');o.value=name;o.dataset.bn=bnUpazila[name]||name;o.dataset.en=name;o.textContent=document.documentElement.lang==='bn'?(bnUpazila[name]||name):name;upazilaSelect.appendChild(o);});}
 const searchDistrict=$('#searchDistrict'),searchArea=$('#searchArea'),donorDistrict=$('#donorDistrict'),donorUpazila=$('#donorUpazila');
 fillDistrict(searchDistrict);fillDistrict(donorDistrict); if(searchDistrict){searchDistrict.value='Panchagarh';fillUpazila(searchDistrict,searchArea);} if(donorDistrict){donorDistrict.value='Panchagarh';fillUpazila(donorDistrict,donorUpazila);}
 searchDistrict?.addEventListener('change',()=>{fillUpazila(searchDistrict,searchArea);});
 donorDistrict?.addEventListener('change',()=>{fillUpazila(donorDistrict,donorUpazila);});
 const memberWrap=$('#membershipFormWrap'),memberForm=$('#memberForm'),donorWrap=$('#donorRegistrationWrap');
 function showTarget(){if(location.hash==='#membership-form' || location.hash==='#memberForm'){if(memberWrap)memberWrap.hidden=false;memberWrap?.scrollIntoView({behavior:'smooth',block:'start'});}if(location.hash==='#donor-registration'){if(donorWrap)donorWrap.hidden=false;donorWrap?.scrollIntoView({behavior:'smooth',block:'start'});}}
 document.querySelectorAll('a[href="#membership-form"],a[href="#memberForm"]').forEach(a=>a.addEventListener('click',()=>{if(memberWrap)memberWrap.hidden=false;}));
 document.querySelectorAll('a[href="#donor-registration"]').forEach(a=>a.addEventListener('click',()=>{if(donorWrap)donorWrap.hidden=false;}));
 window.addEventListener('hashchange',showTarget);showTarget();
 const langButton=document.querySelector('#languageToggle'); langButton?.addEventListener('click',()=>setTimeout(()=>{const keepSearch=searchDistrict?.value||'Panchagarh',keepDonor=donorDistrict?.value||'Panchagarh',keepSearchArea=searchArea?.value||'',keepDonorArea=donorUpazila?.value||'';fillDistrict(searchDistrict);fillDistrict(donorDistrict);if(searchDistrict){searchDistrict.value=keepSearch;fillUpazila(searchDistrict,searchArea);searchArea.value=keepSearchArea;}if(donorDistrict){donorDistrict.value=keepDonor;fillUpazila(donorDistrict,donorUpazila);donorUpazila.value=keepDonorArea;}},0));
})();
