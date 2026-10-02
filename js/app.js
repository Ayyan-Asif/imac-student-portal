/* IMAC Portal - single shared JavaScript file for every page.
   Demo-only authentication/data: passwords are stored in LocalStorage.
   For a real deployment, use a backend with hashed passwords and server-side authorization. */

const STORAGE = {
  users: "imac_users",
  session: "imac_session",
  lectures: "imac_lectures",
  events: "imac_events",
  posts: "imac_posts"
};

const ADMIN = {
  name: "IMAC Developer",
  email: "admin@imac.demo",
  password: "IMACAdmin123!",
  role: "admin"
};

const courses = {
  "1st Semester": ["Programming Fundamentals", "Calculus I", "Digital Logic Design"],
  "2nd Semester": ["Object Oriented Programming", "Data Structures", "Linear Algebra"],
  "3rd Semester": ["Artificial Intelligence", "Automata Theory", "Advanced Database Systems"],
  "4th Semester": ["Machine Learning", "Deep Learning", "Cyber Security Fundamentals"]
};

const seedLectures = [
  {id:"l1",semester:"1st Semester",course:"Programming Fundamentals",title:"Python Programming - Full Beginner Course",creator:"freeCodeCamp.org",url:"https://www.youtube.com/watch?v=rfscVS0vtbw",order:1},
  {id:"l2",semester:"1st Semester",course:"Programming Fundamentals",title:"Variables, Loops and Functions",creator:"Programming with Mosh",url:"https://www.youtube.com/results?search_query=python+variables+loops+functions",order:2},
  {id:"l3",semester:"1st Semester",course:"Programming Fundamentals",title:"Problem Solving with Python",creator:"Corey Schafer",url:"https://www.youtube.com/results?search_query=Corey+Schafer+Python",order:3},
  {id:"l4",semester:"1st Semester",course:"Calculus I",title:"Calculus 1 - Complete Playlist",creator:"Professor Leonard",url:"https://www.youtube.com/results?search_query=Professor+Leonard+Calculus+1",order:1},
  {id:"l5",semester:"1st Semester",course:"Digital Logic Design",title:"Digital Logic - Number Systems & Gates",creator:"Gate Smashers",url:"https://www.youtube.com/results?search_query=Gate+Smashers+Digital+Logic",order:1},
  {id:"l6",semester:"2nd Semester",course:"Object Oriented Programming",title:"OOP Concepts Explained",creator:"freeCodeCamp.org",url:"https://www.youtube.com/results?search_query=OOP+programming+full+course",order:1},
  {id:"l7",semester:"2nd Semester",course:"Data Structures",title:"Data Structures Full Course",creator:"freeCodeCamp.org",url:"https://www.youtube.com/results?search_query=freeCodeCamp+data+structures",order:1},
  {id:"l8",semester:"2nd Semester",course:"Linear Algebra",title:"Essence of Linear Algebra",creator:"3Blue1Brown",url:"https://www.youtube.com/results?search_query=3Blue1Brown+linear+algebra",order:1},
  {id:"l9",semester:"3rd Semester",course:"Artificial Intelligence",title:"Artificial Intelligence Full Course",creator:"Great Learning",url:"https://www.youtube.com/results?search_query=Artificial+Intelligence+full+course",order:1},
  {id:"l10",semester:"3rd Semester",course:"Automata Theory",title:"Theory of Computation / Automata",creator:"Neso Academy",url:"https://www.youtube.com/results?search_query=Neso+Academy+Automata",order:1},
  {id:"l11",semester:"3rd Semester",course:"Advanced Database Systems",title:"DBMS Complete Course",creator:"Gate Smashers",url:"https://www.youtube.com/results?search_query=Gate+Smashers+DBMS",order:1},
  {id:"l12",semester:"4th Semester",course:"Machine Learning",title:"Machine Learning Full Course",creator:"freeCodeCamp.org",url:"https://www.youtube.com/results?search_query=freeCodeCamp+Machine+Learning",order:1},
  {id:"l13",semester:"4th Semester",course:"Deep Learning",title:"Deep Learning Fundamentals",creator:"MIT OpenCourseWare",url:"https://www.youtube.com/results?search_query=MIT+OpenCourseWare+Deep+Learning",order:1},
  {id:"l14",semester:"4th Semester",course:"Cyber Security Fundamentals",title:"Cyber Security Full Course",creator:"freeCodeCamp.org",url:"https://www.youtube.com/results?search_query=freeCodeCamp+Cyber+Security",order:1}
];

