import React, { useState, useRef, useEffect } from "react";
import { useMapsLibrary } from "@vis.gl/react-google-maps";

interface AddressAutocompleteProps {
  onSelect: (lat: number, lng: number, address: string) => void;
}

const AddressAutocomplete: React.FC<AddressAutocompleteProps> = ({
  onSelect,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [inputValue, setInputValue] = useState("");
  const places = useMapsLibrary("places");

  useEffect(() => {
    if (!places || !inputRef.current) return;

    const autocomplete = new places.Autocomplete(inputRef.current, {
      types: ["geocode"], // Restrict results to addresses
      componentRestrictions: { country: "rs" }, // Restrict to Serbia (optional)
    });

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        const lat = place.geometry.location?.lat();
        const lng = place.geometry.location?.lng();
        const formattedAddress = place.formatted_address || "";

        onSelect(lat!, lng!, formattedAddress);
        setInputValue(formattedAddress);
      }
    });
  }, [onSelect, places]);

  return (
    <input
      ref={inputRef}
      type="text"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      placeholder="Enter your address"
      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900"
    />
  );
};

export default AddressAutocomplete;