"use client";

import dynamic from "next/dynamic";
import { MapPin } from "lucide-react";
import type { ComponentProps } from "react";
import type LeafletMapComponent from "./LeafletMap";
import { companyAddressInline } from "@/lib/company";

type LeafletMapProps = ComponentProps<typeof LeafletMapComponent>;

const LeafletMap = dynamic(() => import("@/components/LeafletMap"), {
  ssr: false,
  loading: () => <MapFallback />,
});

function MapFallback() {
  return (
    <div className="flex h-[400px] items-center justify-center bg-[#f6faff]">
      <div className="flex items-center gap-3 rounded-lg bg-white/95 px-6 py-4 text-[#610000] shadow-lg backdrop-blur-sm">
        <MapPin className="h-6 w-6 text-[#610000]" aria-hidden="true" />
        <span className="max-w-lg text-center font-serif text-lg font-medium sm:text-xl">
          {companyAddressInline}
        </span>
      </div>
    </div>
  );
}

export default function LeafletMapDynamic(props: LeafletMapProps) {
  return <LeafletMap {...props} />;
}
