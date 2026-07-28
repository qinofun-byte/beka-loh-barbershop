"use client";

import { FormEvent, useMemo, useState } from "react";

const masters = [
  { id: "beka", name: "Бека", role: "Founder / Top barber", initials: "БЛ", color: "amber", note: "Стрижки с характером" },
  { id: "arsen", name: "Арсен", role: "Senior barber", initials: "А", color: "violet", note: "Точный фейд и борода" },
  { id: "tim", name: "Тимур", role: "Style director", initials: "Т", color: "blue", note: "Современная классика" },
];

const services = [
  { id: "cut", name: "Мужская стрижка", duration: "60 мин", price: "12 000 ₸" },
  { id: "beard", name: "Стрижка + борода", duration: "90 мин", price: "17 000 ₸" },
  { id: "royal", name: "Royal ritual", duration: "120 мин", price: "25 000 ₸" },
];

const slots = ["10:00", "11:30", "13:00", "14:30", "16:00", "17:30", "19:00"];
const dateOptions = [
  { weekday: "ПН", day: "28" },
  { weekday: "ВТ", day: "29" },
  { weekday: "СР", day: "30" },
  { weekday: "ЧТ", day: "31" },
  { weekday: "ПТ", day: "01" },
];

export default function Home() {
  const [masterId, setMasterId] = useState("beka");
  const [serviceId, setServiceId] = useState("cut");
  const [dateIndex, setDateIndex] = useState(1);
  const [time, setTime] = useState("16:00");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const master = useMemo(() => masters.find((item) => item.id === masterId)!, [masterId]);
  const service = useMemo(() => services.find((item) => item.id === serviceId)!, [serviceId]);
  const date = dateOptions[dateIndex];

  async function book(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email, master: master.name, service: service.name, date: `${date.weekday}, ${date.day}`, time }),
      });
      if (!response.ok) throw new Error("Booking failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <main>
      <section className="hero" id="top">
        <nav className="nav container">
          <a className="brand" href="#top"><span>БЕКА</span><i>ЛОХ</i></a>
          <div className="nav-links"><a href="#masters">Мастера</a><a href="#booking">Запись</a></div>
          <a className="nav-action" href="#booking">Забронировать <span>↗</span></a>
        </nav>

        <div className="hero-grid container">
          <div className="hero-copy">
            <p className="eyebrow">BARBERSHOP · ALMATY</p>
            <h1>Твой стиль.<br /><em>Наше ремесло.</em></h1>
            <p className="hero-description">Место, где время замедляется, а каждая линия становится точнее. Стрижём уверенно. Живём красиво.</p>
            <a className="primary-button" href="#booking">Выбрать время <span>↓</span></a>
            <div className="hero-note"><b>4.9</b><span>★ ★ ★ ★ ★</span><small>183 отзыва</small></div>
          </div>
          <div className="hero-art" aria-label="Премиальная атмосфера барбершопа">
            <div className="art-glow" />
            <div className="art-chair"><div className="chair-back" /><div className="chair-seat" /><div className="chair-base" /></div>
            <div className="art-copy"><span>EST.</span><strong>2024</strong><span>ALMATY</span></div>
            <p className="art-caption">Тихая роскошь<br />и чистая форма.</p>
          </div>
        </div>
        <div className="scroll-mark">ЛИСТАЙ <span>↓</span></div>
      </section>

      <section className="masters-section" id="masters">
        <div className="section-heading container"><p className="eyebrow">01 / КОМАНДА</p><h2>Мастера, которым<br /><em>доверяют лицо.</em></h2></div>
        <div className="master-list container">
          {masters.map((item, index) => (
            <button className={`master-card ${masterId === item.id ? "selected" : ""}`} onClick={() => setMasterId(item.id)} key={item.id}>
              <span className="card-number">0{index + 1}</span>
              <span className={`master-portrait ${item.color}`}>{item.initials}</span>
              <span className="master-info"><b>{item.name}</b><small>{item.role}</small><i>{item.note}</i></span>
              <span className="select-mark">{masterId === item.id ? "ВЫБРАН" : "ВЫБРАТЬ"}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="booking-section" id="booking">
        <div className="booking-wrap container">
          <div className="booking-intro"><p className="eyebrow">02 / ОНЛАЙН-ЗАПИСЬ</p><h2>Оставь время<br /><em>для себя.</em></h2><p>Выбери услугу, мастера и удобный слот. Подтверждение моментально придёт на почту салона.</p><div className="booking-selected"><span className={`mini-avatar ${master.color}`}>{master.initials}</span><span><small>ВАШ МАСТЕР</small><b>{master.name}</b></span></div></div>
          <form className="booking-card" onSubmit={book}>
            <div className="form-step"><span>01</span><div><label>Услуга</label><div className="service-options">{services.map((item) => <button type="button" className={serviceId === item.id ? "active" : ""} onClick={() => setServiceId(item.id)} key={item.id}><b>{item.name}</b><small>{item.duration} · {item.price}</small></button>)}</div></div></div>
            <div className="form-step"><span>02</span><div><label>Дата</label><div className="date-options">{dateOptions.map((item, index) => <button type="button" onClick={() => setDateIndex(index)} className={dateIndex === index ? "active" : ""} key={item.day}><small>{item.weekday}</small><b>{item.day}</b></button>)}</div></div></div>
            <div className="form-step"><span>03</span><div><label>Время</label><div className="time-options">{slots.map((slot) => <button type="button" onClick={() => setTime(slot)} className={time === slot ? "active" : ""} key={slot}>{slot}</button>)}</div></div></div>
            <div className="form-step personal"><span>04</span><div><label>Контакты</label><div className="inputs"><input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Ваше имя" /><input required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Телефон" type="tel" /><input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail (необязательно)" type="email" /></div></div></div>
            <div className="summary"><div><small>ВАША ЗАПИСЬ</small><b>{master.name} · {date.weekday} {date.day} · {time}</b></div><button type="submit" disabled={status === "loading"}>{status === "loading" ? "ОТПРАВЛЯЕМ…" : "ЗАБРОНИРОВАТЬ →"}</button></div>
            {status === "success" && <p className="form-message success">Готово! Заявка отправлена на почту салона.</p>}
            {status === "error" && <p className="form-message error">Не удалось отправить. Попробуйте ещё раз или позвоните нам.</p>}
          </form>
        </div>
      </section>
      <footer><a className="brand" href="#top"><span>БЕКА</span><i>ЛОХ</i></a><p>ALMATY · 2026</p><a href="mailto:hello@bekaloh.kz">hello@bekaloh.kz</a></footer>
    </main>
  );
}
