import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { MapsAPILoader, AgmMap } from '@agm/core';

@Component({
  selector: 'app-map',
  templateUrl: 'map.page.html',
  styleUrls: ['map.page.scss']
})
export class MapPage implements OnInit {
  userCoords: Coordinates;
  @ViewChild('map') map: AgmMap;
  places: google.maps.places.PlaceResult[];

  myStyles = [
    {
      featureType: 'poi',
      elementType: 'labels',
      stylers: [
        { visibility: 'off' }
      ]
    }
  ];

  constructor(private gl: Geolocation, private cd: ChangeDetectorRef, private mapsApiLoader: MapsAPILoader) {}
  ngOnInit() {
    this.gl.watchPosition({enableHighAccuracy: true}).subscribe(p => {
      this.userCoords = p.coords;
      this.cd.detectChanges();
      this.map.mapReady.subscribe(async map => {
        await this.mapsApiLoader.load();
        const service = new google.maps.places.PlacesService(map);
        service.nearbySearch({ keyword: 'магазин',
          // types: ['store'],
          location: { lat: this.userCoords.latitude, lng: this.userCoords.longitude },
          radius: 1000
        }, (res) => {
          this.places = res;
          this.places.forEach((s: google.maps.places.PlaceResult) => {
            this.createMarker(s, map);
          });
        });
      });
    });
  }

  createMarker(place: google.maps.places.PlaceResult, map) {
    const image = {
      url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
      // This marker is 20 pixels wide by 32 pixels high.
      size: new google.maps.Size(20, 32),
      // The origin for this image is (0, 0).
      origin: new google.maps.Point(0, 0),
      // The anchor for this image is the base of the flagpole at (0, 32).
      anchor: new google.maps.Point(0, 32)
    };
    const shape = {
      coords: [1, 1, 1, 20, 18, 20, 18, 1],
      type: 'poly'
    };
    const marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location,
      icon: image,
      shape: shape,
    });

  }
}
