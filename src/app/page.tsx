"use client";
import React, { useState, useEffect } from "react";
import { Clock, Menu, LogOut, AlertCircle, ChevronLeft, ChevronRight, CheckCircle, XCircle, BookOpen } from "lucide-react";

const BANK_SOAL = [
  {
    id: 1,
    teks: "Nilai perbandingan sudut dari (√2)/2 adalah...",
    opsi: [
      { label: "A", konten: "30 derajat" },
      { label: "B", konten: "45 derajat" },
      { label: "C", konten: "60 derajat" },
      { label: "D", konten: "0 derajat" },
      { label: "E", konten: "135 derajat" }
    ],
    kunci: "B",
    pembahasan: "Nilai (√2)/2 adalah nilai dari sin 45 derajat atau cos 45 derajat."
  },
  {
    id: 2,
    teks: "Diketahui kubus ABCD.EFGH dengan panjang rusuk 4 cm. Titik P adalah titik tengah CH. Jarak titik P ke titik B adalah...",
    opsi: [
      { label: "A", konten: "2√2 cm" },
      { label: "B", konten: "2√3 cm" },
      { label: "C", konten: "2√6 cm" },
      { label: "D", konten: "4√2 cm" },
      { label: "E", konten: "6 cm" }
    ],
    kunci: "C",
    pembahasan: "Menggunakan Pythagoras pada segitiga BCP: BP = akar(BC^2 + CP^2). Hasil akhirnya adalah 2√6."
  }
];

