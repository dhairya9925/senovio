"use client";

import { useEffect, useRef, useState } from "react";
import type { Map as LeafletMapInstance } from "leaflet";
import { MapPin } from "lucide-react";
import { companyAddressInline } from "@/lib/company";

const SENOVIO_LAT = 26.1516125;
const SENOVIO_LNG = 91.74305;
const DEFAULT_ZOOM = 17;

interface LeafletMapProps {
  /** Override latitude */
  lat?: number;
  /** Override longitude */
  lng?: number;
  /** Zoom level 1-18 */
  zoom?: number;
  /** Text for the popup marker */
  popupText?: string;
  /** CSS class on the outer wrapper */
  className?: string;
}

/**
 * Lazy-loaded Leaflet map component.
 *
 * Leaflet depends on `window`, so we dynamically import it inside a
 * useEffect to keep SSR safe (TanStack Start renders on the server).
 */
export default function LeafletMap({
  lat = SENOVIO_LAT,
  lng = SENOVIO_LNG,
  zoom = DEFAULT_ZOOM,
  popupText = companyAddressInline,
  className = "",
}: LeafletMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<LeafletMapInstance | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!containerRef.current || mapInstanceRef.current) return;

    let cancelled = false;

    async function init() {
      /* Dynamic import keeps the server-side bundle clean */
      const L = (await import("leaflet")).default;

      if (cancelled || !containerRef.current) return;

      /* ── Create the map ─────────────────────────────────── */
      const map = L.map(containerRef.current, {
        scrollWheelZoom: false,
        zoomControl: true,
      }).setView([lat, lng], zoom);

      mapInstanceRef.current = map;

      /* ── OpenStreetMap tile layer ───────────────────────── */
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      const markerIcon = L.divIcon({
        html: `
          <div style="
            display:flex;align-items:center;justify-content:center;
            width:44px;height:44px;border-radius:50% 50% 50% 4px;
            background:linear-gradient(135deg,#610000 0%,#920703 100%);
            box-shadow:0 4px 14px rgba(97,0,0,.35);
            transform:rotate(-45deg);
          ">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
              viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5"
              stroke-linecap="round" stroke-linejoin="round"
              style="transform:rotate(45deg)">
              <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
          </div>`,
        className: "senovio-marker",
        iconSize: [44, 44],
        iconAnchor: [4, 44],
        popupAnchor: [18, -40],
      });

      L.marker([lat, lng], { icon: markerIcon })
        .addTo(map)
        .bindPopup(
          `<div style="font-family:Inter,system-ui,sans-serif;font-weight:600;font-size:14px;color:#610000;min-width:180px;text-align:center;padding:4px 0;">
             ${popupText}
           </div>`,
          { className: "senovio-popup" },
        )
        .openPopup();

      /* Let the tiles settle before showing */
      map.whenReady(() => {
        setTimeout(() => {
          map.invalidateSize();
          setIsLoaded(true);
        }, 200);
      });
    }

    init();

    return () => {
      cancelled = true;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [lat, lng, zoom, popupText]);

  return (
    <div className={`leaflet-map-wrapper ${className}`}>
      {/* Skeleton / loading state */}
      {!isLoaded && (
        <div className="leaflet-map-skeleton">
          <div className="leaflet-map-skeleton-pulse" />
          <div className="leaflet-map-skeleton-label">
            <MapPin className="h-5 w-5" style={{ color: "#610000" }} />
            <span>Loading map...</span>
          </div>
        </div>
      )}

      <div
        ref={containerRef}
        id="senovio-contact-map"
        className="leaflet-map-container"
        style={{ opacity: isLoaded ? 1 : 0 }}
      />
    </div>
  );
}
