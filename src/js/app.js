(function () {
    'use strict';

    var CAT_API_URL = 'https://api.thecatapi.com/v1/images/search';
    var IMAGES_PER_LOAD = 12;
    var PLACEHOLDER_SRC = 'images/cat-placeholder.svg';

    var gallery = document.getElementById('gallery');
    var loadMoreBtn = document.getElementById('load-more-btn');
    var errorMessage = document.getElementById('error-message');
    var retryBtn = document.getElementById('retry-btn');
    var loading = document.getElementById('loading');

    function showLoading() {
        loading.hidden = false;
    }

    function hideLoading() {
        loading.hidden = true;
    }

    function showError() {
        errorMessage.hidden = false;
        loadMoreBtn.hidden = true;
    }

    function hideError() {
        errorMessage.hidden = true;
    }

    function createImageCard(catData) {
        var item = document.createElement('div');
        item.className = 'gallery-item';

        var img = document.createElement('img');
        img.src = catData.url;
        img.alt = 'Foto di un gatto';
        img.loading = 'lazy';

        img.addEventListener('error', function () {
            img.src = PLACEHOLDER_SRC;
            img.alt = 'Immagine non disponibile';
        });

        item.appendChild(img);
        return item;
    }

    function fetchCats() {
        showLoading();
        hideError();
        loadMoreBtn.hidden = true;

        var url = CAT_API_URL + '?limit=' + IMAGES_PER_LOAD;

        fetch(url)
            .then(function (response) {
                if (!response.ok) {
                    throw new Error('HTTP ' + response.status);
                }
                return response.json();
            })
            .then(function (cats) {
                hideLoading();

                if (!cats || cats.length === 0) {
                    showError();
                    return;
                }

                var fragment = document.createDocumentFragment();
                cats.forEach(function (cat) {
                    fragment.appendChild(createImageCard(cat));
                });
                gallery.appendChild(fragment);

                loadMoreBtn.hidden = false;
            })
            .catch(function () {
                hideLoading();
                showError();
            });
    }

    loadMoreBtn.addEventListener('click', fetchCats);
    retryBtn.addEventListener('click', function () {
        hideError();
        fetchCats();
    });

    // Initial load
    fetchCats();
})();
