"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        flexDirection: "column",
        color: "#fff",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
      aria-label="Loading"
    >
      <motion.div
        style={{
          border: "6px solid #ccc",
          borderTop: "6px solid #1e90ff",
          borderRadius: "50%",
          width: 60,
          height: 60,
          marginBottom: 20,
        }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />
      <div style={{ fontSize: 18, fontWeight: "600" }}>กำลังโหลดหน้า Emp...</div>
    </div>
  );
}