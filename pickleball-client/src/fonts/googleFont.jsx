import { DM_Sans, Barlow_Condensed, Dongle } from "next/font/google";


export const dm_sans = DM_Sans({
    subsets: ["latin"],
    variable: "--font-dm_sans"
});

export const barlow_condensed = Barlow_Condensed({
    weight: ["300", "500", "600"],
    subsets: ["latin"],
    variable: "--font-barlow-condensed"
});

export const dongle = Dongle({
    weight: ["700"],
    subsets: ["latin"],
    variable: "--font-protest_riot"
});
