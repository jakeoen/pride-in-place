// find all sections in the doc
const getSections = () => [...document.querySelectorAll("section")];
// get the first h2 in a section
const getSectionHeader = (section) => section.querySelector("h2");
// set the id of the section to uriencoded header text
const idSection = (section) => section
    .setAttribute("id",
        encodeURI(getSectionHeader(section).innerText));
// idSection for all sections
const idSections = () => getSections().forEach(idSection);
//
// compose nav elements
const makeNavElt = (name, target) => {
    const a = document.createElement("a");
    const li = document.createElement("li");
    a.setAttribute("href", `#${target}`);
    a.innerText = name;
    li.appendChild(a);
    return li;
};
//
const makeNavEltForSection = (section) => makeNavElt(section.id, section.id);
//
//
const makeNav = () => {
    idSections();
    const sectionList = getSections();
    // 
    const collapseSections = () => sectionList.forEach((section) => section.classList.add("hidden"));
    const expandSection = (section) => section.classList.remove("hidden");
    //
    const changeSection = (e) => console.log(e);
    const nav = document.querySelector("nav");
    const ul = document.createElement("ul");
    const navElts = sectionList.map(makeNavEltForSection);
    navElts.forEach((elt) => ul.appendChild(elt));
    nav.addEventListener("click", changeSection);
    nav.appendChild(ul);
    return nav;
};

const initialize = () => makeNav();
window.addEventListener("load", initialize);
