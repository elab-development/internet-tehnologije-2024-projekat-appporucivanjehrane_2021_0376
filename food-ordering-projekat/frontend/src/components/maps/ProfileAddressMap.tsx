import { AdvancedMarker, APIProvider, Map } from "@vis.gl/react-google-maps";

interface Props {
  coordinates: {
    lat: number;
    lng: number;
  };
}

const ProfileAddressMap = ({ coordinates }: Props) => {
  const defaultCenter = { lat: 44.8125, lng: 20.4612 };

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <div className="h-32 w-full">
        <Map
          defaultCenter={coordinates || defaultCenter}
          defaultZoom={13}
          mapId={import.meta.env.VITE_GOOGLE_MAPS_MAP_ID}
          gestureHandling="greedy"
        >
          <AdvancedMarker
            position={coordinates || defaultCenter}
          ></AdvancedMarker>
        </Map>
      </div>
    </APIProvider>
  );
};

export default ProfileAddressMap;
