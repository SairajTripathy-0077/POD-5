"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import DottedMap from "dotted-map";
import { useTheme } from "next-themes";

interface MapProps {
  userLocation?: { lat: number; lng: number } | null;
  isSearching?: boolean;
}

// Cities the dot jumps through while searching
const SEARCH_LOCATIONS = [
  { lat: 40.7128, lng: -74.006 },   // New York
  { lat: 48.8566, lng: 2.3522 },    // Paris
  { lat: 35.6762, lng: 139.6503 },  // Tokyo
  { lat: -33.8688, lng: 151.2093 }, // Sydney
  { lat: 55.7558, lng: 37.6173 },   // Moscow
  { lat: -22.9068, lng: -43.1729 }, // Rio de Janeiro
  { lat: 1.3521, lng: 103.8198 },   // Singapore
  { lat: 30.0444, lng: 31.2357 },   // Cairo
  { lat: 19.4326, lng: -99.1332 },  // Mexico City
  { lat: -1.2921, lng: 36.8219 },   // Nairobi
];

export default function WorldMap({
  userLocation = null,
  isSearching = false,
}: MapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const map = new DottedMap({ height: 100, grid: "diagonal" });
  const { theme } = useTheme();

  const [jumpIndex, setJumpIndex] = useState(0);
  const [hasFound, setHasFound] = useState(false);

  // Cycle through cities while searching
  useEffect(() => {
    if (!isSearching) return;
    setHasFound(false);
    const interval = setInterval(() => {
      setJumpIndex((prev) => (prev + 1) % SEARCH_LOCATIONS.length);
    }, 350);
    return () => clearInterval(interval);
  }, [isSearching]);

  // Mark found when location arrives
  useEffect(() => {
    if (userLocation && !isSearching) {
      setHasFound(true);
    }
  }, [userLocation, isSearching]);

  const svgMap = map.getSVG({
    radius: 0.22,
    color: theme === "dark" ? "#FFFFFF40" : "#00000040",
    shape: "circle",
    backgroundColor: "transparent",
  });

  const projectPoint = (lat: number, lng: number) => {
    const x = (lng + 180) * (800 / 360);
    const y = (90 - lat) * (400 / 180);
    return { x, y };
  };

  const pinColor = "#ef4444";
  const currentJump = SEARCH_LOCATIONS[jumpIndex];
  const jumpPoint = projectPoint(currentJump.lat, currentJump.lng);
  const userPoint = userLocation
    ? projectPoint(userLocation.lat, userLocation.lng)
    : null;

  return (
    <div className="w-full aspect-[2/1] rounded-lg relative font-sans">
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className="h-full w-full [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)] pointer-events-none select-none"
        alt="world map"
        height="495"
        width="1056"
        draggable={false}
      />
      <svg
        ref={svgRef}
        viewBox="0 0 800 400"
        className="w-full h-full absolute inset-0 pointer-events-none select-none"
      >
        <AnimatePresence>
          {/* ── Searching: dot jumps across cities ── */}
          {isSearching && (
            <motion.g
              key="searching"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
            >
              {/* Jumping dot */}
              <motion.circle
                r="3.5"
                fill={pinColor}
                animate={{ cx: jumpPoint.x, cy: jumpPoint.y }}
                transition={{ type: "spring", stiffness: 150, damping: 12 }}
              />
              {/* Fast pulse ring around jumping dot */}
              <motion.circle
                r="3"
                fill={pinColor}
                opacity="0.25"
                animate={{ cx: jumpPoint.x, cy: jumpPoint.y }}
                transition={{ type: "spring", stiffness: 150, damping: 12 }}
              >
                <animate attributeName="r" from="3" to="12" dur="0.6s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.3" to="0" dur="0.6s" repeatCount="indefinite" />
              </motion.circle>
              {/* White center on jumping dot */}
              <motion.circle
                r="1.2"
                fill="#ffffff"
                opacity="0.8"
                animate={{ cx: jumpPoint.x, cy: jumpPoint.y }}
                transition={{ type: "spring", stiffness: 150, damping: 12 }}
              />
            </motion.g>
          )}

          {/* ── Found: settled red dot with pulse ── */}
          {hasFound && !isSearching && userPoint && (
            <motion.g
              key="found"
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {/* Pulse ring 1 */}
              <circle cx={userPoint.x} cy={userPoint.y} r="5" fill={pinColor} opacity="0.15">
                <animate attributeName="r" from="5" to="20" dur="2s" begin="0s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.3" to="0" dur="2s" begin="0s" repeatCount="indefinite" />
              </circle>
              {/* Pulse ring 2 (offset) */}
              <circle cx={userPoint.x} cy={userPoint.y} r="5" fill={pinColor} opacity="0.15">
                <animate attributeName="r" from="5" to="16" dur="2s" begin="0.7s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.25" to="0" dur="2s" begin="0.7s" repeatCount="indefinite" />
              </circle>
              {/* Solid red dot */}
              <circle cx={userPoint.x} cy={userPoint.y} r="5" fill={pinColor} />
              {/* White highlight */}
              <circle cx={userPoint.x} cy={userPoint.y} r="2" fill="#ffffff" opacity="0.85" />
            </motion.g>
          )}
        </AnimatePresence>
      </svg>
    </div>
  );
}