export default function CBT_PTS_PAS() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState(5400);
  const [jawaban, setJawaban] = useState({});
  const [ragu, setRagu] = useState({});
  const [isFinished, setIsFinished] = useState(false);

  const soalAktif = BANK_SOAL[currentIdx];
  const totalSoal = BANK_SOAL.length;

  useEffect(() => {
    if (!isFinished) {
      const timer = setInterval(() => setTimeLeft(prev => (prev > 0 ? prev - 1 : 0)), 1000);
      return () => clearInterval(timer);
    }
  }, [isFinished]);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  if (isFinished) {
    const totalBenar = Object.keys(jawaban).filter(id => {
      const s = BANK_SOAL.find(item => item.id === parseInt(id));
      return s && jawaban[id] === s.kunci;
    }).length;
    const skor = (totalBenar / totalSoal) * 100;

    return (
      <div className="min-h-screen bg-slate-100 p-6 flex flex-col items-center justify-center font-sans text-slate-900">
        <div className="bg-white p-8 rounded-3xl shadow-xl max-w-2xl w-full border border-slate-200">
          <h1 className="text-3xl font-black text-indigo-900 text-center uppercase tracking-tighter">Hasil Ujian</h1>
          <div className="text-center my-8">
            <span className="text-8xl font-black text-indigo-600 tracking-tighter">{skor.toFixed(0)}</span>
          </div>
          <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2">
            {BANK_SOAL.map((s) => (
              <div key={s.id} className="p-5 rounded-2xl border-2 bg-slate-50">
                <p className="font-bold text-lg text-slate-800 mb-3">Soal {s.id}: {jawaban[s.id] === s.kunci ? "✅ BENAR" : "❌ SALAH"}</p>
                <div className="text-sm bg-indigo-50 p-4 rounded-xl text-indigo-900 leading-relaxed font-medium">
                  <p className="font-black text-[10px] uppercase mb-1 opacity-50">Pembahasan:</p>
                  {s.pembahasan}
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => window.location.reload()} className="w-full mt-8 py-5 bg-indigo-600 text-white rounded-2xl font-black text-lg shadow-lg">COBA LAGI</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      <header className="bg-white border-b-2 p-5 flex justify-between items-center shadow-sm sticky top-0 z-20">
        <div className="flex gap-6 font-bold text-xs uppercase tracking-widest text-slate-400">
           <div>MAPEL: <span className="text-indigo-900">MATEMATIKA</span></div>
           <div className="border-l pl-6 border-slate-200">SISWA: <span className="text-slate-800 font-black">ALIF REZKY</span></div>
        </div>
        <div className="bg-indigo-900 text-white px-6 py-2 rounded-2xl font-mono text-2xl font-black shadow-lg">
          {formatTime(timeLeft)}
        </div>
      </header>

      <main className="flex-1 flex flex-col lg:flex-row p-6 gap-8 max-w-7xl mx-auto w-full">
        <div className="flex-1 bg-white rounded-[40px] shadow-sm border-2 border-slate-100 p-10 md:p-16">
          <h2 className="font-black text-indigo-900 text-xl mb-10 border-b-4 border-indigo-50 pb-4 inline-block italic uppercase tracking-tighter">SOAL NOMOR {soalAktif.id}</h2>
          <div className="text-2xl md:text-3xl mb-16 leading-relaxed text-slate-800 font-bold tracking-tight">
            {soalAktif.teks}
          </div>
          <div className="grid gap-5 max-w-3xl">
            {soalAktif.opsi.map((item) => {
              const isActive = jawaban[soalAktif.id] === item.label;
              const btnStyle = isActive ? "border-indigo-600 bg-indigo-50" : "border-slate-100 bg-slate-50 hover:border-indigo-200";
              const boxStyle = isActive ? "bg-indigo-600 text-white" : "bg-white text-slate-300 border-2 border-slate-100";
              return (
                <button key={item.label} onClick={() => setJawaban({...jawaban, [soalAktif.id]: item.label})} className={`flex items-center p-6 rounded-3xl border-4 transition-all group ${btnStyle}`}>
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl mr-6 transition-all ${boxStyle}`}>
                    {item.label}
                  </div>
                  <span className={`text-2xl font-black tracking-tight ${isActive ? "text-indigo-900" : "text-slate-700"}`}>
                    {item.konten}
                  </span>
                </button>
              );
            })}
          </div>
          <div className="mt-16 pt-10 border-t-2 border-slate-50 flex justify-between items-center">
            <button onClick={() => setCurrentIdx(Math.max(0, currentIdx - 1))} disabled={currentIdx === 0} className="p-5 bg-slate-100 rounded-3xl disabled:opacity-30 hover:bg-slate-200 transition-all">
              <ChevronLeft size={40} className="text-slate-600"/>
            </button>
            <button onClick={() => setRagu({...ragu, [soalAktif.id]: !ragu[soalAktif.id]})} className={`px-12 py-5 rounded-3xl font-black text-lg uppercase tracking-tighter transition-all ${ragu[soalAktif.id] ? "bg-yellow-400 text-white shadow-lg" : "bg-white border-4 border-yellow-400 text-yellow-500"}`}>
              RAGU
            </button>
            <button onClick={() => {if(currentIdx === totalSoal - 1) { if(confirm("Yakin ingin mengakhiri ujian?")) setIsFinished(true) } else { setCurrentIdx(currentIdx + 1) }}} className="px-16 py-5 bg-indigo-600 text-white rounded-[32px] font-black text-xl hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all">
              {currentIdx === totalSoal - 1 ? "SUBMIT" : "NEXT"}
            </button>
          </div>
        </div>

        <aside className="w-full lg:w-80 bg-white rounded-[40px] border-2 border-slate-100 p-8 h-fit shadow-sm">
           <h3 className="font-black text-slate-300 mb-8 text-sm uppercase text-center border-b pb-4 tracking-[0.2em]">Navigasi</h3>
           <div className="grid grid-cols-4 gap-4">
              {BANK_SOAL.map((s, index) => {
                const isRagu = ragu[s.id];
                const isDone = jawaban[s.id];
                const isCurrent = currentIdx === index;
                let c = "bg-white border-slate-50 text-slate-200";
                if (isDone) c = "bg-emerald-500 border-emerald-500 text-white font-black";
                if (isRagu) c = "bg-yellow-400 border-yellow-500 text-white font-black";
                if (isCurrent) c = "ring-[6px] ring-indigo-50 border-indigo-600 text-indigo-700 font-black scale-110 shadow-lg";
                return (
                  <button key={s.id} onClick={() => setCurrentIdx(index)} className={`h-14 rounded-2xl text-lg border-2 transition-all ${c}`}>
                    {s.id}
                  </button>
                );
              })}
           </div>
        </aside>
      </main>
    </div>
  );
}