const seedEvents = [
  {id:"e1",name:"IMAC Welcome Meetup",date:"2026-10-08",location:"IMAC Common Room",organizer:"IMAC Student Community",description:"Meet fellow students, introduce yourself and discover student activities."},
  {id:"e2",name:"AI Project Showcase",date:"2026-10-17",location:"UET Main Campus",organizer:"IMAC",description:"Student teams present practical AI and ML projects."},
  {id:"e3",name:"Cyber Security Awareness Session",date:"2026-10-24",location:"Seminar Hall",organizer:"IMAC",description:"A beginner-friendly session about safer digital habits and cyber security."}
];

const seedPosts = [
  {id:"p1",name:"Hamza",role:"Senior",text:"Does anyone have a good resource for Automata Theory? I am revising regular expressions this week.",time:"2 hours ago"},
  {id:"p2",name:"Sara",role:"Junior",text:"Where can we find the timetable for next week? Also looking for project partners.",time:"5 hours ago"},
  {id:"p3",name:"Usman",role:"Senior",text:"For ML beginners: start with Python, NumPy, Pandas and basic statistics before jumping into deep learning.",time:"Yesterday"}
];

function load(key, fallback){
  const raw = localStorage.getItem(key);
  if(!raw){ localStorage.setItem(key, JSON.stringify(fallback)); return JSON.parse(JSON.stringify(fallback)); }
  try { return JSON.parse(raw); } catch { localStorage.setItem(key, JSON.stringify(fallback)); return JSON.parse(JSON.stringify(fallback)); }
}
function save(key, value){ localStorage.setItem(key, JSON.stringify(value)); }
function getSession(){ try{return JSON.parse(localStorage.getItem(STORAGE.session)||"null");}catch{return null;} }
function esc(value){ const d=document.createElement("div"); d.textContent=value ?? ""; return d.innerHTML; }
function fmtDate(date){ return new Date(date+"T12:00:00").toLocaleDateString(undefined,{weekday:"short",day:"numeric",month:"short",year:"numeric"}); }
function toast(message){ const t=document.createElement("div"); t.className="toast"; t.textContent=message; document.body.appendChild(t); setTimeout(()=>t.remove(),2600); }

