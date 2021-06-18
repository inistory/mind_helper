import React, { useEffect, useState } from "react";
import "./map.css";
const { kakao } = window;
let infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
let lat = "";
let lon = "";

const MapContainer2 = ({ searchPlace }) => {
  const [gps, setGps] = useState([]);
  const [map, setMap] = useState({});
  const [markers, setMarkers] = useState([]); //마커 저장 배열

  function getGPS() {
    const userLocation = [];
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        lat = position.coords.latitude; // 위도
        lon = position.coords.longitude; // 경도
        const container = document.getElementById("map2");
        const options = {
          center: new kakao.maps.LatLng(lat, lon),
          level: 3,
        };
        userLocation.push(lat);
        userLocation.push(lon);
        setGps(userLocation);

        setMap(new kakao.maps.Map(container, options));
      });
    }
  }

  useEffect(() => {
    getGPS();
  }, []);

  function placesSearchCB(data, status, pagination) {
    let marker_temp = [];
    if (markers != []) {
      markers.map(function (m) {
        m.setMap(null);
      });
    }
    if (status === kakao.maps.services.Status.OK) {
      let bounds = new kakao.maps.LatLngBounds();

      data.map(function (d) {
        let marker = new kakao.maps.Marker({
          map: map,
          position: new kakao.maps.LatLng(d.y, d.x),
          image: new kakao.maps.MarkerImage(
            "https://cdn3.iconfinder.com/data/icons/flat-pro-basic-set-1-1/32/location-green-256.png",
            new kakao.maps.Size(31, 35),
            {
              offset: new kakao.maps.Point(16, 34),
              alt: "마커 이미지",
            }
          ),
        });
        marker_temp.push(marker);
        displayMarker(d, marker);
        bounds.extend(new kakao.maps.LatLng(d.y, d.x));
      });
      for (let i = 0; i < data.length; i++) {}
      setMarkers(marker_temp);
      map.setBounds(bounds);
    }
  }
  useEffect(() => {
    console.log(markers);
  }, [markers]);

  function displayMarker(place, marker) {
    kakao.maps.event.addListener(marker, "mouseover", function () {
      // 마커를 클릭하면 장소명이 인포윈도우에 표출
      infowindow.setContent(
        `
        <div class="info" >
        <h6>
        ${place.place_name}
        </h6>
        <span>${place.road_address_name}
        </span></br>
        <span class="jibun gray"> 
          ${place.address_name}
        </span></br>
        <span class="tel">${place.phone}
        </span>
        </div>
        `
      );
      infowindow.open(map, marker);
    });
    kakao.maps.event.addListener(marker, "mouseout", function () {
      infowindow.close();
    });
  }

  useEffect(() => {
    if (gps != [] && map != {} && searchPlace) {
      const ps = new kakao.maps.services.Places();
      ps.keywordSearch(searchPlace, placesSearchCB, {
        location: new kakao.maps.LatLng(gps[0], gps[1]),
        bounds: new kakao.maps.LatLngBounds(
          new kakao.maps.LatLng(gps[0] - 0.1, gps[1] - 0.1),
          new kakao.maps.LatLng(gps[0] + 0.1, gps[1] + 0.1)
        ),
        radius: 10000,
      });
    }
  }, [map, gps, searchPlace]);

  return (
    <div
      id="map2"
      style={{
        width: "400px",
        height: "300px",
      }}
    ></div>
  );
};

export default MapContainer2;
