import { readFileSync, writeFileSync } from "fs";
import path from "path";
import { revalidatePath } from "next/cache";

export interface Doctor {
  id: string;
  name: string;
  title: string;
  specialty: string;
  bio: string;
  qualifications: string[];
  image: string;
  isCofounder: boolean;
  order: number;
}

export interface Service {
  id: string;
  name: string;
  brief: string;
  tag: string;
  icon: string;
  color?: string;
  description: string;
  procedures: string[];
}

export interface SiteImages {
  hero: string;
  ethos: string;
  team: string;
  facility: string[];
}

export interface SiteSettings {
  contact: {
    phone: string;
    email: string;
    address: string;
    addressDetail: string;
  };
  hours: { days: string; hours: string }[];
  stats: { value: string; label: string }[];
}

function getDataFilePath(filename: string): string {
  return path.join(process.cwd(), "data", filename);
}

export function getDoctors(): Doctor[] {
  try {
    const raw = readFileSync(getDataFilePath("doctors.json"), "utf-8");
    return JSON.parse(raw);
  } catch (error) {
    console.error("Error reading doctors.json:", error);
    return [];
  }
}

export function getServices(): Service[] {
  try {
    const raw = readFileSync(getDataFilePath("services.json"), "utf-8");
    return JSON.parse(raw);
  } catch (error) {
    console.error("Error reading services.json:", error);
    return [];
  }
}

export function getImages(): SiteImages {
  try {
    const raw = readFileSync(getDataFilePath("images.json"), "utf-8");
    return JSON.parse(raw);
  } catch (error) {
    console.error("Error reading images.json:", error);
    return {
      hero: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1600&h=900&fit=crop&q=80",
      ethos: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=560&h=750&fit=crop&q=80",
      team: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=1000&fit=crop&q=80",
      facility: [],
    };
  }
}

export function getSettings(): SiteSettings {
  try {
    const raw = readFileSync(getDataFilePath("settings.json"), "utf-8");
    return JSON.parse(raw);
  } catch (error) {
    console.error("Error reading settings.json:", error);
    return {
      contact: {
        phone: "0721 817 238",
        email: "care@afyahub.co.ke",
        address: "AfyaHub Centre, Nairobi",
        addressDetail: "Off Waiyaki Way, Westlands",
      },
      hours: [
        { days: "Mon – Fri", hours: "8:00 – 17:00" },
        { days: "Saturday", hours: "9:00 – 13:00" },
        { days: "Sunday", hours: "Closed" },
      ],
      stats: [
        { value: "Multiple", label: "Consultant specialists" },
        { value: "04", label: "Specialty services" },
        { value: "< 1 day", label: "Booking response" },
      ],
    };
  }
}

export function saveJsonData(filename: string, data: any): boolean {
  try {
    const filePath = getDataFilePath(filename);
    writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
    try {
      revalidatePath("/", "layout");
      revalidatePath("/");
      revalidatePath("/services");
      revalidatePath("/team");
      revalidatePath("/cofounders");
      revalidatePath("/visit");
      revalidatePath("/faq");
      revalidatePath("/contact");
      revalidatePath("/appointment");
    } catch {
      // ignore in environments where revalidatePath isn't active
    }
    return true;
  } catch (error) {
    console.error(`Error saving ${filename}:`, error);
    return false;
  }
}
