import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sun, Users, Leaf, ShieldCheck, X, FlaskConical, 
  CheckCircle2, AlertTriangle, ShoppingCart, Menu, 
  XCircle, Plus, Minus, Trash2, Phone, Mail, MapPin,
  ChevronLeft, ChevronRight
} from "lucide-react";

// Datos de productos
const products = [
  {
    id: 1,
    name: "Paquete Básico",
    weight: "30 gramos",
    description: "Ideal para huertos pequeños y jardines domésticos",
    price: 15000,
    image: "/images/producto1.png",
    features: ["Para hasta 10m²", "Aplicación sencilla", "Resultados en 4 semanas"]
  },
  {
    id: 2,
    name: "Paquete Estándar",
    weight: "500 gramos",
    description: "Perfecto para cultivos medianos y pequeños agricultores",
    price: 220000,
    image: "/images/producto2.png",
    features: ["Para hasta 100m²", "Rendimiento optimizado", "Ahorro en fertilizantes"]
  },
  {
    id: 3,
    name: "Paquete Premium",
    weight: "1 kilogramo",
    description: "Para grandes extensiones agrícolas y cooperativas",
    price: 450000,
    image: "/images/producto3.png",
    features: ["Para más de 500m²", "Máxima efectividad", "Soporte técnico incluido"]
  }
];

