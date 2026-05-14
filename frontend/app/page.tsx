'use client';
import { useState } from 'react';
import { ShoppingCart, Search, Phone, MapPin, Star, ChevronRight, Menu, X, Truck, Shield, RefreshCw, Headphones, ChevronDown } from 'lucide-react';

const CATEGORIES = [
  { name: 'Двигатель', icon: '🔧', count: 12400 },
  { name: 'Тормозная система', icon: '🛑', count: 8200 },
  { name: 'Подвеска', icon: '⚙️', count: 9700 },
  { name: 'Кузов и оптика', icon: '💡', count: 6300 },
  { name: 'Электрика', icon: '⚡', count: 5100 },
  { name: 'Фильтры и масла', icon: '🛢️', count: 4800 },
  { name: 'Шины и диски', icon: '🔵', count: 3200 },
  { name: 'Аксессуары', icon: '🎁', count: 2900 },
];

const PRODUCTS = [
  { id: 1, name: 'Тормозные колодки Brembo P85 020', brand: 'Brembo', price: 18500, oldPrice: 22000, rating: 4.9, reviews: 234, badge: 'Хит', sku: 'BRE-P85020' },
  { id: 2, name: 'Масляный фильтр Mann W 712/75', brand: 'Mann-Filter', price: 3200, oldPrice: null, rating: 4.8, reviews: 891, badge: null, sku: 'MAN-W71275' },
  { id: 3, name: 'Амортизатор Monroe G8143', brand: 'Monroe', price: 24900, oldPrice: 28500, rating: 4.7, reviews: 156, badge: 'Скидка', sku: 'MON-G8143' },
  { id: 4, name: 'Свечи зажигания NGK BKR6E (4 шт)', brand: 'NGK', price: 6800, oldPrice: null, rating: 5.0, reviews: 412, badge: 'Топ', sku: 'NGK-BKR6E' },
  { id: 5, name: 'Ремень ГРМ Gates K015589XS', brand: 'Gates', price: 12300, oldPrice: 14800, rating: 4.8, reviews: 203, badge: null, sku: 'GAT-K015589' },
  { id: 6, name: 'Воздушный фильтр Knecht LX 1578', brand: 'Knecht', price: 4100, oldPrice: null, rating: 4.6, reviews: 334, badge: null, sku: 'KNE-LX1578' },
];

const REVIEWS = [
  { name: 'Артём К.', car: 'Toyota Camry 2019', text: 'Заказал тормозные колодки Brembo — пришли за сутки, оригинал, всё совпало. Буду заказывать ещё.', rating: 5, date: '12 мая 2026' },
  { name: 'Диас М.', car: 'Hyundai Tucson 2021', text: 'Давно ищу надёжный магазин запчастей в Алматы. Менеджер помог подобрать по VIN коду, цена ниже чем на рынке Барахолки.', rating: 5, date: '8 мая 2026' },
  { name: 'Светлана Р.', car: 'Kia Sportage 2020', text: 'Удобный сайт, быстрый поиск по марке авто. Заказала фильтры — упаковка целая, всё оригинальное.', rating: 5, date: '3 мая 2026' },
];

