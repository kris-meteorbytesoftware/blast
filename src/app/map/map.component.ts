import {
  AfterViewInit,
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { environment } from 'src/environments/environment';
import { SharedModule } from '../shared/shared.module';
import { GeolocationService } from '../helpers/services/geolocation.service';
import { Geolocation } from '@capacitor/geolocation';
import { BottomToolbarComponent } from '../shared/bottom-toolbar/bottom-toolbar.component';
import { MapService } from '../helpers/services/map.service';
import { HttpClient } from '@angular/common/http';
import { map, catchError, of } from 'rxjs';
import {
  GoogleMapsModule,
  MapMarker,
  MapInfoWindow,
  GoogleMap,
} from '@angular/google-maps';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  standalone: true,
  imports: [SharedModule, BottomToolbarComponent, GoogleMapsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MapComponent implements AfterViewInit {
  @ViewChild(GoogleMap, { static: false }) map!: google.maps.Map;
  @ViewChild(MapInfoWindow, { static: false }) info!: MapInfoWindow;
  // mapRef!: ElementRef<HTMLElement>;
  // newMap!: GoogleMap;
  position!: any;
  showMapPill: boolean = false;
  // userMarker!: string;
  apiLoaded: any;
  zoom = 18;
  center!: google.maps.LatLngLiteral;
  source?: google.maps.LatLngLiteral;
  destination!: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    // zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 20,
    // minZoom: 15,
    // disableDefaultUI: true,
  };
  currentPosition: any = { lat: 0, lng: 0 };
  markers: any[] = [];
  selectedMarker: any = {};
  infoContent = '';

  time: string = '';
  distance: string = '';
  backgroundUrl: string | null = null;

  ds!: google.maps.DirectionsService;
  dr!: google.maps.DirectionsRenderer;
  constructor(private geolocationService: GeolocationService) {
    this.ds = new google.maps.DirectionsService();
    this.dr = new google.maps.DirectionsRenderer({
      map: null,
      suppressMarkers: true,
    });
  }

  ngAfterViewInit(): void {
    this.geolocationService.getCurrentPosition().subscribe({
      next: (position: GeolocationPosition) => {
        this.position = position;
        console.log(this.position);
        this.center = {
          lat: this.position.coords.latitude,
          lng: this.position.coords.longitude,
        };
        this.currentPosition = {
          lat: this.position.coords.latitude,
          lng: this.position.coords.longitude,
        };
        this.destination = {
          lat: this.position.coords.latitude,
          lng: this.position.coords.longitude + 0.0005,
        };
        let marker = {
          position: {
            lat: this.center.lat,
            lng: this.center.lng,
          },
          icon: {
            url: 'assets/icon/current-position.svg',
            anchor: new google.maps.Point(35, 10),
            scaledSize: new google.maps.Size(25, 25),
          },
          label: null,
          clickable: false,
          title: 'Marker title ' + (this.markers.length + 1),
          // info: 'Marker info ' + (this.markers.length + 1),
          // options: null,
          // options: {
          //   animation: google.maps.Animation.DROP,
          // },
          // map: this.map,
        };

        var destinationMarker = {
          position: this.destination,
          title: 'Marker title ' + (this.markers.length + 1),
          icon: {
            url: 'assets/icon/tent.svg',
            anchor: new google.maps.Point(35, 10),
            scaledSize: new google.maps.Size(25, 25),
          },
          // map: this.map,
        };

        // this.setRoutePolyline();
        this.markers.push(marker);
        this.markers.push(destinationMarker);
        // this.addMarkers();
        // this.addMarkers();
        // this.addMarkers();
        // this.createMap();

        // Set up an interval to update the marker's location every X milliseconds
        const updateInterval = 5000; // Update every 5 seconds (you can adjust this value)
        setInterval(() => {
          this.updateMarkerLocation();
        }, updateInterval);
      },
      error: (error: GeolocationPositionError) => {
        console.error('Error getting location:', error.message);
      },
    });
  }

  openInfo(marker: any, content: string) {
    console.log(marker);
    this.selectedMarker = marker;
    this.showMapPill = true;
    this.infoContent = content;
    // this.info.open(marker);
  }

  getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }

  addMarkers() {
    this.markers.push({
      position: {
        lat: this.center.lat + (this.getRandomInt(1, 3) - 0.5) / 1000,
        lng: this.center.lng + (this.getRandomInt(1, 3) - 0.5) / 1000,
      },
      icon: null,
      label: {
        color: 'red',
        text: 'Marker label ' + (this.markers.length + 1),
      },
      title: 'Marker title ' + (this.markers.length + 1),
      info: 'Marker info ' + (this.markers.length + 1),
      options: {
        animation: google.maps.Animation.BOUNCE,
      },
    });
    console.log(this.markers);
  }

  click(event: google.maps.MapMouseEvent) {
    console.log(event);
    this.selectedMarker = null;
    this.showMapPill = false;
  }

  setRoutePolyline() {
    let request = {
      origin: this.center,
      destination: this.destination,
      travelMode: google.maps.TravelMode.WALKING,
    };

    this.ds.route(request, (response, status) => {
      this.dr.setOptions({
        suppressPolylines: false,
        map: this.map,
      });

      if (status == google.maps.DirectionsStatus.OK) {
        this.dr.setDirections(response);

        this.distance = response?.routes[0]?.legs[0]?.distance?.text || '';
        this.time = response?.routes[0]?.legs[0]?.duration?.text || '';
      }
    });
  }

  async updateMarkerLocation() {
    this.geolocationService.getCurrentPosition().subscribe({
      next: async (position: GeolocationPosition) => {
        this.position = position;
        // if (this.userMarker) {
        //   await this.newMap.removeMarker(this.userMarker);
        // }
        // position: {
        //   lat: this.center.lat,
        //   lng: this.center.lng,
        // },
        // icon: {
        //   url: 'assets/icon/current-position.svg',
        //   anchor: new google.maps.Point(35, 10),
        //   scaledSize: new google.maps.Size(25, 25),
        // },
        this.markers[0].position = {
          lat: this.position.coords.latitude,
          lng: this.position.coords.longitude,
        };

        // Center the map on the new marker position
        this.map.panTo({
          lat: this.position.coords.latitude,
          lng: this.position.coords.longitude,
        });
      },
      error: (error: GeolocationPositionError) => {
        console.error('Error getting location:', error.message);
      },
    });
  }

  // async createMap() {
  //   this.position = await Geolocation.getCurrentPosition({
  //     enableHighAccuracy: true,
  //   });

  //   this.newMap = await GoogleMap.create({
  //     id: 'my-cool-map',
  //     element: this.mapRef.nativeElement,
  //     apiKey: environment.keys.googleMaps,
  //     config: {
  //       center: {
  //         lat: this.position.coords.latitude,
  //         lng: this.position.coords.longitude,
  //       },
  //       zoom: 18,
  //     },
  //   });

  //   this.newMap.enableCurrentLocation(true);

  //   const marker = await this.newMap.addMarker({
  //     coordinate: {
  //       lat: 28.51758210083578,
  //       lng: -81.21908875841508,
  //     },
  //     title: 'My House',
  //     snippet: 'Here is some info on the marker',
  //     // iconPath: 'path-to-your-marker-image.png', // Customize marker icon
  //   });

  //   // Call the updateMarkerLocation method to update the marker's position
  //   // this.updateMarkerLocation();

  //   // Set up an interval to update the marker's location every X milliseconds
  //   const updateInterval = 5000; // Update every 5 seconds (you can adjust this value)
  //   // setInterval(() => {
  //   //   this.updateMarkerLocation();
  //   // }, updateInterval);

  //   // this.newMap.setOnMapClickListener((event) => {
  //   //   console.log(event);
  //   // });

  //   // this.newMap.setOnMarkerClickListener((event) => {
  //   //   console.log('marker click', event);
  //   // });
  // }
}
