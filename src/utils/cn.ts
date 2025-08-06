import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export default function cn(...inputs:(string|undefined)[]){
    return twMerge(clsx(inputs));
}