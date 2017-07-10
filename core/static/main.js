$(function() {
    var currentPage = 1;
    var totalPages = 1;

    $('#search').keyup(function() {
        console.log('keyup');
    });

    $(".pagination li").click(function(e) {
        e.preventDefault();
        console.log('clicked');
        const id = $(this).attr(id);
        console.log(this.id);
    });

    const $search = Rx.Observable.fromEvent($('#search'), 'keyup')
        .debounceTime(500) // Wait 1 second between searches
        .distinctUntilChanged() // Search term must be distinct
        .map(e => e.target.value) // Get the value from event
        .mergeMap(getArtists) // Ajax call
        .subscribe(data => {
            $('#artist-list tbody tr').remove();

            console.log(data);

            // Parse data string into json array
            const artists = JSON.parse(data.artists);

            if (data.totalPages != totalPages) {
                updatePages(data.totalPages);
            }

            updateArtists(artists);
        });

    // Initial page load search
    $('#search').keyup();
    updatePages(1);

    function updateArtists(artists) {
        $.each(artists, (_, artist) => {
            let $tr = `<tr>
                    <td>${artist.pk}</td>
                    <td><a href="/artists/${artist.pk}">${artist.fields.name}</a></td>
                    <td>${artist.fields.location}</td>
                    <td>`;

            $.each(artist.fields.tags, (_, tag) => {
                $tr += `<span class="badge">${tag}</span>`;
            });

            $tr += '</td></tr>';

            $('#artist-list > tbody').append($tr);
        });
    }

    function updatePages(pages) {
        totalPages = pages;

        // Clear page numbers
        $('#page-numbers li').remove();
        let $li = '';

        for (i = 1; i <= pages; ++i) {
            $li += `<li id=${i}><a>${i}</a></li>`;
        }

        $('#page-numbers').append($li);
    }

    // Ajax call that returns an observable
    function getArtists(term) {
        const promise = $.getJSON('/api/artists', { 'search': term, 'page': currentPage }).promise();

        return Rx.Observable.fromPromise(promise);
    }
});