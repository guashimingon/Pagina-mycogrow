import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sun, Users, Leaf, ShieldCheck, Atom, X, FlaskConical, CheckCircle2, AlertTriangle } from "lucide-react";

export default function App() {
  const [metalLevel, setMetalLevel] = useState(60);
  const [activeTab, setActiveTab] = useState("overview");
  const [showTeam, setShowTeam] = useState(false);

  function estimateRisk(level) {
    if (level <= 25) return { label: "Bajo", color: "text-emerald-700", pct: 10 };
    if (level <= 50) return { label: "Moderado", color: "text-amber-600", pct: 35 };
    if (level <= 75) return { label: "Alto", color: "text-orange-700", pct: 65 };
    return { label: "Muy alto", color: "text-red-600", pct: 90 };
  }

  const risk = estimateRisk(metalLevel);

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-100 via-lime-50 to-white text-slate-800 antialiased">
      <header className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between sticky top-4 backdrop-blur-md bg-white/90 z-20 shadow-md rounded-2xl border border-emerald-200">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 flex items-center justify-center shadow rounded-full overflow-hidden">
  <img src="/images/logo.png" alt="Logo" className="w-full h-full object-cover" />
</div>
          <div>
            <h1 className="font-bold text-xl text-emerald-800">Myco-grow</h1>
            <p className="text-xs text-slate-500">Bioinóculo micorrícico — suelos sanos, cultivos seguros</p>
          </div>
        </div>

        <nav className="hidden md:flex gap-6 text-sm">
          <button onClick={() => setActiveTab("overview")} className={`${activeTab === 'overview' ? 'text-emerald-900 font-semibold' : ''} hover:text-emerald-600`}>Inicio</button>
          <button onClick={() => setActiveTab("how")} className={`${activeTab === 'how' ? 'text-emerald-900 font-semibold' : ''} hover:text-emerald-600`}>Tecnología</button>
          <button onClick={() => setActiveTab("impact")} className={`${activeTab === 'impact' ? 'text-emerald-900 font-semibold' : ''} hover:text-emerald-600`}>Impacto</button>
          <button onClick={() => setActiveTab("simulator")} className={`${activeTab === 'simulator' ? 'text-emerald-900 font-semibold' : ''} hover:text-emerald-600`}>Simulador</button>
<button onClick={() => setActiveTab("productos")} className={`${activeTab === 'productos' ? 'bg-emerald-100 text-emerald-900' : ''} px-4 py-2 rounded-md`}>Nuestros productos</button>
          <button onClick={() => setShowTeam(true)} className="flex items-center gap-1 hover:text-emerald-600"><Users size={16}/> Equipo</button>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-6 mt-10">
        <section className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <motion.h2 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="text-5xl font-extrabold text-emerald-900 leading-tight drop-shadow-sm">Transformamos suelos contaminados en cultivos seguros</motion.h2>
            <p className="mt-4 text-slate-700 text-lg">Myco-grow utiliza hongos micorrícicos arbusculares nativos para reducir la acumulación de metales pesados y mejorar la salud del suelo.</p>

            <div className="mt-6 flex gap-4">
              <motion.button whileHover={{ scale: 1.03 }} className="px-6 py-3 bg-emerald-600 text-white font-medium rounded-xl shadow-lg" onClick={() => setActiveTab("how")}>Ver cómo funciona</motion.button>
              <motion.button whileHover={{ scale: 1.03 }} className="px-6 py-3 border border-emerald-700 text-emerald-700 font-medium rounded-xl bg-white shadow" onClick={() => setShowTeam(true)}>Conocer al equipo</motion.button>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-2xl shadow-2xl overflow-hidden h-80 w-full">
              <img src="/images/producto.jpg" alt="producto" className="w-full h-auto object-cover mx-auto" />
            </div>
          </div>
        </section>

        <section className="mt-20 bg-white rounded-2xl p-10 shadow-xl border border-emerald-100">
          <div className="flex gap-6 border-b pb-4 text-sm overflow-x-auto">
            <button onClick={() => setActiveTab("overview")} className={`${activeTab === 'overview' ? 'bg-emerald-100 text-emerald-900' : ''} px-4 py-2 rounded-md`}>Overview</button>
            <button onClick={() => setActiveTab("how")} className={`${activeTab === 'how' ? 'bg-emerald-100 text-emerald-900' : ''} px-4 py-2 rounded-md`}>Tecnología</button>
            <button onClick={() => setActiveTab("impact")} className={`${activeTab === 'impact' ? 'bg-emerald-100 text-emerald-900' : ''} px-4 py-2 rounded-md`}>Impactos</button>
            <button onClick={() => setActiveTab("simulator")} className={`${activeTab === 'simulator' ? 'bg-emerald-100 text-emerald-900' : ''} px-4 py-2 rounded-md`}>Simulador</button>
          </div>


          {activeTab === "overview" && (
            <div className="mt-8 grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold text-emerald-900">¿Qué es Myco-grow?</h3>
                <p className="mt-3 text-slate-600 leading-relaxed">Myco-grow es un bioinóculo creado para los suelos chilenos. Utiliza micorrizas nativas para proteger los cultivos y mejorar su rendimiento.</p>
                <ul className="list-disc list-inside mt-4 text-slate-700 space-y-1">
                  <li>Reduce la translocación de metales pesados</li>
                  <li>Mejora absorción de nutrientes esenciales</li>
                  <li>Aumenta resistencia al estrés</li>
                  <li>Favorece suelos más saludables</li>
                </ul>
              </div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="bg-gradient-to-br from-emerald-50 to-lime-50 rounded-xl p-6 shadow-lg">
                <h4 className="font-semibold text-emerald-900">Datos clave</h4>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white rounded-xl shadow text-center">
                    <div className="text-3xl font-bold text-emerald-800">27%</div>
                    <p className="text-xs text-slate-500">de suelos contaminados</p>
                  </div>
                  <div className="p-4 bg-white rounded-xl shadow text-center">
                    <div className="text-3xl font-bold text-emerald-800">3</div>
                    <p className="text-xs text-slate-500">metales críticos</p>
                  </div>
                </div>
              </motion.div>
            </div>
          )}

          {activeTab === "how" && (
            <div className="mt-8 grid md:grid-cols-3 gap-10">
              <div className="p-6 bg-emerald-50 rounded-xl shadow-lg">
                <h4 className="font-semibold flex items-center gap-2 text-emerald-900"><ShieldCheck size={20}/> Inmovilización</h4>
                <p className="mt-2 text-sm text-slate-700">Las hifas retienen metales impidiendo que lleguen al fruto.</p>
              </div>
              <div className="p-6 bg-emerald-50 rounded-xl shadow-lg">
                <h4 className="font-semibold flex items-center gap-2 text-emerald-900"><Leaf size={20}/> Nutrición mejorada</h4>
                <p className="mt-2 text-sm text-slate-700">Mayor absorción de fósforo, nitrógeno y micronutrientes.</p>
              </div>
              <div className="p-6 bg-emerald-50 rounded-xl shadow-lg">
                <h4 className="font-semibold flex items-center gap-2 text-emerald-900"><Sun size={20}/> Resiliencia</h4>
                <p className="mt-2 text-sm text-slate-700">Mejora tolerancia al estrés hídrico, lumínico y salino.</p>
              </div>
            </div>
          )}

          {activeTab === "impact" && (
            <div className="mt-8 grid md:grid-cols-3 gap-10">
              <div className="p-6 bg-emerald-50 rounded-xl shadow-md">
                <h4 className="font-semibold text-emerald-900">Eficiencia agrícola</h4>
                <p className="mt-3 text-sm text-slate-700">Reduce costos en fertilizantes y mejora rendimientos.</p>
              </div>
              <div className="p-6 bg-amber-50 rounded-xl shadow-md">
                <h4 className="font-semibold text-emerald-900">Seguridad alimentaria</h4>
                <p className="mt-3 text-sm text-slate-700">Evita la llegada de metales al fruto, protegiendo la salud.</p>
              </div>
              <div className="p-6 bg-sky-50 rounded-xl shadow-md">
                <h4 className="font-semibold text-emerald-900">Regeneración ambiental</h4>
                <p className="mt-3 text-sm text-slate-700">Mejora la biodiversidad y estructura del suelo.</p>
              </div>
            </div>
          )}

          {activeTab === "simulator" && (
            <div className="mt-6">
              <h4 className="text-xl font-bold text-emerald-900">Simulador de riesgo por niveles de metales</h4>
              <p className="text-sm text-slate-600 mt-1">Ajusta el nivel y observa el riesgo estimado de rechazo de cosecha.</p>

              <div className="mt-4 grid md:grid-cols-2 gap-6 items-center">
                <div>
                  <div className="text-xs text-slate-500">Nivel estimado de metales en suelo</div>
                  <input type="range" min="0" max="100" value={metalLevel} onChange={(e) => setMetalLevel(Number(e.target.value))} className="w-full mt-2" />

                  <div className="mt-3 flex items-center gap-4">
                    <div className={`font-semibold ${risk.color}`}>{risk.label}</div>
                    <div className="text-sm text-slate-500">Prob. rechazo:</div>
                    <div className="text-sm font-semibold">{risk.pct}%</div>
                  </div>

                  <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className={`h-3 rounded-full ${risk.color.replace('text-','bg-')}`} style={{ width: `${risk.pct}%` }}></div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-emerald-50 rounded-xl shadow-md">
                  <h5 className="font-semibold text-emerald-900">Historia: El agricultor</h5>
                  <p className="text-sm text-slate-700 mt-2">Entrega su cosecha, análisis confirma presencia de metales y la carga es rechazada.</p>
                </div>
              </div>
            </div>
          )}
        </section>
<section className="mt-16 mb-10">
          <h2 className="text-3xl font-bold text-emerald-900 text-center mb-12">Nuestros Productos</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Producto 1 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-emerald-100 hover:shadow-xl transition-shadow duration-300">
              <div className="p-6">
                <div className="w-full h-61 bg-emerald-50 rounded-lg flex items-center justify-center overflow-hidden">
                  <img 
                    src="/images/producto1.png" 
                    alt="Producto 1" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="mt-4">
                  <h4 className="font-semibold text-lg text-emerald-900">Paquete Básico</h4>
                  <p className="text-sm text-slate-600 mt-2">Contenido: 30 gramos</p>
                  <p className="text-xs text-slate-500 mt-1">Ideal para huertos pequeños</p>
                  <button className="mt-4 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-4 rounded-lg transition duration-300">
                    Agregar al carro
                  </button>
                </div>
              </div>
            </div>

            {/* Producto 2 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-emerald-100 hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
              <div className="p-6">
                <div className="w-full h-61 bg-emerald-50 rounded-lg flex items-center justify-center overflow-hidden">
                  <img 
                    src="/images/producto2.png" 
                    alt="Producto 2" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="mt-4">
                  <h4 className="font-semibold text-lg text-emerald-900">Paquete Estándar</h4>
                  <p className="text-sm text-slate-600 mt-2">Contenido: 500 gramos</p>
                  <p className="text-xs text-slate-500 mt-1">Perfecto para cultivos medianos</p>
                  <button className="mt-4 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-4 rounded-lg transition duration-300">
                    Agregar al carro
                  </button>
                </div>
              </div>
            </div>

            {/* Producto 3 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-emerald-100 hover:shadow-xl transition-shadow duration-300">
              <div className="p-6">
                <div className="w-full h-61 bg-emerald-50 rounded-lg flex items-center justify-center overflow-hidden">
                  <img 
                    src="/images/producto3.png" 
                    alt="Producto 3" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="mt-4">
                  <h4 className="font-semibold text-lg text-emerald-900">Paquete Premium</h4>
                  <p className="text-sm text-slate-600 mt-2">Contenido: 1 kilogramo</p>
                  <p className="text-xs text-slate-500 mt-1">Para grandes extensiones agrícolas</p>
                  <button className="mt-4 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-4 rounded-lg transition duration-300">
                    Agregar al carro
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-10 text-center">
            <p className="text-slate-600 text-sm">Todos nuestros productos incluyen instrucciones detalladas de aplicación</p>
          </div>
        </section>
        <section className="max-w-7xl mx-auto px-6 mt-16">
          <h2 className="text-2xl font-bold text-emerald-900 text-center">Beneficios más detallados</h2>
          <div className="mt-8 grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-xl shadow">
              <h3 className="font-semibold text-emerald-900">Aumento del rendimiento</h3>
              <p className="text-sm mt-2 text-slate-700">Mayor biomasa, mayor producción y cultivos más vigorosos.</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow">
              <h3 className="font-semibold text-emerald-900">Reducción de fertilizantes</h3>
              <p className="text-sm mt-2 text-slate-700">Las raíces optimizan la captación de nutrientes.</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow">
              <h3 className="font-semibold text-emerald-900">Mejora integral del suelo</h3>
              <p className="text-sm mt-2 text-slate-700">Más biodiversidad microbiana y mejor estructura.</p>
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 mt-20">
          <h2 className="text-2xl font-bold text-emerald-900 text-center">Ciclo de uso del producto</h2>
          <div className="mt-10 grid md:grid-cols-4 gap-8 text-center">
            <div className="p-4 bg-emerald-50 rounded-xl shadow">
              <h4 className="font-semibold">1. Preparación</h4>
              <p className="text-sm">Aplicación en vivero o suelo previo a siembra.</p>
            </div>
            <div className="p-4 bg-emerald-50 rounded-xl shadow">
              <h4 className="font-semibold">2. Colonización</h4>
              <p className="text-sm">Las micorrizas forman redes de hifas.</p>
            </div>
            <div className="p-4 bg-emerald-50 rounded-xl shadow">
              <h4 className="font-semibold">3. Protección</h4>
              <p className="text-sm">Inmovilización de metales y mayor nutrición.</p>
            </div>
            <div className="p-4 bg-emerald-50 rounded-xl shadow">
              <h4 className="font-semibold">4. Cosecha segura</h4>
              <p className="text-sm">Frutos con menor carga de metales pesados.</p>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 mt-20">
          <h2 className="text-2xl font-bold text-emerald-900 text-center">Validación científica</h2>
          <div className="mt-8 grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-xl shadow flex items-start gap-3">
              <FlaskConical size={24} className="text-emerald-700"/>
              <p className="text-sm text-slate-700">Ensayos demuestran reducción significativa de Cd, As y Pb en frutos.</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow flex items-start gap-3">
              <CheckCircle2 size={24} className="text-emerald-700"/>
              <p className="text-sm text-slate-700">Micorrizas nativas validan eficacia en suelos chilenos.</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow flex items-start gap-3">
              <AlertTriangle size={24} className="text-emerald-700"/>
              <p className="text-sm text-slate-700">El uso reduce riesgos de rechazo en cosechas.</p>
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 mt-20">
          <h2 className="text-2xl font-bold text-emerald-900 text-center">Comparativa: Antes vs. Después de Myco-grow</h2>

          <div className="mt-10 grid md:grid-cols-2 gap-10">
            <div className="p-6 bg-red-50 rounded-xl shadow">
              <h3 className="font-semibold text-red-700">Antes</h3>
              <ul className="mt-3 text-sm text-red-800 list-disc list-inside">
                <li>Alta acumulación de metales pesados</li>
                <li>Riesgo de rechazo en exportación</li>
                <li>Menor rendimiento y mayor estrés</li>
              </ul>
            </div>
            <div className="p-6 bg-emerald-50 rounded-xl shadow">
              <h3 className="font-semibold text-emerald-700">Después</h3>
              <ul className="mt-3 text-sm text-emerald-800 list-disc list-inside">
                <li>Disminución de metales en frutos</li>
                <li>Cultivos más sanos y nutritivos</li>
                <li>Mayor productividad y resiliencia</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-6 mt-20 mb-32">
          <h2 className="text-2xl font-bold text-emerald-900 text-center">Preguntas frecuentes</h2>

          <div className="mt-8 space-y-6">
            <div className="p-5 bg-white rounded-xl shadow">
              <h4 className="font-semibold text-emerald-900">¿Es compatible con fertilizantes?</h4>
              <p className="mt-2 text-sm text-slate-700">Sí, pero reduce la necesidad de usarlos en exceso.</p>
            </div>
            <div className="p-5 bg-white rounded-xl shadow">
              <h4 className="font-semibold text-emerald-900">¿Funciona en todos los cultivos?</h4>
              <p className="mt-2 text-sm text-slate-700">Depende del cultivo a tratar , ya que el producto es diseñado especificamente para la planta que tiene el consumidor.</p>
            </div>
            <div className="p-5 bg-white rounded-xl shadow">
              <h4 className="font-semibold text-emerald-900">¿Requiere aplicaciones frecuentes?</h4>
              <p className="mt-2 text-sm text-slate-700">No. Una aplicación inicial suele ser suficiente.</p>
            </div>
          </div>
        </section>

        {showTeam && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-2xl shadow-xl max-w-lg w-full relative">
              <button onClick={() => setShowTeam(false)} className="absolute top-3 right-3 text-slate-500 hover:text-slate-700"><X size={20}/></button>
              <h3 className="text-xl font-bold text-emerald-900 text-center">Equipo Myco-grow</h3>
              <p className="text-sm text-slate-600 text-center mt-2">Aylin • Jorge • Noelia • Florencia • Emilia</p>
            </div>
          </div>
        )}
{showTeam && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            {/* ... contenido del modal ... */}
          </div>
        )}
      </main>
