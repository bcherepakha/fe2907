import EventSource from "./eventSource.js";

export default class Filter extends EventSource {
    constructor() {
        super();
        this.rootEl = document.querySelector('.filters');
        this.links = Array.from(this.rootEl.querySelectorAll('a'));
        this.availableFilters = this.links.map(l => this.readFromPathname(l.pathname));
        this.onFilterChange = this.onFilterChange.bind(this);

        this.setCurrentFilter(this.readCurrentFilter(), false);

        this.links.forEach(l => l.addEventListener('click', this.onFilterChange));
    }

    readFromPathname(pathname) {
        const filter = pathname.split('/')[2];

        return `#/${filter}`;
    }

    onFilterChange(e) {
        e.preventDefault();

        const currentLink = e.target;

        this.setCurrentFilter(this.readFromPathname(currentLink.pathname));
    }

    setCurrentFilter(currentFilter, riseEvent = true) {
        console.log(currentFilter, this.links);
        const currentLink = this.links.find(l => l.dataset.filter === currentFilter);

        this.currentFilter = currentFilter;

        this.links.forEach(l => {
            if (l.dataset.filter === currentFilter) {
                l.classList.add('selected');
            } else {
                l.classList.remove('selected');
            }
        });

        history.pushState({ currentFilter }, '', currentLink.pathname);

        if (riseEvent) {
            this.dispatch('change');
        }
    }

    readCurrentFilter() {
        let currentFilter = this.readFromPathname(location.pathname);

        if (!this.availableFilters.includes(currentFilter)) {
            currentFilter = '';
        }

        if (!currentFilter) {
            const activeLink = this.links.find(l => l.classList.contains('selected'));

            if (activeLink) {
                currentFilter = activeLink.hash;
            }
        }

        if (!currentFilter) {
            currentFilter = '#/all';
        }

        return currentFilter;
    }
}
