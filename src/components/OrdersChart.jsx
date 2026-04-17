import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,   // ✅ زيد هادي
  Area             // ✅ وزيد هادي
} from "recharts";

export default function OrdersChart({ orders }) {

  const [filter, setFilter] = useState("week");

  // 🔥 filter logic
  const filterOrders = () => {
    const now = new Date();

    return orders.filter((o) => {
      const date = new Date(o.createdAt);

      if (filter === "today") {
        return date.toDateString() === now.toDateString();
      }

      if (filter === "week") {
        const last7 = new Date();
        last7.setDate(now.getDate() - 7);
        return date >= last7;
      }

      if (filter === "month") {
        const last30 = new Date();
        last30.setDate(now.getDate() - 30);
        return date >= last30;
      }

      return true;
    });
  };

  // 🔥 group by date
  const grouped = {};
  filterOrders().forEach((o) => {
    const date = new Date(o.createdAt).toLocaleDateString();

    if (!grouped[date]) grouped[date] = 0;

    grouped[date] += o.total;
  });

  const data = Object.keys(grouped).map((date) => ({
    date,
    total: grouped[date]
  }));

  return (
    <div className="
      w-full h-[320px]
      bg-white dark:bg-[#0a0a0a]
      border border-yellow-500/20
      rounded-2xl p-4
      shadow-[0_0_20px_rgba(234,179,8,0.1)]
    ">

      {/* 🔥 HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-yellow-500 font-bold">
          Orders Analytics
        </h2>

        {/* 🔥 FILTER BUTTONS */}
        <div className="flex gap-2 text-xs">
          {["today", "week", "month"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`
                px-3 py-1 rounded-lg border
                ${filter === f
                  ? "bg-yellow-500 text-black border-yellow-500"
                  : "border-gray-600 text-gray-400 hover:border-yellow-500"}
              `}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* 🔥 CHART */}
    <ResponsiveContainer width="100%" height="85%">
  <LineChart data={data}>

    {/* 🔥 GRID (خطوط خفيفة) */}
<CartesianGrid strokeDasharray="3 3" stroke="rgba(120,120,120,0.2)" />

    <XAxis
      dataKey="date"
      stroke="#999"
      fontSize={11}
      tickLine={false}
      axisLine={false}
    />

    <YAxis
      stroke="#999"
      tickLine={false}
      axisLine={false}
    />

    <Tooltip
      contentStyle={{
        background: "#0a0a0a",
        border: "1px solid rgba(234,179,8,0.3)",
        borderRadius: "12px",
        color: "#fff",
        boxShadow: "0 0 15px rgba(234,179,8,0.2)"
      }}
    />

    {/* 🔥 AREA (Glow effect) */}
    <Area
      type="monotone"
      dataKey="total"
      stroke="#eab308"
      fill="url(#colorGradient)"
      strokeWidth={3}
      dot={false}
      activeDot={{ r: 6 }}
    />

    {/* 🔥 GRADIENT */}
    <defs>
      <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#eab308" stopOpacity={0.4}/>
        <stop offset="100%" stopColor="#eab308" stopOpacity={0}/>
      </linearGradient>
    </defs>

  </LineChart>
</ResponsiveContainer>

    </div>
  );
}