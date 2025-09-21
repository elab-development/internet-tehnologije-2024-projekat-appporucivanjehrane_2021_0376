import { useState } from "react";
import {
  AdvancedMarker,
  APIProvider,
  InfoWindow,
  Map,
} from "@vis.gl/react-google-maps";

import { Restaurant } from "../../lib/TypesData";

interface Props {
  restaurant: Restaurant | null;
  coordinates: {
    lat: number;
    lng: number;
  };
}

const RestaurantOfferMap = ({ restaurant, coordinates }: Props) => {
  const defaultCenter = { lat: 44.8125, lng: 20.4612 };
  const [openInfo, setOpenInfo] = useState(false);

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <div className="h-64 w-full">
        <Map
          defaultCenter={coordinates || defaultCenter}
          defaultZoom={13}
          mapId={import.meta.env.VITE_GOOGLE_MAPS_MAP_ID}
          gestureHandling="greedy"
        >
          <AdvancedMarker
            position={coordinates || defaultCenter}
            onClick={() => setOpenInfo(true)}
          ></AdvancedMarker>

          {openInfo && (
            <InfoWindow
              position={coordinates || defaultCenter}
              onCloseClick={() => setOpenInfo(false)}
            >
              <img src={restaurant?.image} className="size-20" />
              <p className="font-medium">{restaurant?.name}</p>
              <p className="font-medium">{restaurant?.address}</p>
            </InfoWindow>
          )}
        </Map>
      </div>
    </APIProvider>
  );
};

export default RestaurantOfferMap;
