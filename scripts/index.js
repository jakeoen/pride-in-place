// find all sections in the doc
const getSections = () => [...document.querySelectorAll("section")];
// set id of each section
const addSectionID = (section) => {
    section.setAttribute("id", encodeURI(section.querySelector("h2").innerText));
    return section;
};
// given a section, make the corresponding nav element
const makeTab = (section) => {
    const a = document.createElement("a");
    const li = document.createElement("li");
    const id = section.getAttribute("id");
    a.setAttribute("href", "#" + id);
    a.innerText = id;
    li.appendChild(a);
    return li;
};
const makeTabMapEntry = (section) => [makeTab(section), section];
// dispatcher to handle tab changes
const makeTabClickHandler = (tabMap) =>
    (event) => {
        // event.preventDefault();
        const path = event.path;
        const activeTab = path.find((node) => node.tagName == "LI");
        const activeSection = tabMap.get(activeTab);
        const hash = activeTab.querySelector("a").getAttribute("href");
        // change URL to reflect tab state
        window.location.hash = hash;
        // hide all sections and inactivate all tabs
        tabMap.forEach((section, tab) => {
            section.classList.add("collapsed");
            tab.classList.remove("activeTab");
        });
        activeSection.classList.remove("collapsed");
        activeTab.classList.add("activeTab");
    };
const makeTabBar = (nav) => {
    const sections = getSections();
    sections.forEach(addSectionID);
    const tabMap = new Map(sections.map(makeTabMapEntry));
    //
    const tabList = document.createElement("ul");
    tabMap.forEach((_, tab) => tabList.appendChild(tab));
    nav.appendChild(tabList);
    nav.addEventListener("click", makeTabClickHandler(tabMap));
    return nav;
};
const initialize = () => makeTabBar(document.querySelector("nav"));
window.addEventListener("load", initialize);
