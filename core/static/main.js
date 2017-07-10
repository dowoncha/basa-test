/*{% for artist in artists %}
                        <tr>
                            <td>{{ artist.id }}</td>
                            <td><a href="{% url 'artist-detail' artist.id %}">{{ artist.name }}</a></td>
                            <td>{{ artist.location }}</td>
                            <td>{% for tag in %{{ artist.tags.all }}</td>
                        </tr>
                        {% endfor %}*/

$(function() {
    var artist_count = $()
    var current_page = 1;

    var max_pages = 1;

    set_current_page();

    // Initial page load search
    $('#search').trigger('keyup');

    const $search = Rx.Observable.fromEvent($('#search'), 'keyup')
        .debounceTime(500) // Wait 1 second between searches
        .distinctUntilChanged() // Search term must be distinct
        .map(e => e.target.value) // Get the value from event
        .mergeMap(getArtists) // Ajax call
        .subscribe(data => {
            $('#artist-list tbody tr').remove();

            console.log(data);

            max_pages = data.pages;

            // Parse data string into json array
            const artists = JSON.parse(data.artists);

            $.each(artists, (_, artist) => {
                const $tr = `<tr>
                    <td>${artist.pk}</td>
                    <td><a href="/artists/${artist.pk}">${artist.fields.name}</a></td>
                    <td>${artist.fields.location}</td>
                </tr>`;

                $('#artist-list > tbody').append($tr);
            });
        });

    $('#previous-page').click(function() {
        if (current_page > 1) {
            current_page -= 1;
        }

        set_current_page();
    });

    $('#next-page').click(function() {
        if (current_page < max_pages) {
            current_page += 1;
        }

        set_current_page();
    });

    function set_current_page() {
        $('current_page').append(current_page);
    }

    function set_page_index() {
        $('next_page').append(max_pages);
    }

    // Ajax call that returns an observable
    function getArtists(term) {
        const promise = $.getJSON('/api/artists', { 'search': term, 'page': current_page }).promise();

        return Rx.Observable.fromPromise(promise);
    }
});