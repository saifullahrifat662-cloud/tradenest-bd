import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { Search, ShoppingCart, Menu, X, ChevronRight, MessageCircle, Package, ShieldCheck, Truck, Plus } from "lucide-react";
import "./styles.css";

const products = [
  { id: 1, name: "Multi-Function Desk Organizer", category: "Home & Office", price: 690, oldPrice: 850, image: "https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=900&q=80" },
  { id: 2, name: "Rechargeable Mini Fan", category: "Gadgets", price: 790, oldPrice: 990, image: "https://images.unsplash.com/photo-1565689157206-0fddef7589a7?auto=format&fit=crop&w=900&q=80" },
  { id: 3, name: "Premium Travel Organizer", category: "Travel", price: 850, oldPrice: 1050, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80" },
  { id: 4, name: "Smart LED Night Light", category: "Home & Office", price: 490, oldPrice: 650, image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=900&q=80" },
  { id: 5, name: "Wireless Charging Stand", category: "Gadgets", price: 990, oldPrice: 1250, image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=900&q=80" },
  { id: 6, name: "Everyday Carry Pouch", category: "Accessories", price: 550, oldPrice: 700, image: "https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?auto=format&fit=crop&w=900&q=80" }
];

const categories = ["All", "Gadgets", "Home & Office", "Travel", "Accessories"];

function App() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const filtered = useMemo(() => products.filter(p =>
    (category === "All" || p.category === category) &&
    p.name.toLowerCase().includes(query.toLowerCase())
  ), [category, query]);

  const addToCart = (product) => setCart(prev => [...prev, product]);
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const orderOnWhatsApp = () => {
    if (!cart.length) return;
    const items = cart.map((p, i) => `${i + 1}. ${p.name} - ৳${p.price}`).join("\n");
    const text = `Hello TradeNest BD, I want to order:\n${items}\nTotal: ৳${total}\n\nName:\nPhone:\nAddress:`;
    window.open(`https://wa.me/8801848111119?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="app">
      <div className="topbar">🇧🇩 Nationwide delivery available • Order directly with TradeNest BD</div>
      <header className="header">
        <a className="logo" href="#home"><span className="logoMark">TN</span><span><strong>TradeNest</strong><small>BD</small></span></a>
        <nav className={menuOpen ? "nav open" : "nav"}>
          <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="#products" onClick={() => setMenuOpen(false)}>Products</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </nav>
        <div className="headerActions">
          <div className="search"><Search size={18}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search products..." /></div>
          <button className="cartBtn" onClick={() => setShowCart(true)}><ShoppingCart size={21}/><span>{cart.length}</span></button>
          <button className="menuBtn" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</button>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="heroContent">
            <p className="eyebrow">SMART IMPORTS • BETTER VALUE</p>
            <h1>Useful products.<br/><em>Better prices.</em></h1>
            <p className="heroText">Discover practical products sourced from China and brought to Bangladesh with simple ordering and reliable delivery.</p>
            <div className="heroButtons"><a className="primary" href="#products">Shop Products <ChevronRight size={18}/></a><a className="secondary" href="#contact">Contact Us</a></div>
          </div>
          <div className="heroCard"><div className="heroBadge">TRADENEST BD</div><div className="floatingBox box1">📦<span>Imported</span></div><div className="floatingBox box2">✓<span>Quality focused</span></div><div className="heroCircle">TN</div></div>
        </section>

        <section className="benefits">
          <div><Package/><span><b>Imported Products</b><small>Direct sourcing</small></span></div>
          <div><ShieldCheck/><span><b>Quality Focused</b><small>Selected products</small></span></div>
          <div><Truck/><span><b>Bangladesh Delivery</b><small>Nationwide service</small></span></div>
        </section>

        <section className="productsSection" id="products">
          <div className="sectionHead"><div><p className="eyebrow">OUR COLLECTION</p><h2>Featured Products</h2></div>
            <div className="categories">{categories.map(c => <button key={c} className={category === c ? "active" : ""} onClick={() => setCategory(c)}>{c}</button>)}</div>
          </div>
          <div className="productGrid">
            {filtered.map(p => <article className="product" key={p.id}>
              <div className="productImage"><img src={p.image} alt={p.name}/><span>-{Math.round((1-p.price/p.oldPrice)*100)}%</span></div>
              <div className="productInfo"><small>{p.category}</small><h3>{p.name}</h3><div className="price"><strong>৳{p.price}</strong><del>৳{p.oldPrice}</del></div><button onClick={() => addToCart(p)}>Add to Cart <Plus size={17}/></button></div>
            </article>)}
          </div>
          {!filtered.length && <div className="empty">No products found.</div>}
        </section>

        <section className="about" id="about">
          <div><p className="eyebrow">WHY TRADENEST BD</p><h2>Making imports easier for Bangladesh.</h2></div>
          <p>TradeNest BD connects customers with useful, affordable imported products. We focus on practical items, transparent pricing and an easy ordering experience.</p>
        </section>

        <section className="contact" id="contact">
          <div><p className="eyebrow">READY TO ORDER?</p><h2>Talk to TradeNest BD</h2><p>For bulk orders, product requests or questions, contact us directly.</p></div>
          <div className="contactButtons"><a href="tel:+8801848111119">☎ 01848-111119</a><a href="https://wa.me/8801848111119" target="_blank" rel="noreferrer"><MessageCircle size={18}/> WhatsApp</a></div>
        </section>
      </main>

      <footer><div className="logo"><span className="logoMark">TN</span><span><strong>TradeNest</strong><small>BD</small></span></div><p>ThakurPara, Cumilla, Bangladesh</p><p>© 2026 TradeNest BD.</p></footer>

      {showCart && <div className="overlay" onClick={() => setShowCart(false)}>
        <aside className="cartPanel" onClick={e => e.stopPropagation()}>
          <div className="cartHead"><h2>Your Cart</h2><button onClick={() => setShowCart(false)}><X/></button></div>
          {!cart.length ? <div className="emptyCart"><ShoppingCart size={40}/><p>Your cart is empty.</p></div> :
          <><div className="cartItems">{cart.map((p,i)=><div className="cartItem" key={i}><img src={p.image} alt=""/><div><b>{p.name}</b><span>৳{p.price}</span></div></div>)}</div><div className="cartTotal"><span>Total</span><strong>৳{total}</strong></div><button className="orderBtn" onClick={orderOnWhatsApp}>Order via WhatsApp <MessageCircle size={18}/></button><button className="clearBtn" onClick={() => setCart([])}>Clear Cart</button></>}
        </aside>
      </div>}
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
