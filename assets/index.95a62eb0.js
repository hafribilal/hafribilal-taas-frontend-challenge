var R=Object.defineProperty;var E=(e,t,r)=>t in e?R(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var c=(e,t,r)=>(E(e,typeof t!="symbol"?t+"":t,r),r);import{r as L,o as p,c as d,w as h,a as O,T as x,S,b as l,d as B,e as T,f as v,g as y,h as U,i as j,P as _,j as k,k as D,l as $}from"./vendor.283b39d3.js";const Y=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function r(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerpolicy&&(n.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?n.credentials="include":o.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(o){if(o.ep)return;o.ep=!0;const n=r(o);fetch(o.href,n)}};Y();var z=(e,t)=>{const r=e.__vccOpts||e;for(const[s,o]of t)r[s]=o;return r};const N={},K={class:"root mb-auto"},Z=l("div",{class:"h-full w-full mb-auto flex justify-center items-center text-black text-xl"}," Loading... ",-1),H=l("footer",{class:"footer"},[T(" coded with \u2764\uFE0F for "),l("strong",{class:"font-bold"},"YouCan")],-1);function M(e,t){const r=L("router-view");return p(),d(r,null,{default:h(({Component:s})=>[O(x,{name:"hello",mode:"out-in"},{default:h(()=>[(p(),d(S,null,{fallback:h(()=>[Z]),default:h(()=>[l("main",K,[(p(),d(B(s)))])]),_:2},1024))]),_:2},1024),H]),_:1})}var V=z(N,[["render",M]]);const q="modulepreload",b={},W="/",P=function(t,r){return!r||r.length===0?t():Promise.all(r.map(s=>{if(s=`${W}${s}`,s in b)return;b[s]=!0;const o=s.endsWith(".css"),n=o?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${s}"]${n}`))return;const a=document.createElement("link");if(a.rel=o?"stylesheet":q,o||(a.as="script",a.crossOrigin=""),a.href=s,document.head.appendChild(a),o)return new Promise((w,C)=>{a.addEventListener("load",w),a.addEventListener("error",()=>C(new Error(`Unable to preload CSS for ${s}`)))})})).then(()=>t())};var u={page:1,per_page:50};const F=v("repository",{state:()=>({id:0,name:"",full_name:"",description:"",branches:Array(),commits:Array(),default_branch:"master",downloads_url:"",has_pages:!1,created_at:new Date}),getters:{getUser:()=>f(),getTimeline:e=>e.commits.reduce(function(t,r){const s=y(r.date).format("YYYY-MM-DD");return t[s]=t[s]||[],t[s].push(r),t},Object.create(null)),getDefaultBranche:e=>e.default_branch},actions:{async setRepository(e){return new Promise(t=>{t(Object.assign(this,e)),this.branches=new Array,this.commits=new Array}).then(t=>(this.fetchBranches(),this.fetchCommits(),t))},async setRepositoryById(e){const t=this.getUser.repos.findIndex(s=>s.id===e),r=this.getUser.repos[t];return this.setRepository(r)},fetchRepositories(){return this.github.fetchRepositories(this.getUser.getAuthId).then(e=>(e.sort((t,r)=>new Date(r.created_at).getTime()-new Date(t.created_at).getTime()),this.setRepository(e[0]),e))},fetchBranches(){return this.github.fetchRepositoryBranches(this.getUser.getAuthId,this.full_name).then(e=>{Array.isArray(e)?this.branches=e.map(t=>({name:t.name,protected:t.protected,sha:t.commit.sha})):this.branches.push({name:e.name,protected:e.protected,sha:e.commit.sha})})},fetchCommits(e){return this.github.fetchRepositoryCommits(this.getUser.getAuthId,this.full_name,e,u).then(t=>{if(Array.isArray(t))this.commits=new Array,this.commits=t.map(r=>{const s=r.commit.message.split(`
`),o=s[0];s.shift();const n=s.join(`\r
`);return{author:Object.assign(r.commit.author,r.author||{}),message:o,description:n,verification:r.commit.verification,comment_count:r.commit.comment_count,date:r.commit.author.date,sha:r.sha}});else{this.commits=new Array;const r=t.commit.message.split(`
`),s=r[0];r.shift();const o=r.join(`\r
`);this.commits.push({author:t.author,message:s,description:o,verification:t.verification,comment_count:t.comment_count,date:t.committer.date,sha:t.sha})}})},fetchCommitsNext(e){this.nextPage,this.fetchCommits(e)},fetchCommitsPrev(e){this.prevPage,this.fetchCommits(e)},resetPagination(){return u={page:1,per_page:25}},nextPage(){return++u.page},prevPage(){return--u.page}}}),f=v("user",{state:()=>({authId:"",login:"",name:"",bio:"",avatar_url:"",location:"",repos:new Array}),getters:{getAuthId:e=>e.authId?e.authId:e.authId=localStorage.authId,isConnected:e=>Boolean(e.authId)||localStorage.hasOwnProperty("authId"),getUsername:e=>e.login,getRepoTitles:e=>e.repos.map(t=>t.name),getCurrentRepository:()=>F()},actions:{search(e,t="name"){if(Boolean(e))switch(t){case"name":return this.repos.filter(r=>r.name.includes(e));default:return this.repos}else return this.repos},async connect(){return this.github.connect().then(e=>(this.authId=e.authId,localStorage.authId=e.authId)).catch(e=>console.error("It failed!",e))},async fetchProfile(){return this.github.fetchProfile(this.getAuthId).then(e=>Object.assign(this,e))},async fetchRepositories(){return this.getCurrentRepository.fetchRepositories().then(e=>this.repos=e)}}}),G=[{path:"/",name:"repos",component:()=>P(()=>import("./Repositories.a26ad521.js"),["/hafribilal-taas-frontend-challenge/assets/Repositories.a26ad521.js","/hafribilal-taas-frontend-challenge/assets/Repositories.d031b6f0.css","/hafribilal-taas-frontend-challenge/assets/vendor.283b39d3.js","/hafribilal-taas-frontend-challenge/assets/TheAlert.f338a7a2.js","/hafribilal-taas-frontend-challenge/assets/TheAlert.4c956a40.css"]),beforeEnter:(e,t,r)=>{const s=f();console.log("isConnected",s.isConnected),s.isConnected?r():r({name:"auth"})},meta:{title:"Repositories Page"}},{path:"/auth",name:"auth",component:()=>P(()=>import("./Auth.2076e5f8.js"),["/hafribilal-taas-frontend-challenge/assets/Auth.2076e5f8.js","/hafribilal-taas-frontend-challenge/assets/Auth.d4ff1a64.css","/hafribilal-taas-frontend-challenge/assets/vendor.283b39d3.js","/hafribilal-taas-frontend-challenge/assets/TheAlert.f338a7a2.js","/hafribilal-taas-frontend-challenge/assets/TheAlert.4c956a40.css"]),beforeEnter:(e,t,r)=>{f().isConnected?r({name:"repos"}):r()},meta:{title:"Authorization Page"}},{path:"/:catchAll(.*)",redirect:"/"}],I=U({history:j(),routes:G});I.beforeEach(e=>{document.title=e.meta.title});const i=class{constructor(){c(this,"PIZZLY_HOSTNAME","https://youcan-coding-challenge.herokuapp.com");c(this,"PIZZLY_PUBLISHABLE_KEY","");c(this,"PIZZLY_SETUP_ID_GITHUB_DEMO_APP","e2df8c0b-a412-41b9-b762-643bd565e494");c(this,"pizzly",new _);this.pizzly=new _({host:this.PIZZLY_HOSTNAME})}api(){return this.pizzly.integration("github")}connect(){return this.api().connect()}async get(t){return this.api().auth(i.secretKey).get(t).then(r=>r.json())}async fetchProfile(t){i.secretKey=t;let r="/user";return this.get(r)}async fetchRepositories(t){i.secretKey=t;let r="/user/repos";return this.get(r)}async fetchRepositoryBranches(t,r){i.secretKey=t;let s=`/repos/${r}/branches`;return this.get(s)}async fetchRepositoryCommits(t,r,s,o={page:1,per_page:20}){i.secretKey=t;let n=`/repos/${r}/commits`+(s?`?page=${o.page}&per_page=${o.per_page}&sha=${s}`:"");return this.get(n)}};let g=i;c(g,"secretKey","secure-secret-key");function J(e){return{github:new g}}const A=k();A.use(J);const m=D(V);y.extend($);m.use(I);m.use(A);m.config.globalProperties.$dayjs=y;m.mount("#app");export{z as _,f as a,I as r,F as u};
