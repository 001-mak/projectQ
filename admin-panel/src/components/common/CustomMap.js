import { CSSProperties, useRef, useState } from "react";
import {
  Circle,
  GoogleMap,
  useJsApiLoader,
  Marker,
} from "@react-google-maps/api";
import React from "react";

const CustomMap = ({
  libraries: pLibs,
  center: pCenter,
  onDragEnd,
  loadingElement,
  mapContainerStyle,
  markers,
  circles,
  zoom,
}) => {
  const [center, setCenter] = useState(pCenter);
  const refMap = useRef(null);
  const [libraries] = useState(pLibs);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyC-WK0U8VzIFksUrVKAebiLfGscQLv6pHk",
    libraries,
  });

  const handleBoundsChanged = () => {
    if (onDragEnd) {
      if (refMap.current) {
        const mapCenter = refMap.current.state.map?.getCenter();
        if (mapCenter) {
          setCenter({ lat: mapCenter.lat(), lng: mapCenter.lng() });
        }
        if (mapCenter) {
          onDragEnd({ lat: mapCenter?.lat(), lng: mapCenter?.lng() });
        }
      }
    }
  };

  return isLoaded ? (
    <GoogleMap
      ref={refMap}
      zoom={zoom || 12}
      center={center}
      onDragEnd={handleBoundsChanged}
      mapContainerStyle={mapContainerStyle}
    >
      {markers?.map((marker, idx) => (
        <Marker key={`${idx}-marker`} position={marker} />
      ))}
      {circles?.map((circle, idx) => {
        return (
          <Circle
            key={`${idx}-circle`}
            center={center}
            radius={circle.radius}
            options={{
              strokeColor: "transparent",
              fillColor: "#ff0000",
              fillOpacity: 0.2,
              strokeOpacity: 0,
            }}
          />
        );
      })}
    </GoogleMap>
  ) : (
    loadingElement
  );
};

export default CustomMap;