export default function AutoPartsPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount] = useState(2);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCar, setActiveCar] = useState('Toyota');

  return (
    <div className="min-h-screen font-sans">
      {/* TOP BAR */}
      <div className="bg-[#1a1a2e] text-white text-xs py-2">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <span>🚗 Бесплатная доставка от 15 000 ₸ по Алматы</span>
          <div className="hidden md:flex gap-6">
            <span>📞 +7 (727) 123-45-67</span>
            <span>⏰ Пн–Сб 9:00–20:00</span>
          </div>
        </div>
      </div>

      {/* HEADER */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-4">
            <a href="/" className="flex items-center gap-2 flex-shrink-0">
              <div className="w-9 h-9 bg-[#e63946] rounded-lg flex items-center justify-center">
                <span className="text-white font-black text-sm">AP</span>
              </div>
              <div>
                <div className="font-black text-[#1a1a2e] text-lg leading-none">AutoParts</div>
                <div className="text-[#e63946] text-[10px] font-bold tracking-widest">PRO</div>
              </div>
            </a>

            <div className="flex-1 hidden md:flex items-center bg-[#f4f4f8] rounded-xl overflow-hidden border border-transparent focus-within:border-[#e63946]">
              <select className="bg-transparent text-sm text-gray-500 pl-3 pr-1 py-2.5 border-r border-gray-200 outline-none">
                <option>Все</option>
                <option>Двигатель</option>
                <option>Тормоза</option>
                <option>Подвеска</option>
              </select>
              <input
                type="text"
                placeholder="Поиск по названию, артикулу, марке авто..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent px-3 py-2.5 text-sm outline-none"
              />
              <button className="bg-[#e63946] text-white px-4 py-2.5 flex items-center gap-1.5 text-sm font-medium hover:bg-[#c1121f] transition-colors">
                <Search size={15} /> Найти
              </button>
            </div>

            <div className="ml-auto md:ml-0 flex items-center gap-3">
              <a href="/catalog" className="hidden md:flex items-center gap-1.5 text-sm text-gray-600 hover:text-[#e63946] transition-colors">
                <Phone size={15} /> +7 727 123-45-67
              </a>
              <button className="relative p-2 text-gray-700 hover:text-[#e63946] transition-colors">
                <ShoppingCart size={20} />
                <span className="absolute -top-1 -right-1 bg-[#e63946] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{cartCount}</span>
              </button>
              <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* NAV */}
          <nav className="hidden md:flex items-center gap-6 mt-2 text-sm border-t pt-2">
            {['Каталог', 'Бренды', 'Подбор по VIN', 'Доставка и оплата', 'О нас', 'Контакты'].map(item => (
              <a key={item} href="#" className="text-gray-600 hover:text-[#e63946] transition-colors font-medium">{item}</a>
            ))}
            <span className="ml-auto flex items-center gap-1 text-[#e63946] font-semibold text-xs bg-red-50 px-3 py-1 rounded-full">
              🔥 Скидки до 30%
            </span>
          </nav>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-white border-t px-4 pb-4">
            {['Каталог', 'Бренды', 'Подбор по VIN', 'Доставка', 'О нас', 'Контакты'].map(item => (
              <a key={item} href="#" className="block py-2.5 text-gray-700 border-b border-gray-100 text-sm">{item}</a>
            ))}
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#e63946]/20 border border-[#e63946]/30 text-[#ff6b6b] text-xs font-bold px-3 py-1.5 rounded-full mb-6">
              🔥 НОВОЕ ПОСТУПЛЕНИЕ 2026
            </div>
            <h1 className="text-4xl lg:text-5xl font-black mb-4 leading-tight">
              Премиальные детали<br />
              <span className="text-[#e63946]">для вашего авто</span>
            </h1>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Более 50 000 наименований. Оригинал и аналоги от ведущих производителей. Доставка по всему Казахстану за 1–3 дня.
            </p>

            {/* CAR SELECTOR */}
            <div className="bg-white/10 backdrop-blur rounded-2xl p-4 mb-8">
              <p className="text-xs text-gray-400 mb-3 uppercase tracking-wider">Подбор по марке авто</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {['Toyota', 'BMW', 'Hyundai', 'Kia', 'Mercedes', 'Volkswagen'].map(brand => (
                  <button
                    key={brand}
                    onClick={() => setActiveCar(brand)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${activeCar === brand ? 'bg-[#e63946] text-white' : 'bg-white/10 text-gray-300 hover:bg-white/20'}`}
                  >
                    {brand}
                  </button>
                ))}
              </div>
              <button className="w-full bg-[#e63946] hover:bg-[#c1121f] text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
                <Search size={16} /> Найти запчасти для {activeCar}
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
              {[['50k+', 'Товаров в базе'], ['24ч', 'Ср. доставка'], ['100%', 'Гарантия оригинала']].map(([v, l]) => (
                <div key={l}>
                  <div className="text-2xl font-black text-white">{v}</div>
                  <div className="text-gray-400 text-xs">{l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden md:block">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 space-y-3">
              <div className="text-sm text-gray-400 mb-4">📦 Последние заказы</div>
              {[
                { user: 'А. Кузнецов', item: 'Тормозные колодки Brembo', time: '2 мин назад', status: 'Доставлен' },
                { user: 'Д. Мухамедов', item: 'Фильтр масляный Mann', time: '15 мин назад', status: 'В пути' },
                { user: 'С. Петрова', item: 'Амортизатор Monroe G8143', time: '1 час назад', status: 'Доставлен' },
                { user: 'Р. Алиев', item: 'Свечи NGK BKR6E', time: '2 часа назад', status: 'Доставлен' },
              ].map((o, i) => (
                <div key={i} className="flex items-center gap-3 bg-white/5 rounded-xl p-3">
                  <div className="w-8 h-8 bg-[#e63946]/20 rounded-lg flex items-center justify-center text-[#e63946] font-bold text-xs">
                    {o.user[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-white text-xs font-medium truncate">{o.item}</div>
                    <div className="text-gray-500 text-xs">{o.user} · {o.time}</div>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${o.status === 'Доставлен' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                    {o.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ADVANTAGES */}
      <section className="bg-[#e63946] text-white py-6">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: <Truck size={20} />, title: 'Быстрая доставка', sub: 'По Алматы за 24 часа' },
            { icon: <Shield size={20} />, title: 'Гарантия оригинала', sub: 'Сертифицированные поставщики' },
            { icon: <RefreshCw size={20} />, title: 'Возврат 30 дней', sub: 'Без лишних вопросов' },
            { icon: <Headphones size={20} />, title: 'Поддержка 24/7', sub: 'Онлайн и по телефону' },
          ].map((a, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="bg-white/20 p-2.5 rounded-xl">{a.icon}</div>
              <div>
                <div className="font-bold text-sm">{a.title}</div>
                <div className="text-red-100 text-xs">{a.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-14 bg-[#f8f9fc]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-8">
            <div>
              <p className="text-[#e63946] text-xs font-bold uppercase tracking-widest mb-1">Каталог</p>
              <h2 className="text-2xl font-black text-[#1a1a2e]">Популярные категории</h2>
            </div>
            <a href="/catalog" className="text-[#e63946] text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all">
              Все категории <ChevronRight size={16} />
            </a>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {CATEGORIES.map(cat => (
              <a key={cat.name} href="#" className="bg-white rounded-2xl p-4 text-center hover:shadow-md hover:border-[#e63946] border border-transparent transition-all group cursor-pointer">
                <div className="text-3xl mb-2">{cat.icon}</div>
                <div className="text-xs font-semibold text-gray-800 group-hover:text-[#e63946] transition-colors leading-tight">{cat.name}</div>
                <div className="text-[10px] text-gray-400 mt-1">{cat.count.toLocaleString()} шт.</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-8">
            <div>
              <p className="text-[#e63946] text-xs font-bold uppercase tracking-widest mb-1">Лучшие предложения</p>
              <h2 className="text-2xl font-black text-[#1a1a2e]">Хиты продаж</h2>
            </div>
            <a href="/catalog" className="text-[#e63946] text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all">
              Весь каталог <ChevronRight size={16} />
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PRODUCTS.map(p => (
              <div key={p.id} className="border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg transition-all group">
                <div className="bg-[#f8f9fc] h-44 flex items-center justify-center relative">
                  <div className="text-6xl">🔩</div>
                  {p.badge && (
                    <span className={`absolute top-3 left-3 text-white text-xs font-bold px-2.5 py-1 rounded-full ${p.badge === 'Хит' ? 'bg-[#e63946]' : p.badge === 'Топ' ? 'bg-[#1a1a2e]' : 'bg-orange-500'}`}>
                      {p.badge}
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <div className="text-xs text-gray-400 mb-1">{p.brand} · {p.sku}</div>
                  <h3 className="font-semibold text-gray-900 text-sm mb-2 group-hover:text-[#e63946] transition-colors">{p.name}</h3>
                  <div className="flex items-center gap-1 mb-3">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={11} className={i < Math.floor(p.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200'} />
                      ))}
                    </div>
                    <span className="text-xs text-gray-400">{p.rating} ({p.reviews})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xl font-black text-[#1a1a2e]">{p.price.toLocaleString()} ₸</span>
                      {p.oldPrice && <span className="text-xs text-gray-400 line-through ml-2">{p.oldPrice.toLocaleString()} ₸</span>}
                    </div>
                    <button className="bg-[#e63946] hover:bg-[#c1121f] text-white p-2 rounded-xl transition-colors">
                      <ShoppingCart size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BRANDS */}
      <section className="py-10 bg-[#f8f9fc] border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-xs text-gray-400 uppercase tracking-widest mb-6">Официальные поставщики</p>
          <div className="flex flex-wrap justify-center gap-6 items-center">
            {['Brembo', 'Bosch', 'Mann-Filter', 'Monroe', 'NGK', 'Gates', 'Knecht', 'Sachs', 'Denso', 'Valeo'].map(b => (
              <div key={b} className="bg-white border border-gray-200 rounded-xl px-5 py-3 text-gray-600 font-bold text-sm hover:border-[#e63946] hover:text-[#e63946] transition-all cursor-pointer">
                {b}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-[#e63946] text-xs font-bold uppercase tracking-widest mb-2">Отзывы клиентов</p>
            <h2 className="text-2xl font-black text-[#1a1a2e]">Нам доверяют тысячи автовладельцев</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {REVIEWS.map((r, i) => (
              <div key={i} className="bg-[#f8f9fc] rounded-2xl p-6">
                <div className="flex mb-3">
                  {[...Array(r.rating)].map((_, i) => <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />)}
                </div>
                <p className="text-gray-700 text-sm mb-4 leading-relaxed">"{r.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-[#e63946] rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {r.name[0]}
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-gray-900">{r.name}</div>
                    <div className="text-xs text-gray-400">{r.car} · {r.date}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-gradient-to-r from-[#1a1a2e] to-[#e63946] text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black mb-4">Не нашли нужную запчасть?</h2>
          <p className="text-red-100 mb-8">Оставьте заявку — наш менеджер подберёт деталь по VIN-коду вашего автомобиля в течение 30 минут.</p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input type="tel" placeholder="+7 (___) ___-__-__" className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-red-200 outline-none focus:border-white text-sm" />
            <button className="bg-white text-[#e63946] font-bold px-6 py-3 rounded-xl hover:bg-red-50 transition-colors text-sm">
              Получить консультацию
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#1a1a2e] text-gray-400 py-10">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#e63946] rounded-lg flex items-center justify-center">
                <span className="text-white font-black text-xs">AP</span>
              </div>
              <span className="text-white font-black">AutoParts Pro</span>
            </div>
            <p className="text-xs leading-relaxed">Ваш надёжный поставщик автозапчастей в Казахстане с 2018 года.</p>
          </div>
          {[
            { title: 'Каталог', links: ['Двигатель', 'Тормоза', 'Подвеска', 'Электрика', 'Кузов'] },
            { title: 'Компания', links: ['О нас', 'Доставка', 'Гарантия', 'Возврат', 'Контакты'] },
            { title: 'Контакты', links: ['+7 (727) 123-45-67', 'info@autoparts.kz', 'г. Алматы, ул. Сейфуллина 452', 'Пн–Сб: 9:00–20:00'] },
          ].map(col => (
            <div key={col.title}>
              <h4 className="text-white font-semibold text-sm mb-3">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map(l => <li key={l} className="text-xs hover:text-white cursor-pointer transition-colors">{l}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-white/10 pt-6 text-center text-xs">
          © 2026 AutoParts Pro. Все права защищены. · <span className="hover:text-white cursor-pointer">Политика конфиденциальности</span>
        </div>
      </footer>
    </div>
  );
}
