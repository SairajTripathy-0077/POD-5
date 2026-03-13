"use client";
import WorldMap from "@/components/ui/world-map";

interface WorldMapBgProps {
  userLocation?: { lat: number; lng: number } | null;
  isSearching?: boolean;
}

export default function WorldMapBg({
  userLocation = null,
  isSearching = false,
}: WorldMapBgProps) {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <WorldMap
        userLocation={userLocation}
        isSearching={isSearching}
      />
    </div>
  );
}