function applyTheme(theme){
  document.documentElement.dataset.theme = theme;
  const button = document.getElementById("themeToggle");
  if(button){
    const dark = theme === "dark";
    button.textContent = dark ? "☀" : "☾";
    button.title = dark ? "Switch to light mode" : "Switch to dark mode";
    button.setAttribute("aria-label", button.title);
  }
}
function initTheme(){
  const saved = localStorage.getItem("imac_theme");
  const preferred = saved || (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  applyTheme(preferred);
  document.getElementById("themeToggle")?.addEventListener("click", ()=>{
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    localStorage.setItem("imac_theme", next);
    applyTheme(next);
  });
}

function renderHeader(){
  const header=document.getElementById("site-header");
  if(!header)return;
  const session=getSession();
  const page=document.body.dataset.page;
  const links=[
    ["index.html","Home","home"],["timetable.html","Timetable","timetable"],["lectures.html","Lectures","lectures"],
    ["common-room.html","Common Room","common"],["events.html","Events","events"],["about.html","About","about"]
  ];
  header.innerHTML=`<header class="site-header"><nav class="nav" id="mainNav">
    <a class="brand" href="index.html"><img class="brand-logo" src="assets/imac-logo.svg" alt="IMAC logo"><span class="logo-mark">IMAC</span><span class="brand-text">IMAC Portal<small>UET LAHORE</small></span></a>
    <button class="mobile-toggle" id="mobileToggle" aria-label="Menu">☰</button>
    <div class="nav-links">${links.map(x=>`<a href="${x[0]}" class="${page===x[2]?"active":""}">${x[1]}</a>`).join("")}</div>
    <div class="nav-user"><button class="theme-toggle" id="themeToggle" type="button" aria-label="Toggle dark mode" title="Toggle dark mode">☾</button>${session
      ? `<span class="text-xs font-bold hidden sm:inline">${esc(session.name)}</span>${session.role==="admin"?`<a class="mini-btn" href="admin.html">Admin</a>`:""}<button class="mini-btn" id="logoutBtn">Log out</button>`
      : `<a class="btn btn-small btn-outline" href="signin.html">Sign in</a><a class="btn btn-small btn-primary" href="signup.html">Sign up</a>`}
    </div>
  </nav></header>`;
  document.getElementById("mobileToggle")?.addEventListener("click",()=>document.getElementById("mainNav").classList.toggle("mobile-open"));
  document.getElementById("logoutBtn")?.addEventListener("click",()=>{localStorage.removeItem(STORAGE.session); toast("Signed out."); setTimeout(()=>location.href="index.html",450);});
}
function renderFooter(){
  const footer=document.getElementById("site-footer");
  if(!footer)return;
  footer.innerHTML=`<footer class="site-footer"><div class="footer-grid">
    <div><div class="brand"><span class="logo-mark">IMAC</span><span class="brand-text text-white">IMAC Portal<small class="!text-slate-400">UET LAHORE</small></span></div><p class="mt-4 max-w-sm">A vibrant student portal concept for learning, collaboration and campus life.</p></div>
    <div><h3>Explore</h3><a class="footer-link" href="dashboard.html">Dashboard</a><a class="footer-link" href="lectures.html">Lectures</a><a class="footer-link" href="events.html">Events</a><a class="footer-link" href="common-room.html">Common Room</a></div>
    <div><h3>Contact us</h3><a class="footer-link" href="mailto:imac.portal@example.com">✉ imac.portal@example.com</a><a class="footer-link" href="tel:+924299000000">☎ +92 42 9900 0000</a><p class="mt-3">UET Lahore, Pakistan</p></div>
  </div><div class="footer-bottom">© ${new Date().getFullYear()} IMAC Portal • Web Technology Project Demo</div></footer>`;
}

function initAuth(){
  const signUp=document.getElementById("signupForm");
  if(signUp) signUp.addEventListener("submit",(e)=>{
    e.preventDefault();
    const name=document.getElementById("signupName").value.trim();
    const email=document.getElementById("signupEmail").value.trim().toLowerCase();
    const pass=document.getElementById("signupPassword").value;
    const confirm=document.getElementById("signupConfirm").value;
    const msg=document.getElementById("signupMessage");
    if(!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return showMsg(msg,"Enter a valid email address.","error");
    if(pass.length<8)return showMsg(msg,"Password must be at least 8 characters.","error");
    if(pass!==confirm)return showMsg(msg,"Passwords do not match.","error");
    if(email===ADMIN.email)return showMsg(msg,"That email is reserved for the administrator.","error");
    const users=load(STORAGE.users,[]);
    if(users.some(u=>u.email===email))return showMsg(msg,"An account with this email already exists.","error");
    users.push({id:Date.now(),name,email,password:pass,role:"student"});
    save(STORAGE.users,users);
    showMsg(msg,"Account created. Redirecting to sign in...","success");
    setTimeout(()=>location.href="signin.html",700);
  });
  const signIn=document.getElementById("signinForm");
  if(signIn) signIn.addEventListener("submit",(e)=>{
    e.preventDefault();
    const email=document.getElementById("signinEmail").value.trim().toLowerCase();
    const pass=document.getElementById("signinPassword").value;
    const msg=document.getElementById("signinMessage");
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))return showMsg(msg,"Please enter a valid email address.","error");
    let account=null;
    if(email===ADMIN.email && pass===ADMIN.password) account=ADMIN;
    else account=load(STORAGE.users,[]).find(u=>u.email===email && u.password===pass);
    if(!account)return showMsg(msg,"Email or password is incorrect.","error");
    save(STORAGE.session,{name:account.name,email:account.email,role:account.role});
    location.href=account.role==="admin"?"admin.html":"dashboard.html";
  });
}
function showMsg(el,text,type){ el.textContent=text; el.className=`form-message ${type}`; }

function initDashboard(){
  const session=getSession(); if(!session)return;
  const title=document.getElementById("welcomeTitle"); if(title)title.textContent=`Welcome, ${session.name.split(" ")[0]}.`;
  const date=document.getElementById("dashboardDate"); if(date)date.textContent=new Date().toLocaleDateString(undefined,{weekday:"long",day:"numeric",month:"long"});
  const events=load(STORAGE.events,seedEvents).sort((a,b)=>a.date.localeCompare(b.date));
  const posts=load(STORAGE.posts,seedPosts);
  const ebox=document.getElementById("dashboardEvents"), pbox=document.getElementById("dashboardPosts");
  if(ebox) ebox.innerHTML=events.slice(0,3).map(e=>`<div class="mini-event"><strong>${esc(e.name)}</strong><span>${fmtDate(e.date)} • ${esc(e.location)}</span></div>`).join("");
  if(pbox) pbox.innerHTML=posts.slice(-3).reverse().map(p=>`<div class="mini-post"><strong>${esc(p.name)} <span>· ${esc(p.role)}</span></strong><span>${esc(p.text).slice(0,90)}${p.text.length>90?"…":""}</span></div>`).join("");
  const cnt=document.getElementById("eventCount");if(cnt)cnt.textContent=`${events.length} event${events.length===1?"":"s"} listed`;
  updateNextClass(document.getElementById("nextClassText"));
}

