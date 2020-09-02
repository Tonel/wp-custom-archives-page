document.addEventListener('DOMContentLoaded', function() {

    // https://medium.com/@griffinmichl/implementing-debounce-in-javascript-eab51a12311e
    const debounce = (func, wait) => {
        let timeout;

        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            }

            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        }
    }

    const resultsDiv = document.querySelector('#results');

    const searchInput = document.querySelector('#search-input');

    const debouncedSearch = debounce(function() {
        resultsDiv.innerHTML = (`<p style="text-align:center">Loading...</p>`)

        wp.ajax
        .post("get_archives_data", {
            search: searchInput.value
        })
        .done(function(response) {
            let innerHTML = ``;

            if (response.length > 0) {
                let lastYear = 0;
                let lastMonth = 0;

                response.forEach(p => {
                    const year = p.year;
                    const month = p.month;

                    if (year !== lastYear) {
                        lastYear = year;
                        lastMonth = 0;

                        innerHTML += `<div class=year><h3>${year}</h3></div>`;
                    }

                    if (month !== lastMonth) {
                        lastMonth = month;
                        innerHTML += `<div class=month><h4>${p.month_name}</h4></div>`;
                    }

                    innerHTML += `
					<div class="day-title">
						<div class="day">
							<p>${p.dayofmonth.padStart(2, '0')}</p>
						</div>
						<div class="post-title">
							<p id=p${p.id}>
								<a href="/${p.post_name}">
									${p.encoded_title}
								</a>
							</p>
						</div>
					</div>
					`;

                });
            } else {
                innerHTML = `<p style="text-align:center">Nessun articolo trovato</p>`;
            }

            resultsDiv.innerHTML = innerHTML;
        });
    }, 350);

    searchInput.addEventListener("input", function (e) {
        e.preventDefault();

        debouncedSearch();
    });

    // loading data the first time the page is rendered
    debouncedSearch();

}, false);