<footer className="mt-32 py-8 bg-emerald-900 text-white rounded-2xl shadow-xl">
          <div className="max-w-4xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h3 className="text-xl font-bold text-emerald-100">Myco-grow</h3>
                <p className="mt-2 text-emerald-200 text-sm">Bioinóculo micorrícico</p>
                <p className="mt-4 flex items-center gap-2 text-emerald-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href="mailto:mycogrow@gmail.com" className="hover:text-white transition">mycogrow@gmail.com</a>
                </p>
              </div>
              
              <div className="flex flex-col items-center md:items-end">
                <h4 className="font-semibold text-emerald-100 mb-4">Síguenos en redes</h4>
                <div className="flex gap-6">
                  <a href="https://instagram.com/mycogrow" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                    <div className="bg-emerald-800 p-3 rounded-full hover:bg-emerald-700">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-xs text-center mt-2 text-emerald-200">@mycogrow</p>
                  </a>
                  
                  <a href="https://twitter.com/mycogrowofficial" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                    <div className="bg-emerald-800 p-3 rounded-full hover:bg-emerald-700">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </div>
                    <p className="text-xs text-center mt-2 text-emerald-200">@mycogrowofficial</p>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-emerald-700 text-center">
              <p className="text-sm text-emerald-300">© {new Date().getFullYear()} Myco-grow. Todos los derechos reservados.</p>
              <p className="text-xs text-emerald-400 mt-2">Desarrollado para una agricultura más segura y sostenible</p>
            </div>
          </div>
        </footer>
    </div>
  );
}
