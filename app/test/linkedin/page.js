"use client";

import { useState } from "react";
import { useLinkedIn } from "@/components/contexts/LinkedInContext";

export default function TestLinkedInPage() {
  const { linkedInStatus } = useLinkedIn();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  const triggerEvent = async (event) => {
    try {
      setLoading(true);
      const response = await fetch("/api/test/linkedin-status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ event }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to trigger event");
      }

      const data = await response.json();
      setEvents(data.recentEvents);
    } catch (error) {
      console.error("Test error:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">LinkedIn Connection Test</h1>

      {/* Current Status */}
      <div className="bg-gray-800 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Current Status</h2>
        <pre className="bg-gray-900 p-4 rounded overflow-auto">
          {JSON.stringify(linkedInStatus, null, 2)}
        </pre>
      </div>

      {/* Test Controls */}
      <div className="bg-gray-800 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Test Controls</h2>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => triggerEvent("connected")}
            disabled={loading}
            className="btn btn-primary"
          >
            Simulate Connect
          </button>
          <button
            onClick={() => triggerEvent("disconnected")}
            disabled={loading}
            className="btn btn-error"
          >
            Simulate Disconnect
          </button>
          <button
            onClick={() => triggerEvent("expired")}
            disabled={loading}
            className="btn btn-warning"
          >
            Simulate Expiry
          </button>
          <button
            onClick={() => triggerEvent("revoked")}
            disabled={loading}
            className="btn btn-error"
          >
            Simulate Revoke
          </button>
        </div>
      </div>

      {/* Recent Events */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Events</h2>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Time</th>
                <th>Event</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id}>
                  <td>{new Date(event.occurred_at).toLocaleString()}</td>
                  <td>
                    <span
                      className={`badge ${
                        event.event_type === "connected"
                          ? "badge-success"
                          : "badge-error"
                      }`}
                    >
                      {event.event_type}
                    </span>
                  </td>
                  <td>
                    <pre className="text-xs">
                      {JSON.stringify(event.metadata, null, 2)}
                    </pre>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
