function initAutocomplete() {
    var markers = [];
    var map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 9.9936682, lng: -84.0241678 },
        zoom: 13,
        mapTypeId: 'roadmap'
    });
    $('#lat').val(9.9936682);
    $('#lon').val(-84.0241678);
    markers.push(new google.maps.Marker({
        map: map,
        position: new google.maps.LatLng(9.9936682, -84.0241678)
    }));
    // Create the search box and link it to the UI element.
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function () {
        searchBox.setBounds(map.getBounds());
    });

    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function () {
        var places = searchBox.getPlaces();
        if (places.length == 0) {
            return;
        }

        // Clear out the old markers.
        markers.forEach(function (marker) {
            marker.setMap(null);
        });


        // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function (place) {
            if (!place.geometry) {
                console.log("Returned place contains no geometry");
                return;
            }
            var icon = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            markers.push(new google.maps.Marker({
                map: map,
                icon: icon,
                title: place.name,
                position: place.geometry.location
            }));
            var clickLat = place.geometry.location.lat();
            var clickLon = place.geometry.location.lng();

            // show in input box
            $('#lat').val(clickLat.toFixed(5));
            $('#lon').val(clickLon.toFixed(5));
            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });

        map.fitBounds(bounds);
    });
    google.maps.event.addListener(map, "click", function (event) {
        markers.forEach(function (marker) {
            marker.setMap(null);
        });
        // get lat/lon of click
        var clickLat = event.latLng.lat();
        var clickLon = event.latLng.lng();

        // show in input box
        $('#lat').val(clickLat.toFixed(5));
        $('#lon').val(clickLon.toFixed(5));
        markers.push(new google.maps.Marker({
            map: map,
            position: new google.maps.LatLng(clickLat, clickLon)
        }));

    });
}