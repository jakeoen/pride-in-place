// find all sections in the doc
const getSections = () => [...document.querySelectorAll("section")];
// set id of each section
const addSectionID = (section) => {
    section.setAttribute("id", encodeURI(section.querySelector("h2").innerText));
    section.setAttribute("role", "tabpanel");
    return section;
};
// given a section, make the corresponding nav element
const makeTab = (section) => {
    const id = section.getAttribute("id");
    const text = document.createTextNode(id);
    const li = document.createElement("li");
    li.setAttribute("role", "tab");
    li.setAttribute("aria-owns", id);
    li.appendChild(text);
    return li;
};
const makeTabMapEntry = (section) => [makeTab(section), section];
// dispatcher to handle tab changes
const makeTabClickHandler = (tabMap) =>
    (event) => {
        // event.preventDefault();
        const path = event.path || event.composedPath();
        const activeTab = path.find((node) => node.tagName == "LI");
        const activeSection = tabMap.get(activeTab);
        const hash = "#" + activeTab.getAttribute("aria-owns");
        // change URL to reflect tab state
        window.history.pushState({}, '', hash);
        // hide all sections and inactivate all tabs
        tabMap.forEach((section, tab) => {
            section.classList.add("collapsed");
            tab.classList.remove("activeTab");
            tab.setAttribute("aria-selected", false);
        });
        activeSection.classList.remove("collapsed");
        activeTab.classList.add("activeTab");
        activeTab.setAttribute("aria-selected", true);
    };
const makeTabBar = (nav) => {
    const sections = getSections();
    sections.forEach(addSectionID);
    const tabMap = new Map(sections.map(makeTabMapEntry));
    const tabList = document.createElement("ul");
    tabList.setAttribute("role", "tablist");
    tabMap.forEach((_, tab) => tabList.appendChild(tab));
    nav.appendChild(tabList);
    nav.addEventListener("click", makeTabClickHandler(tabMap));
    [...tabMap.keys()][0].click();
    return nav;
};
const initialize = () => makeTabBar(document.querySelector("nav"));
window.addEventListener("load", initialize);
