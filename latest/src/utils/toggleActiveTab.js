export const toggleActiveTab = (tray,tab) => (event) => {
    const selected = event.target.closest(tab)
    const tabTray = event.target.closest(tray);
    const tabs = tabTray.querySelectorAll(tab);
    tabs.forEach(tab => tab.classList.remove('active'))
    selected.classList.add('active');
}
