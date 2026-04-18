import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import OrdersChart from "../components/OrdersChart";
import OrdersCountChart from "../components/OrdersCountChart";
import TopProducts from "../components/TopProducts";
import RevenueChart from "../components/RevenueChart";
export default function Dashboard() {

  const [orders, setOrders] = useState([]);
  const [messages, setMessages] = useState([]);
  const [subs, setSubs] = useState([]);
const [loading, setLoading] = useState(true);
const [visibleOrders, setVisibleOrders] = useState(2);
const [visibleMessages, setVisibleMessages] = useState(2);
const [visibleSubs, setVisibleSubs] = useState(2);

const API_URL = import.meta.env.VITE_API_URL;

const Skeleton = () => (
  <div className="p-4 rounded-xl bg-gray-200 dark:bg-[#111] animate-pulse">
    <div className="h-3 w-1/3 bg-gray-300 dark:bg-gray-700 mb-2 rounded"></div>
    <div className="h-3 w-1/2 bg-gray-300 dark:bg-gray-700 mb-2 rounded"></div>
    <div className="h-3 w-1/4 bg-gray-300 dark:bg-gray-700 rounded"></div>
  </div>
);
// 🔥 FETCH DATA
useEffect(() => {
    console.log("API URL:", API_URL); // 👈 هنا
  fetch(`${import.meta.env.VITE_API_URL}/api/orders`)
    .then(res => {
      if (!res.ok) throw new Error("Orders fetch failed");
      return res.json();
    })
    .then(data => {
      setOrders(data);
      setLoading(false);
    })
    .catch(err => {
      console.error("❌ Orders error:", err);
      setLoading(false);
    });

  fetch(`${import.meta.env.VITE_API_URL}/api/contact`)
    .then(res => {
      if (!res.ok) throw new Error("Contact fetch failed");
      return res.json();
    })
    .then(setMessages)
    .catch(err => console.error("❌ Contact error:", err));

  fetch(`${import.meta.env.VITE_API_URL}/api/subscribe`)
    .then(res => {
      if (!res.ok) throw new Error("Subscribe fetch failed");
      return res.json();
    })
    .then(setSubs)
    .catch(err => console.error("❌ Subscribe error:", err));
}, []);


const deleteOrder = async (id) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/orders/${id}`, {
    method: "DELETE"
  });

  if (res.ok) {
    setOrders(prev => prev.filter(o => o._id !== id));
  }
};

const deleteMessage = async (id) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/contact/${id}`, {
    method: "DELETE"
  });

  if (res.ok) {
    setMessages(prev => prev.filter(m => m._id !== id));
  }
};

