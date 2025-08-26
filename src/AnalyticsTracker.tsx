import { useEffect, useState } from "react";
import { useLocation, useNavigationType } from "react-router-dom";


function getOrCreateClientId() {
    const key = "oAnalytics_id";
    let id = localStorage.getItem(key);
    if (!id) {
        id = crypto.randomUUID(); // or use your own generator
        localStorage.setItem(key, id);
    }
    return id;
}

export const AnalyticsTracker = (
    { appId }: { appId: string }
) => {
    const location = useLocation();
    const navType = useNavigationType();

    const [sessionId] = useState(() => crypto.randomUUID());


    useEffect(() => {
        async function send() {
            const payload = {
                session_id: sessionId,
                client_id: getOrCreateClientId(),
                path: location.pathname + location.search + location.hash,
                search: location.search,
                hash: location.hash,
                navigationType: navType,
                timestamp: Date.now(),
                userAgent: navigator.userAgent,
                referrer: document.referrer || "direct",
                app_id: "ec2e4fe5-e46d-459d-895c-6618a57aae83"
            };

            // navigator.sendBeacon("http://localhost:3000/log", JSON.stringify(payload));


            const response = await fetch("http://localhost:3001/log", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const result = await response.json();
            console.log(result);
        }

        send()
    }, [location, navType]);

    return null;
};

