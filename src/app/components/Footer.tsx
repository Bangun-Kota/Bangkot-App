'use client'
import React, { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email submitted:", email);
    setEmail("");
  };

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Logo and CTA Section */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-accent-pink-500 rounded-lg mr-3 flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-sm transform rotate-45"></div>
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-4 leading-tight">
              Bangunkota – Kolaborasi Komunitas Bekasi
            </h2>
            <p className="text-gray-300 mb-4 max-w-md">
              Ruang bersama untuk berkarya, bersinergi, dan membangun kota yang inklusif & berkelanjutan.
            </p>
            <a
              href="#join"
              className="inline-block border border-purple-400 text-purple-300 px-6 py-2 rounded-full hover:bg-purple-900/30 transition-colors duration-300"
            >
              Gabung Komunitas
            </a>
          </div>

          {/* Explore Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Navigasi</h3>
            <ul className="space-y-3">
              <li><a href="#about" className="text-gray-300 hover:text-white transition-colors">Tentang Kami</a></li>
              <li><a href="#programs" className="text-gray-300 hover:text-white transition-colors">Program</a></li>
              <li><a href="#partners" className="text-gray-300 hover:text-white transition-colors">Mitra</a></li>
              <li><a href="#impact" className="text-gray-300 hover:text-white transition-colors">Dampak</a></li>
            </ul>
          </div>

          {/* Info Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Informasi</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Kebijakan Privasi</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Syarat & Ketentuan</a></li>
              <li><a href="mailto:halo@bangunkota.id" className="text-gray-300 hover:text-white transition-colors">Kontak</a></li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mb-12">
          <h3 className="text-lg font-semibold mb-2">Newsletter</h3>
          <p className="text-gray-300 mb-4 max-w-md">
            Daftarkan email kamu untuk update program terbaru dari komunitas Bangunkota.
          </p>
          <form onSubmit={handleSubmit} className="flex max-w-md">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Alamat Email"
              className="flex-1 bg-slate-700 border border-slate-600 rounded-l-full px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
              required
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-2 rounded-r-full hover:from-purple-600 hover:to-pink-600 transition-colors duration-300"
            >
              →
            </button>
          </form>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-slate-700">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Bangunkota.id — Semua hak dilindungi
          </p>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a>
            <span className="text-gray-600">|</span>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}