const deleteSub = async (id) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/subscribe/${id}`, {
    method: "DELETE"
  });

  if (res.ok) {
    setSubs(prev => prev.filter(s => s._id !== id));
  }
};
const logout = () => {

  window.location.href = "/login";
};
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white p-4 md:p-8">

      {/* 🔥 HEADER */}
      
     <div className="flex justify-between items-center mb-10">

  <div>
    <h1 className="text-2xl md:text-3xl font-bold text-yellow-500">
      Dashboard
    </h1>
    <span className="text-sm text-gray-400">
      Admin Panel
    </span>
  </div>



</div>

      {/* 🔥 STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <StatCard title="Orders" value={orders.length} />
        <StatCard title="Messages" value={messages.length} />
        <StatCard title="Subscribers" value={subs.length} />
      </div>
<div className="grid md:grid-cols-2 gap-6 mb-10">
  <OrdersChart orders={orders} />
  <OrdersCountChart orders={orders} />
</div>

<div className="grid md:grid-cols-2 gap-6 mb-10">
  <TopProducts orders={orders} />
   <RevenueChart orders={orders} />
</div>



      {/* 🔥 SECTIONS */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* 🟡 ORDERS */}
    <Box title="Recent Orders">

<div className="max-h-[400px] overflow-y-auto pr-1 space-y-3 no-scrollbar">

   {loading
  ? Array(3).fill(0).map((_, i) => <Skeleton key={i} />)
  : orders.slice(0, visibleOrders).map((o) => (
      <Item key={o._id}>

        <div className="space-y-1 text-sm">

          <p><span className="text-gray-400">👤 Name:</span> {o.customer?.name}</p>
          <p><span className="text-gray-400">📞 Phone:</span> {o.customer?.phone}</p>
          <p><span className="text-gray-400">📍 City:</span> {o.customer?.city}</p>
          <p className="text-gray-500 text-xs">
            🏠 {o.customer?.address}
          </p>

          <p className="text-xs text-gray-400">
            📅 {new Date(o.createdAt).toLocaleString()}
          </p>

          <div className="mt-2 space-y-1">
            {o.items?.map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-xs">
                <span>🛒</span>
                <span>{item.name} × {item.qty}</span>
                <span className="text-gray-400">
                  ({item.color} / {item.size})
                </span>
              </div>
            ))}
          </div>

        </div>

        <div className="flex items-center gap-3">
          <span className="text-yellow-500 font-bold text-lg">
            {o.total} DH
          </span>

          <button
            onClick={() => deleteOrder(o._id)}
            className="text-red-500 hover:scale-125 hover:text-red-600 transition"
          >
            🗑️
          </button>
        </div>

      </Item>
    ))}

  </div>

  {/* 🔥 BUTTON */}
  {visibleOrders < orders.length && (
    <button
      onClick={() => setVisibleOrders(prev => prev + 3)}
      className="mt-3 text-xs text-yellow-500 hover:underline"
    >
      Show more ↓
    </button>
  )}

</Box>

        {/* 🔵 MESSAGES */}
    <Box title="Messages">

  <div className="max-h-[400px] overflow-y-auto pr-1 space-y-3 no-scrollbar">

    {messages.slice(0, visibleMessages).map((m) => (
      <Item key={m._id}>

        <div className="space-y-1 text-sm">
          <p><span className="text-gray-400">👤 Name:</span> {m.name}</p>
          <p><span className="text-gray-400">📧 Email:</span> {m.email}</p>

          <p className="text-xs text-gray-500 mt-1">
            💬 {m.message}
          </p>

          <p className="text-xs text-gray-400">
            📅 {new Date(m.createdAt).toLocaleString()}
          </p>
        </div>

        <button
          onClick={() => deleteMessage(m._id)}
          className="text-red-500 hover:scale-125 hover:text-red-600 transition"
        >
          🗑️
        </button>

      </Item>
    ))}

  </div>

  {visibleMessages < messages.length && (
    <button
  onClick={() => setVisibleProducts(products.length)}
  className="mt-3 text-xs text-yellow-500 hover:underline"
>
  Show more ↓
</button>
  )}

</Box>
        {/* 🟢 SUBSCRIBERS */}
      <Box title="Subscribers">

  <div className="max-h-[400px] overflow-y-auto pr-1 space-y-3 no-scrollbar">

    {subs.slice(0, visibleSubs).map((s) => (
      <Item key={s._id}>

        <div className="flex flex-col text-sm">
          <span>📧 {s.email}</span>
          <span className="text-xs text-gray-400">
            📅 {new Date(s.createdAt).toLocaleDateString()}
          </span>
        </div>

        <button
          onClick={() => deleteSub(s._id)}
          className="text-red-500 hover:scale-125 hover:text-red-600 transition"
        >
          🗑️
        </button>

      </Item>
    ))}

  </div>

  {visibleSubs < subs.length && (
   <button
  onClick={() => setVisibleProducts(products.length)}
  className="mt-3 text-xs text-yellow-500 hover:underline"
>
  Show more ↓
</button>
  )}

</Box>

      </div>

    </div>
  );
}


// 🔥 COMPONENTS

function StatCard({ title, value }) {
  return (
    <motion.div
      whileHover={{ scale: 1.07 }}
      className="
        p-5 rounded-2xl
        bg-gradient-to-br from-yellow-500/10 to-transparent
        border border-yellow-500/20
        text-center
        shadow-md
        hover:shadow-yellow-500/30
        transition
      "
    >
      <p className="text-gray-400 text-sm">{title}</p>
      <h2 className="text-3xl font-bold text-yellow-500">{value}</h2>
    </motion.div>
  );
}

function Box({ title, children }) {
  return (
    <div className="
      bg-white dark:bg-[#0a0a0a]
      border border-yellow-500/20
      rounded-2xl
      p-5
      shadow-[0_0_20px_rgba(234,179,8,0.1)]
      hover:shadow-[0_0_30px_rgba(234,179,8,0.2)]
      transition
    ">
      <h2 className="text-lg font-bold mb-4 text-yellow-500">
        {title}
      </h2>

      <div className="space-y-3">
        {children}
      </div>
    </div>
  );
}

function Item({ children }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="
        flex justify-between items-start
        p-4 rounded-xl
        bg-gray-100 dark:bg-[#111]
        border border-yellow-500/10

        hover:border-yellow-500/40
        hover:shadow-[0_0_15px_rgba(234,179,8,0.25)]

        transition duration-300
      "
    >
      {children}
    </motion.div>
  );
}