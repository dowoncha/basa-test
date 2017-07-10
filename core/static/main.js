$(function() {
    const $search = Rx.Observable.fromEvent($('#search'), 'keyup')
        .debounceTime(1000) // Wait 1 second between searches
        .distinctUntilChanged() // Search term must be distinct
        .map(e => e.target.value) // Get the value from event
        .mergeMap(searchArtists) // Ajax call
        .subscribe(data => {
            $('#artist-list tbody tr').remove();

            // Parse data string into json array
            const artists = JSON.parse(data.artists);

            $.each(artists, (_, artist) => {
                const $tr = `<tr>
                    <td>${artist.pk}</td>
                    <td>${artist.fields.name}</td>
                    <td>${artist.fields.location}</td>
                </tr>`;

                $('#artist-list > tbody').append($tr);
            });
        });

    // Ajax call that returns an observable
    function searchArtists(term) {
        const promise = $.getJSON('/api/artists', /* Query */ ).promise();

        return Rx.Observable.fromPromise(promise);
    }
});