export default function App() {
  const [metalLevel, setMetalLevel] = useState(60);
  const [activeTab, setActiveTab] = useState("overview");
  const [showTeam, setShowTeam] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [cart, setCart] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [testimonials, setTestimonials] = useState([
    { id: 1, name: "Juan Pérez", role: "Distribuidor", text: "Trabajamos con productores que utilizan Myco-grow, y la diferencia es evidente. Las frutas y verduras son más resistentes y de mejor calidad", rating: 5 },
    { id: 2, name: "María González", role: "Agricultora", text: "Mi experiencia con Myco-grow ha sido increíble. No solo ha mejorado la calidad del suelo, sino que mis productos están más saludables", rating: 4 },
    { id: 3, name: "Carlos Rodríguez", role: "Agricultor", text: "Desde que utilizo Myco-grow, la salud de mis cultivos ha mejorado notablemente", rating: 5 }
  ]);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const productsRef = useRef(null);
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  function estimateRisk(level) {
    if (level <= 25) return { label: "Bajo", color: "text-emerald-700", pct: 10 };
    if (level <= 50) return { label: "Moderado", color: "text-amber-600", pct: 35 };
    if (level <= 75) return { label: "Alto", color: "text-orange-700", pct: 65 };
    return { label: "Muy alto", color: "text-red-600", pct: 90 };
  }

  const risk = estimateRisk(metalLevel);

  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
    setMobileMenuOpen(false);
  };

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const handleCheckout = () => {
    alert(`¡Gracias por tu compra! Total: $${cartTotal.toLocaleString()}`);
    setCart([]);
    setShowCart(false);
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-emerald-50 text-slate-800 antialiased">
      {/* Header Mejorado */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-emerald-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo mejorado */}
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-full shadow-lg overflow-hidden border-4 border-white">
                <img 
                  src="/images/logo.png" 
                  alt="Myco-grow Logo" 
                  className="w-full h-full object-cover p-2"
                />
              </div>
              <div>
                <h1 className="font-bold text-2xl text-emerald-900">Myco-grow</h1>
                <p className="text-xs text-slate-600 hidden sm:block">
                  Bioinóculo micorrícico — suelos sanos, cultivos seguros
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <button onClick={() => setActiveTab("overview")} className="text-sm font-medium hover:text-emerald-700 transition">
                Inicio
              </button>
              <button onClick={() => setActiveTab("how")} className="text-sm font-medium hover:text-emerald-700 transition">
                Tecnología
              </button>
              <button onClick={() => setActiveTab("impact")} className="text-sm font-medium hover:text-emerald-700 transition">
                Impacto
              </button>
              <button onClick={() => setActiveTab("simulator")} className="text-sm font-medium hover:text-emerald-700 transition">
                Simulador
              </button>
              <button onClick={scrollToProducts} className="text-sm font-medium hover:text-emerald-700 transition">
                Productos
              </button>
              <button onClick={() => setShowTeam(true)} className="text-sm font-medium hover:text-emerald-700 transition">
                Equipo
              </button>
            </nav>

            {/* Carrito y Mobile Menu */}
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setShowCart(true)}
                className="relative p-2 rounded-full hover:bg-emerald-50 transition"
              >
                <ShoppingCart size={24} className="text-emerald-700" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </button>
              
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-emerald-50"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden overflow-hidden"
              >
                <div className="pt-4 pb-2 border-t border-emerald-100 mt-4">
                  <div className="flex flex-col gap-3">
                    <button 
                      onClick={() => { setActiveTab("overview"); setMobileMenuOpen(false); }}
                      className="text-left py-2 hover:text-emerald-700 transition"
                    >
                      Inicio
                    </button>
                    <button 
                      onClick={() => { setActiveTab("how"); setMobileMenuOpen(false); }}
                      className="text-left py-2 hover:text-emerald-700 transition"
                    >
                      Tecnología
                    </button>
                    <button 
                      onClick={() => { setActiveTab("impact"); setMobileMenuOpen(false); }}
                      className="text-left py-2 hover:text-emerald-700 transition"
                    >
                      Impacto
                    </button>
                    <button 
                      onClick={() => { setActiveTab("simulator"); setMobileMenuOpen(false); }}
                      className="text-left py-2 hover:text-emerald-700 transition"
                    >
                      Simulador
                    </button>
                    <button 
                      onClick={scrollToProducts}
                      className="text-left py-2 hover:text-emerald-700 transition"
                    >
                      Productos
                    </button>
                    <button 
                      onClick={() => { setShowTeam(true); setMobileMenuOpen(false); }}
                      className="text-left py-2 hover:text-emerald-700 transition"
                    >
                      Equipo
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="py-12 md:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl sm:text-5xl md:text-6xl font-bold text-emerald-900 leading-tight"
              >
                Transformamos suelos contaminados en cultivos seguros
              </motion.h1>
              <p className="mt-6 text-lg text-slate-700 leading-relaxed">
                Myco-grow utiliza hongos micorrícicos arbusculares nativos para reducir 
                la acumulación de metales pesados y mejorar la salud del suelo agrícola.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab("how")}
                  className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow-lg transition"
                >
                  Ver cómo funciona
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowTeam(true)}
                  className="px-8 py-3 border-2 border-emerald-600 text-emerald-700 font-semibold rounded-xl bg-white hover:bg-emerald-50 transition"
                >
                  Conocer al equipo
                </motion.button>
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-3xl shadow-2xl overflow-hidden">
                <img 
                  src="/images/producto.jpg" 
                  alt="Producto Myco-grow" 
                  className="w-full h-64 md:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Sección de Productos */}
        <section ref={productsRef} className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-emerald-900 mb-4">Nuestros Productos</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Soluciones específicas para cada necesidad agrícola
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-emerald-100"
              >
                <div className="p-6">
  <div className="h-70 rounded-xl overflow-hidden mb-6">
    <div className="w-full h-full flex items-center justify-center p-6">
      <img 
        src={product.image} 
        alt={product.name}
        className="max-h-full max-w-full object-contain rounded-xl"
      />
    </div>
  </div>

                  
                  <h3 className="text-xl font-bold text-emerald-900 mb-2">{product.name}</h3>
                  <p className="text-slate-600 mb-4">{product.description}</p>
                  
                  <div className="mb-4">
                    <span className="text-2xl font-bold text-emerald-700">
                      ${product.price.toLocaleString()}
                    </span>
                    <span className="text-slate-500 ml-2">CLP</span>
                  </div>
                  
                  <div className="mb-6">
                    <p className="font-medium text-slate-700 mb-2">Contenido: {product.weight}</p>
                    <ul className="space-y-1">
                      {product.features.map((feature, i) => (
                        <li key={i} className="flex items-center text-sm text-slate-600">
                          <CheckCircle2 size={16} className="text-emerald-500 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <button
                    onClick={() => addToCart(product)}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition flex items-center justify-center gap-2"
                  >
                    <ShoppingCart size={20} />
                    Agregar al carrito
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Sección de pestañas (Overview, Tecnología, etc.) */}
        <section className="py-16">
          <div className="bg-white rounded-3xl shadow-xl border border-emerald-100 overflow-hidden">
            <div className="border-b border-emerald-100">
              <div className="flex overflow-x-auto">
                {["overview", "how", "impact", "simulator"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 sm:flex-none px-6 py-4 font-medium transition ${
                      activeTab === tab
                        ? "text-emerald-700 border-b-2 border-emerald-700 bg-emerald-50"
                        : "text-slate-600 hover:text-emerald-600 hover:bg-emerald-50/50"
                    }`}
                  >
                    {tab === "overview" && "Overview"}
                    {tab === "how" && "Tecnología"}
                    {tab === "impact" && "Impacto"}
                    {tab === "simulator" && "Simulador"}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6 md:p-8">
              {activeTab === "overview" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  <div>
                    <h3 className="text-2xl font-bold text-emerald-900 mb-4">¿Qué es Myco-grow?</h3>
                    <p className="text-slate-700 leading-relaxed">
                      Myco-grow es un bioinóculo creado específicamente para los suelos chilenos. 
                      Utiliza micorrizas nativas para proteger los cultivos y mejorar su rendimiento 
                      de forma natural y sostenible.
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-semibold text-emerald-800 mb-3">Beneficios principales</h4>
                      <ul className="space-y-2">
                        {[
                          "Reduce la translocación de metales pesados",
                          "Mejora absorción de nutrientes esenciales",
                          "Aumenta resistencia al estrés hídrico",
                          "Favorece suelos más saludables y productivos"
                        ].map((item, i) => (
                          <li key={i} className="flex items-start">
                            <CheckCircle2 size={18} className="text-emerald-500 mt-0.5 mr-3 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-gradient-to-br from-emerald-50 to-lime-50 rounded-xl p-6">
                      <h4 className="font-semibold text-emerald-900 mb-4">Datos clave</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white rounded-xl p-4 shadow text-center">
                          <div className="text-3xl font-bold text-emerald-800">27%</div>
                          <p className="text-xs text-slate-600 mt-1">de suelos contaminados en Chile</p>
                        </div>
                        <div className="bg-white rounded-xl p-4 shadow text-center">
                          <div className="text-3xl font-bold text-emerald-800">3</div>
                          <p className="text-xs text-slate-600 mt-1">metales críticos reducidos</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "how" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-2xl font-bold text-emerald-900 mb-6">Nuestra Tecnología</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    {[
                      {
                        icon: ShieldCheck,
                        title: "Inmovilización",
                        description: "Las hifas retienen metales pesados impidiendo que lleguen al fruto."
                      },
                      {
                        icon: Leaf,
                        title: "Nutrición mejorada",
                        description: "Mayor absorción de fósforo, nitrógeno y micronutrientes esenciales."
                      },
                      {
                        icon: Sun,
                        title: "Resiliencia",
                        description: "Mejora tolerancia al estrés hídrico, lumínico y salino."
                      }
                    ].map((item, i) => (
                      <div key={i} className="bg-emerald-50 rounded-xl p-6">
                        <item.icon size={24} className="text-emerald-700 mb-4" />
                        <h4 className="font-semibold text-emerald-900 mb-2">{item.title}</h4>
                        <p className="text-slate-700 text-sm">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === "impact" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-2xl font-bold text-emerald-900 mb-6">Impacto Positivo</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    {[
                      { color: "bg-emerald-50", title: "Eficiencia agrícola", desc: "Reduce costos en fertilizantes y mejora rendimientos." },
                      { color: "bg-amber-50", title: "Seguridad alimentaria", desc: "Evita la llegada de metales al fruto, protegiendo la salud." },
                      { color: "bg-sky-50", title: "Regeneración ambiental", desc: "Mejora la biodiversidad y estructura del suelo." }
                    ].map((item, i) => (
                      <div key={i} className={`${item.color} rounded-xl p-6`}>
                        <h4 className="font-semibold text-emerald-900 mb-3">{item.title}</h4>
                        <p className="text-slate-700 text-sm">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === "simulator" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-bold text-emerald-900 mb-2">
                        Simulador de riesgo por metales pesados
                      </h3>
                      <p className="text-slate-600">
                        Ajusta el nivel de metales en tu suelo y observa el riesgo estimado de rechazo de cosecha.
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm text-slate-600">Nivel de metales en suelo</span>
                            <span className="font-semibold text-emerald-700">{metalLevel}%</span>
                          </div>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={metalLevel}
                            onChange={(e) => setMetalLevel(Number(e.target.value))}
                            className="w-full h-2 bg-emerald-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-emerald-700"
                          />
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <span className={`font-semibold ${risk.color}`}>{risk.label}</span>
                              <span className="text-slate-500 text-sm ml-2">riesgo</span>
                            </div>
                            <div className="text-lg font-bold">{risk.pct}%</div>
                          </div>

                          <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${risk.color.replace('text-', 'bg-')}`}
                              style={{ width: `${risk.pct}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-emerald-50 to-lime-50 rounded-xl p-6">
                        <h4 className="font-semibold text-emerald-900 mb-3">Caso de estudio</h4>
                        <p className="text-slate-700">
                          Un agricultor local con niveles de {metalLevel}% de metales en su suelo 
                          enfrenta un riesgo del {risk.pct}% de que su cosecha sea rechazada en 
                          el mercado de exportación.
                        </p>
                        <div className="mt-4 p-3 bg-white rounded-lg">
                          <p className="text-sm text-slate-600">
                            Con Myco-grow, este riesgo podría reducirse en hasta un 80%.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* Testimonios */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-emerald-900 mb-4">Testimonios</h2>
            <p className="text-slate-600">Lo que dicen nuestros clientes</p>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-700 p-8">
              <div className="flex items-center justify-between mb-8">
                <button
                  onClick={prevTestimonial}
                  className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition"
                >
                  <ChevronLeft size={24} className="text-white" />
                </button>
                
                <div className="flex gap-2">
                  {testimonials.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentTestimonial(idx)}
                      className={`w-2 h-2 rounded-full transition ${
                        currentTestimonial === idx ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
                
                <button
                  onClick={nextTestimonial}
                  className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition"
                >
                  <ChevronRight size={24} className="text-white" />
                </button>
              </div>

              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center text-white"
              >
                <div className="text-4xl mb-4">"</div>
                <p className="text-xl italic mb-6">
                  {testimonials[currentTestimonial].text}
                </p>
                <div>
                  <p className="font-semibold">{testimonials[currentTestimonial].name}</p>
                  <p className="text-emerald-200">{testimonials[currentTestimonial].role}</p>
                  <div className="flex justify-center gap-1 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} filled={i < testimonials[currentTestimonial].rating} />
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-emerald-900 mb-4">Preguntas Frecuentes</h2>
            <p className="text-slate-600">Resolvemos tus dudas</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                q: "¿Es compatible con fertilizantes químicos?",
                a: "Sí, Myco-grow es compatible con la mayoría de los fertilizantes, pero reduce significativamente la necesidad de usarlos en exceso."
              },
              
                           {
                q: "¿Cuánto tiempo dura el efecto?",
                a: "Una sola aplicación puede proteger tus cultivos durante toda la temporada de crecimiento."
              }
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="font-semibold text-emerald-900 mb-2">{item.q}</h3>
                <p className="text-slate-700">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer mejorado */}
        <footer className="py-12 mt-16 bg-gradient-to-b from-emerald-900 to-emerald-950 text-white rounded-3xl">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-12">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-white rounded-full overflow-hidden">
                    <img src="/images/logo.png" alt="Logo" className="w-full h-full object-cover p-2" />
                  </div>
                  <h3 className="text-2xl font-bold">Myco-grow</h3>
                </div>
                <p className="text-emerald-200 mb-6">
                  Innovación biológica para una agricultura sostenible y segura.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Phone size={18} />
                    <span>+56 9 1234 5678</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail size={18} />
                    <a href="mailto:mycogrow@gmail.com" className="hover:text-emerald-300 transition">
                      mycogrow@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin size={18} />
                    <span>Talca, Chile</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-6">Enlaces rápidos</h4>
                <ul className="space-y-3">
                  <li><button onClick={() => setActiveTab("overview")} className="hover:text-emerald-300 transition">Inicio</button></li>
                  <li><button onClick={() => setActiveTab("how")} className="hover:text-emerald-300 transition">Tecnología</button></li>
                  <li><button onClick={scrollToProducts} className="hover:text-emerald-300 transition">Productos</button></li>
                  <li><button onClick={() => setShowTeam(true)} className="hover:text-emerald-300 transition">Equipo</button></li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-6">Síguenos</h4>
                <div className="flex gap-4 mb-6">
                  <a href="#" className="w-10 h-10 bg-emerald-800 hover:bg-emerald-700 rounded-full flex items-center justify-center transition">
                    <span className="font-semibold">IG</span>
                  </a>
                  <a href="#" className="w-10 h-10 bg-emerald-800 hover:bg-emerald-700 rounded-full flex items-center justify-center transition">
                    <span className="font-semibold">TW</span>
                  </a>
                  <a href="#" className="w-10 h-10 bg-emerald-800 hover:bg-emerald-700 rounded-full flex items-center justify-center transition">
                    <span className="font-semibold">FB</span>
                  </a>
                </div>
                <p className="text-emerald-300 text-sm">
                  Suscríbete a nuestro newsletter para recibir actualizaciones
                </p>
                <div className="mt-4 flex">
                  <input
                    type="email"
                    placeholder="Tu correo"
                    className="flex-1 px-4 py-2 rounded-l-lg text-slate-900"
                  />
                  <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-r-lg transition">
                    Suscribir
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-emerald-800 text-center">
              <p className="text-emerald-300">
                © {new Date().getFullYear()} Myco-grow. Todos los derechos reservados.
              </p>
            </div>
          </div>
        </footer>
      </main>

      {/* Modal del Carrito */}
      <AnimatePresence>
        {showCart && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowCart(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-emerald-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-emerald-900">Tu Carrito</h2>
                  <button
                    onClick={() => setShowCart(false)}
                    className="p-2 hover:bg-emerald-50 rounded-full transition"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              <div className="p-6 overflow-y-auto max-h-[50vh]">
                {cart.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingCart size={64} className="mx-auto text-emerald-200 mb-4" />
                    <p className="text-slate-600">Tu carrito está vacío</p>
                    <button
                      onClick={() => {
                        setShowCart(false);
                        scrollToProducts();
                      }}
                      className="mt-4 px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
                    >
                      Ver productos
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 p-4 bg-emerald-50 rounded-lg">
                        <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center">
                          <img src={item.image} alt={item.name} className="h-12 object-contain" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-emerald-900">{item.name}</h4>
                          <p className="text-sm text-slate-600">{item.weight}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-white rounded"
                          >
                            <Minus size={20} />
                          </button>
                          <span className="w-8 text-center font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-white rounded"
                          >
                            <Plus size={20} />
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-emerald-900">
                            ${(item.price * item.quantity).toLocaleString()}
                          </p>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-700 text-sm mt-1"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-6 border-t border-emerald-100">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-lg font-semibold">Total:</span>
                    <span className="text-2xl font-bold text-emerald-900">
                      ${cartTotal.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex gap-4">
                    <button
                      onClick={() => setShowCart(false)}
                      className="flex-1 py-3 border-2 border-emerald-600 text-emerald-700 font-semibold rounded-lg hover:bg-emerald-50 transition"
                    >
                      Seguir comprando
                    </button>
                    <button
                      onClick={handleCheckout}
                      className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition"
                    >
                      Finalizar compra
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal del Equipo */}
      <AnimatePresence>
  {showTeam && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={() => setShowTeam(false)}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-emerald-100">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-emerald-900">Nuestro Equipo</h2>
            <button
              onClick={() => setShowTeam(false)}
              className="p-2 hover:bg-emerald-50 rounded-full transition"
            >
              <X size={24} />
            </button>
          </div>
        </div>
        <div className="p-6">
          <p className="text-center text-slate-700 mb-8">
            Un equipo multidisciplinario comprometido con la agricultura sostenible
          </p>
          <div className="grid grid-cols-2 gap-4">
            {[
              { name: "Emilia", position: "Líder de Producción y Formulación de Micorrizas", image: "emilia.png" },
              { name: "Jorge", position: "Analista de Mercado y Modelo de Negocios", image: "jorge.png" },
              { name: "Florencia", position: "Especialista en Biotecnología Aplicada", image: "florencia.png" },
              { name: "Aylin", position: "Investigación y Desarrollo (I+D)", image: "aylin.png" },
              { name: "Noelia", position: "Gestión Ambiental y Sustentabilidad", image: "noelia.png" },
            ].map((member, i) => (
              <div key={i} className="text-center p-4 bg-emerald-50 rounded-xl">
                <div className="w-16 h-16 rounded-full mx-auto mb-3 overflow-hidden border-2 border-white shadow">
                  <img 
                    src={`/images/${member.image}`} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="font-semibold text-emerald-900">{member.name}</h4>
                <p className="text-sm text-slate-600">{member.position}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
    </div>
  );
}

// Componente auxiliar para estrellas
function Star({ filled }) {
  return (
    <svg
      className={`w-5 h-5 ${filled ? 'text-yellow-400' : 'text-emerald-200'}`}
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}