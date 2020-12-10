const fetch = require('node-fetch');

module.exports = {
    loadSearch: async function loadSearch() {
        let list = document.getElementById("search__list");
        list.innerHTML = "";
        document.forms['search__form'].addEventListener('submit', (event) => {
            event.preventDefault();
            // TODO do something here to show user that form is being submitted

            // LOG FETCH REQUEST WITH LOG SERVICE
            // req.setHeader("ID", Math.random() * (1000000 - 100) + 100);
            // Log fetch with log-service
            let log = {
                service: "Client",
                route: "/inventory/items/search",
                // requestId: req.ID,
                message: "showing client info page",
                date: Date.now
            }
            console.log(log);
            // TODO Send to log-service

            fetch(event.target.action, {
                method: 'POST',
                body: new URLSearchParams(new FormData(event.target)) // event.target is the form
            }).then((resp) => {
                return resp.json();
            }).then((body) => {
                console.log(body)
            }).catch((error) => {
                console.log(error)
            });
        });
    }
}