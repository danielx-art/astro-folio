import { useEffect, useState } from "react";


export const CoolCanvas: React.FC = () => {

    const isTouchDevice = useTouch();

    return (
        <>
            Hello
        </>
    )
};

export const useTouch = () => {
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    const updateMedia = () => {
        setIsTouchDevice(( 'ontouchstart' in window ) || ( navigator.maxTouchPoints > 0 ));
    }

    useEffect(() => {
        window.addEventListener("resize", updateMedia);
        return () => window.removeEventListener("resize", updateMedia);
    });

    return isTouchDevice;
}