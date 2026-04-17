
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid   // ✅ هادي اللي ناقصة
} from "recharts";

export default function OrdersCountChart({ orders }) {

  const grouped = {};

  orders.forEach((o) => {
    const date = new Date(o.createdAt).toLocaleDateString();

    if (!grouped[date]) grouped[date] = 0;

    grouped[date] += 1; // 🔥 عدد الطلبات
  });

  const data = Object.keys(grouped).map((date) => ({
    date,
    count: grouped[date]
  }));

  return (
    <div className="
      w-full h-[300px]
      bg-white dark:bg-[#0a0a0a]
      border border-yellow-500/20
      rounded-2xl p-4
    ">

      <h2 className="text-yellow-500 font-bold mb-3">
        Orders Count
      </h2>

    <ResponsiveContainer width="100%" height="85%">
  <BarChart data={data}>

    <CartesianGrid strokeDasharray="3 3" stroke="rgba(120,120,120,0.15)" />

    <XAxis
      dataKey="date"
      stroke="#888"
      fontSize={11}
      tickLine={false}
      axisLine={false}
    />

    <YAxis stroke="#888" tickLine={false} axisLine={false} />

    <Tooltip
      cursor={{ fill: "rgba(234,179,8,0.08)" }}
      contentStyle={{
        background: "#0a0a0a",
        border: "1px solid rgba(234,179,8,0.3)",
        borderRadius: "12px",
        color: "#fff",
        boxShadow: "0 0 15px rgba(234,179,8,0.2)"
      }}
    />

    <Bar
      dataKey="count"
      radius={[10, 10, 0, 0]}
      fill="url(#barGradient)"
    />

    {/* 🔥 gradient */}
    <defs>
      <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#eab308" stopOpacity={0.9}/>
        <stop offset="100%" stopColor="#eab308" stopOpacity={0.3}/>
      </linearGradient>
    </defs>

  </BarChart>
</ResponsiveContainer>

    </div>
  );
}