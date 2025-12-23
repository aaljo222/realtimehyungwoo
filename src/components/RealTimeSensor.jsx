import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import mqtt from "mqtt"; // ✅ 핵심 수정

export default function RealTimeSensor() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const client = mqtt.connect(
      "wss://4a5fc65629c14cddb65aee8dbbe0eeee.s1.eu.hivemq.cloud:8884/mqtt",
      {
        username: "green1234",
        password: "green1234A",
        protocol: "wss",
      }
    );

    client.on("connect", () => {
      console.log("✅ MQTT connected");
      client.subscribe("jaeseok");
    });

    client.on("message", (_, message) => {
      try {
        const msg = JSON.parse(message.toString());
        msg.created_at = new Date().toLocaleTimeString();
        setData((prev) => [...prev.slice(-49), msg]);
      } catch (e) {
        console.error(e);
      }
    });

    return () => client.end();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>📡 MPU6050 Realtime Chart</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <XAxis dataKey="created_at" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line dataKey="ax" stroke="#ff0000" dot={false} />
          <Line dataKey="ay" stroke="#00ff00" dot={false} />
          <Line dataKey="az" stroke="#0000ff" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