const timetableData={
  Monday:[["09:00–10:00","Artificial Intelligence","Dr. Sana","Lab 3"],["10:15–11:15","Automata Theory","Engr. Ali","Room 204"],["12:00–13:00","Advanced Database Systems","Ms. Hira","Room 106"]],
  Tuesday:[["09:00–10:00","Machine Learning","Dr. Hamid","Lab 5"],["11:00–12:00","Deep Learning","Dr. Sana","Lab 2"],["13:00–14:00","Cyber Security Fundamentals","Engr. Bilal","Room 101"]],
  Wednesday:[["10:00–11:00","Artificial Intelligence","Dr. Sana","Lab 3"],["12:00–13:00","Automata Theory","Engr. Ali","Room 204"]],
  Thursday:[["09:00–10:00","Machine Learning","Dr. Hamid","Lab 5"],["11:00–12:00","Advanced Database Systems","Ms. Hira","Room 106"],["14:00–15:00","Deep Learning","Dr. Sana","Lab 2"]],
  Friday:[["10:00–11:00","Cyber Security Fundamentals","Engr. Bilal","Room 101"],["12:00–13:00","Project / Professional Practice","IMAC Faculty","Room 202"]]
};
function timeToMinutes(t){const [h,m]=t.split(":").map(Number);return h*60+m;}
function updateNextClass(el){
  if(!el)return;
  const day=new Date().toLocaleDateString("en-US",{weekday:"long"});
  const classes=timetableData[day]||[];
  const now=new Date().getHours()*60+new Date().getMinutes();
  const next=classes.find(c=>timeToMinutes(c[0].slice(0,5))>now);
  el.textContent=next?`Next: ${next[1]} at ${next[0].slice(0,5)}`:"No more classes today";
}
function initTimetable(){
  const tabs=document.getElementById("dayTabs"),body=document.getElementById("timetableBody"),banner=document.getElementById("nextClassBanner");if(!tabs||!body)return;
  const days=Object.keys(timetableData);let selected=new Date().toLocaleDateString("en-US",{weekday:"long"});if(!timetableData[selected])selected="Monday";
  function render(){
    tabs.innerHTML=days.map(d=>`<button class="tab ${selected===d?"active":""}" data-day="${d}">${d}</button>`).join("");
    tabs.querySelectorAll(".tab").forEach(b=>b.addEventListener("click",()=>{selected=b.dataset.day;render();}));
    const now=new Date().getHours()*60+new Date().getMinutes();const today=new Date().toLocaleDateString("en-US",{weekday:"long"});
    body.innerHTML=timetableData[selected].map(c=>{const start=timeToMinutes(c[0].slice(0,5));let status="Upcoming";if(selected===today&&start<=now)status="Completed";return `<tr><td><strong>${c[0]}</strong></td><td>${c[1]}</td><td>${c[2]}</td><td>${c[3]}</td><td><span class="status ${status==="Completed"?"done":"next"}">${status}</span></td></tr>`}).join("");
    const next=timetableData[selected].find(c=>timeToMinutes(c[0].slice(0,5))>now);
    banner.textContent=next?`Next on ${selected}: ${next[1]} at ${next[0].slice(0,5)} in ${next[3]}`:`${selected}: timetable loaded • no upcoming class in the sample schedule`;
  }
  render();
}

