export const toggleActiveTab = (tabberClass,tabClass) => (event) => {
    const selected = event.target.closest(tabClass)
    const tabTray = event.target.closest(tabberClass);
    const tabs = tabTray.querySelectorAll(tabClass);
    tabs.forEach(tab => tab.classList.remove('active'))
    selected.classList.add('active');
}
