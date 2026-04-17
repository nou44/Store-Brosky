import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function RevenueChart({ orders }) {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orders.length > 0) {
      setLoading(false);
    }
  }, [orders]);

  // 🔥 جمع revenue حسب التاريخ
  const dataMap = {};

  orders.forEach((order) => {
    const date = new Date(order.createdAt).toLocaleDateString();

    if (!dataMap[date]) {
      dataMap[date] = 0;
    }

    dataMap[date] += order.total;
  });

  // 🔥 تحويل + ترتيب التواريخ
  const data = Object.keys(dataMap)
    .map((date) => ({
      date,
      revenue: dataMap[date],
    }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  // 🔥 today & yesterday
  const today = new Date().toLocaleDateString();

  const yesterdayDate = new Date();
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);
  const yesterday = yesterdayDate.toLocaleDateString();

  const todayRevenue = dataMap[today] || 0;
  const yesterdayRevenue = dataMap[yesterday] || 0;

  const diff = todayRevenue - yesterdayRevenue;

  // 🔥 Skeleton
  const Skeleton = () => (
    <div className="h-[220px] w-full bg-gray-200 dark:bg-[#111] animate-pulse rounded-xl" />
  );

  return (
    <div className="
      bg-white dark:bg-gradient-to-br dark:from-[#0a0a0a] dark:to-[#050505]
      border border-gray-200 dark:border-yellow-500/20
      rounded-2xl p-5
      shadow-md dark:shadow-[0_0_20px_rgba(234,179,8,0.1)]
      transition
    ">

      {/* 🔥 HEADER */}
      <div className="flex justify-between items-center mb-4">

        <div>
          <h2 className="text-yellow-500 font-bold text-lg">
            Revenue
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Daily income (DH)
          </p>
        </div>

        <div className="text-right">
          <p className="text-xs text-gray-400">Today</p>

          {/* 🔥 animated number */}
          <motion.p
            key={todayRevenue}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-yellow-500 font-bold text-lg"
          >
            {todayRevenue} DH
          </motion.p>

          {/* 🔥 diff */}
          <p className={`text-xs mt-1 ${diff >= 0 ? "text-green-500" : "text-red-500"}`}>
            {diff >= 0 ? "↑" : "↓"} {Math.abs(diff)} DH
          </p>
        </div>

      </div>

      {/* 🔥 CHART */}
      <div className="w-full h-[220px]">

        {loading ? (
          <Skeleton />
        ) : data.length === 0 ? (
          <p className="text-center text-gray-400 text-sm mt-10">
            No revenue data yet
          </p>
        ) : (

          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>

              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#eab308" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#eab308" stopOpacity={0}/>
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />

              <XAxis
                dataKey="date"
                tick={{ fontSize: 10 }}
                stroke="#888"
              />

              <YAxis
                tick={{ fontSize: 10 }}
                stroke="#888"
              />

              <Tooltip
                contentStyle={{
                  background: "#0a0a0a",
                  border: "1px solid rgba(234,179,8,0.3)",
                  borderRadius: "10px",
                  color: "#fff",
                }}
              />

              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#eab308"
                fillOpacity={1}
                fill="url(#colorRevenue)"
              />

            </AreaChart>
          </ResponsiveContainer>

        )}

      </div>

    </div>
  );
}