function initLectures(){
  const semBox=document.getElementById("semesterChoices"),courseBox=document.getElementById("courseChoices"),videoBox=document.getElementById("videoList");if(!semBox)return;
  const data=load(STORAGE.lectures,seedLectures);let selectedSem=null,selectedCourse=null;
  semBox.innerHTML=Object.keys(courses).map(s=>`<div class="choice-card" data-sem="${s}"><div class="tag">${s.split(" ")[0]} SEM</div><strong>${s}</strong><span>${courses[s].length} sample courses</span></div>`).join("");
  semBox.querySelectorAll(".choice-card").forEach(card=>card.addEventListener("click",()=>{
    selectedSem=card.dataset.sem;selectedCourse=null;document.getElementById("courseSection").classList.remove("hidden");document.getElementById("videoSection").classList.add("hidden");document.getElementById("selectedSemester").textContent=selectedSem;
    courseBox.innerHTML=courses[selectedSem].map(c=>`<div class="course-card" data-course="${c}"><span class="tag">${data.filter(x=>x.semester===selectedSem&&x.course===c).length} videos</span><h3>${esc(c)}</h3><p class="muted small">Open the curated chronological playlist.</p></div>`).join("");
    courseBox.querySelectorAll(".course-card").forEach(x=>x.addEventListener("click",()=>showVideos(selectedSem,x.dataset.course)));
    document.getElementById("courseSection").scrollIntoView({behavior:"smooth",block:"start"});
  }));
  function showVideos(sem,course){
    selectedCourse=course;document.getElementById("videoSection").classList.remove("hidden");document.getElementById("videoTitle").textContent=course;document.getElementById("videoList").innerHTML="";
    const rows=data.filter(x=>x.semester===sem&&x.course===course).sort((a,b)=>a.order-b.order);
    videoBox.innerHTML=rows.length?rows.map(v=>`<div class="video-row"><div class="video-number">${v.order}</div><div class="video-meta"><strong>${esc(v.title)}</strong><span>${esc(v.creator)} • ${esc(v.semester)}</span></div><div class="video-actions"><a class="youtube-btn" href="${esc(v.url)}" target="_blank" rel="noopener">▶ YouTube</a></div></div>`).join(""):`<div class="panel"><p class="muted">No lecture content has been added for this course yet.</p></div>`;
    document.getElementById("videoSection").scrollIntoView({behavior:"smooth",block:"start"});
  }
  document.getElementById("backToCourses")?.addEventListener("click",()=>document.getElementById("courseSection").scrollIntoView({behavior:"smooth",block:"start"}));
}

function initCommonRoom(){
  const list=document.getElementById("postList");if(!list)return;
  const render=()=>{const posts=load(STORAGE.posts,seedPosts);list.innerHTML=posts.slice().reverse().map(p=>`<article class="post-card"><div class="post-head"><strong>${esc(p.name)} <span class="muted">· ${esc(p.role)}</span></strong><span>${esc(p.time)}</span></div><div class="post-body">${esc(p.text)}</div><div class="post-footer">IMAC Common Room</div></article>`).join("");};
  render();
  document.getElementById("focusPost")?.addEventListener("click",()=>document.getElementById("postText")?.focus());
  document.getElementById("postForm")?.addEventListener("submit",(e)=>{
    e.preventDefault();const field=document.getElementById("postText"),text=field.value.trim();if(!text)return;
    const session=getSession();const posts=load(STORAGE.posts,seedPosts);posts.push({id:"p"+Date.now(),name:session?.name||"Guest student",role:session?.role==="admin"?"Developer":"Student",text,time:"Just now"});save(STORAGE.posts,posts);field.value="";render();toast("Your post was added.");
  });
}

function initEvents(){
  const list=document.getElementById("eventsList");if(!list)return;
  const render=()=>{const events=load(STORAGE.events,seedEvents).sort((a,b)=>a.date.localeCompare(b.date));list.innerHTML=events.map(e=>`<article class="event-card"><span class="event-date">${fmtDate(e.date)}</span><h3>${esc(e.name)}</h3><p>${esc(e.description)}</p><div class="event-meta"><span>📍 ${esc(e.location)}</span><span>👤 ${esc(e.organizer)}</span></div></article>`).join("");};
  render();
  document.getElementById("openEventForm")?.addEventListener("click",()=>document.getElementById("eventFormWrap").classList.remove("hidden"));
  document.getElementById("closeEventForm")?.addEventListener("click",()=>document.getElementById("eventFormWrap").classList.add("hidden"));
  document.getElementById("eventForm")?.addEventListener("submit",(e)=>{
    e.preventDefault();const session=getSession();const events=load(STORAGE.events,seedEvents);
    events.push({id:"e"+Date.now(),name:document.getElementById("eventName").value.trim(),date:document.getElementById("eventDate").value,location:document.getElementById("eventLocation").value.trim(),organizer:document.getElementById("eventOrganizer").value.trim()+(session?` (${session.name})`:""),description:document.getElementById("eventDescription").value.trim()});
    save(STORAGE.events,events);e.target.reset();document.getElementById("eventFormWrap").classList.add("hidden");render();toast("Event suggestion added.");
  });
}

function initAdmin(){
  const guard=document.getElementById("adminGuard"),panel=document.getElementById("adminPanel");if(!guard||!panel)return;
  const session=getSession();
  if(!session||session.role!=="admin"){
    guard.classList.remove("hidden");guard.innerHTML=`<h2>Admin access required</h2><p class="muted">Sign in with the demo developer account to manage lecture content.</p><a class="btn btn-primary" href="signin.html">Go to Sign In</a>`;return;
  }
  panel.classList.remove("hidden");
  let lectures=load(STORAGE.lectures,seedLectures), editingId=null;
  const semester=document.getElementById("adminSemester"),course=document.getElementById("adminCourse"),form=document.getElementById("lectureForm");
  function refreshCourses(){course.innerHTML=(courses[semester.value]||[]).map(c=>`<option>${c}</option>`).join("");}
  semester.addEventListener("change",refreshCourses);refreshCourses();
  function render(){
    lectures=load(STORAGE.lectures,seedLectures).sort((a,b)=>a.semester.localeCompare(b.semester)||a.course.localeCompare(b.course)||a.order-b.order);
    const list=document.getElementById("adminLectureList");
    list.innerHTML=lectures.map(v=>`<div class="admin-item"><strong>${esc(v.title)}</strong><small>${esc(v.semester)} • ${esc(v.course)} • ${esc(v.creator)} • Order ${v.order}</small><div class="admin-actions"><button class="btn btn-small btn-outline edit-lecture" data-id="${v.id}">Edit</button><button class="btn btn-small btn-danger delete-lecture" data-id="${v.id}">Delete</button></div></div>`).join("");
    list.querySelectorAll(".edit-lecture").forEach(b=>b.addEventListener("click",()=>startEdit(b.dataset.id)));
    list.querySelectorAll(".delete-lecture").forEach(b=>b.addEventListener("click",()=>deleteLecture(b.dataset.id)));
  }
  function resetForm(){editingId=null;document.getElementById("lectureFormTitle").textContent="Add lecture";form.reset();semester.value="1st Semester";refreshCourses();document.getElementById("adminOrder").value=1;}
  function startEdit(id){
    const v=lectures.find(x=>x.id===id);if(!v)return;editingId=id;document.getElementById("lectureFormTitle").textContent="Edit lecture";semester.value=v.semester;refreshCourses();course.value=v.course;document.getElementById("adminVideoTitle").value=v.title;document.getElementById("adminVideoUrl").value=v.url;document.getElementById("adminCreator").value=v.creator;document.getElementById("adminOrder").value=v.order;form.scrollIntoView({behavior:"smooth",block:"center"});
  }
  function deleteLecture(id){const v=lectures.find(x=>x.id===id);if(!v)return;if(confirm(`Delete "${v.title}"?`)){lectures=lectures.filter(x=>x.id!==id);save(STORAGE.lectures,lectures);render();toast("Lecture deleted.");}}
  document.getElementById("newLectureBtn").addEventListener("click",()=>{resetForm();form.scrollIntoView({behavior:"smooth",block:"center"});});
  document.getElementById("cancelEdit").addEventListener("click",resetForm);
  form.addEventListener("submit",(e)=>{
    e.preventDefault();const value={id:editingId||"l"+Date.now(),semester:semester.value,course:course.value,title:document.getElementById("adminVideoTitle").value.trim(),url:document.getElementById("adminVideoUrl").value.trim(),creator:document.getElementById("adminCreator").value.trim(),order:Number(document.getElementById("adminOrder").value)};
    const wasEditing = Boolean(editingId);
    if(wasEditing){lectures=lectures.map(x=>x.id===editingId?value:x)}else lectures.push(value);
    save(STORAGE.lectures,lectures); resetForm(); render(); toast(wasEditing?"Lecture updated.":"Lecture added.");
  });
  render();
}

function gateStudentPages(){
  const page=document.body.dataset.page;
  const protectedPages=["dashboard","common"];
  if(!protectedPages.includes(page))return;
  if(!getSession()){ location.replace("signin.html"); }
}

document.addEventListener("DOMContentLoaded",()=>{
  load(STORAGE.lectures,seedLectures);load(STORAGE.events,seedEvents);load(STORAGE.posts,seedPosts);
  renderHeader();initTheme();renderFooter();gateStudentPages();initAuth();initDashboard();initTimetable();initLectures();initCommonRoom();initEvents();initAdmin();
});
