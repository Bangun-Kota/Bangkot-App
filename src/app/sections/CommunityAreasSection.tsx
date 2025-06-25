import { useState } from "react";
import {
  BookOpen,
  Leaf,
  Music,
  Globe,
  Users,
  Heart,
  Bike,
  Camera,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export default function CommunityAreasSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const areas = [
    { 
      title: "Pendidikan", 
      icon: BookOpen, 
      gradient: "bg-gradient-to-br from-blue-500 to-indigo-600",
      bgColor: "bg-blue-50 hover:bg-blue-100",
      description: "Membangun generasi cerdas"
    },
    { 
      title: "Lingkungan", 
      icon: Leaf, 
      gradient: "bg-gradient-to-br from-green-500 to-emerald-600",
      bgColor: "bg-green-50 hover:bg-green-100",
      description: "Menjaga bumi untuk masa depan"
    },
    { 
      title: "Seni & Budaya", 
      icon: Music, 
      gradient: "bg-gradient-to-br from-purple-500 to-pink-600",
      bgColor: "bg-purple-50 hover:bg-purple-100",
      description: "Melestarikan warisan budaya"
    },
    { 
      title: "Pariwisata", 
      icon: Globe, 
      gradient: "bg-gradient-to-br from-orange-500 to-red-600",
      bgColor: "bg-orange-50 hover:bg-orange-100",
      description: "Mengenalkan keindahan lokal"
    },
    { 
      title: "Sosial", 
      icon: Heart, 
      gradient: "bg-gradient-to-br from-red-500 to-pink-600",
      bgColor: "bg-red-50 hover:bg-red-100",
      description: "Membangun empati bersama"
    },
    { 
      title: "Komunitas", 
      icon: Users, 
      gradient: "bg-gradient-to-br from-teal-500 to-cyan-600",
      bgColor: "bg-teal-50 hover:bg-teal-100",
      description: "Menguatkan ikatan sosial"
    },
    { 
      title: "Olahraga", 
      icon: Bike, 
      gradient: "bg-gradient-to-br from-yellow-500 to-orange-600",
      bgColor: "bg-yellow-50 hover:bg-yellow-100",
      description: "Hidup sehat, jiwa kuat"
    },
    { 
      title: "Media & Kreatif", 
      icon: Camera, 
      gradient: "bg-gradient-to-br from-indigo-500 to-purple-600",
      bgColor: "bg-indigo-50 hover:bg-indigo-100",
      description: "Berkreasi tanpa batas"
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 py-24 lg:py-32">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-blue-300 to-purple-300 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-r from-pink-300 to-orange-300 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/3 w-20 h-20 bg-gradient-to-r from-green-300 to-teal-300 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 rounded-full mb-6 shadow-sm">
            <Sparkles className="w-5 h-5 text-blue-600 animate-pulse" />
            <span className="text-sm font-semibold text-blue-800">Jelajahi Komunitas</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
              Bidang Komunitas
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              di Bangunkota
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Temukan passion Anda dan berkontribusi dalam berbagai bidang yang membuat perbedaan nyata di komunitas
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {areas.map(({ title, icon: Icon, gradient, bgColor, description }, idx) => (
            <div
              key={title}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`group relative transform transition-all duration-500 hover:-translate-y-3 hover:scale-105 cursor-pointer ${
                hoveredIndex === idx ? 'z-10' : ''
              }`}
            >
              <div className={`${bgColor} rounded-2xl p-6 h-full transition-all duration-300 hover:shadow-2xl border border-white/60 backdrop-blur-sm relative overflow-hidden`}>
                {/* Background animation */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 ${gradient.replace('bg-gradient-to-br', 'bg-gradient-to-r')}`}></div>
                
                {/* Icon with gradient background */}
                <div className="relative mb-4 z-10">
                  <div className={`w-16 h-16 rounded-xl ${gradient} p-3 shadow-lg transition-all duration-300 group-hover:shadow-2xl group-hover:rotate-6 group-hover:scale-110`}>
                    <Icon className="w-full h-full text-white" />
                  </div>
                  
                  {/* Floating sparkle effect on hover */}
                  {hoveredIndex === idx && (
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center animate-bounce shadow-lg">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="space-y-3 relative z-10">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-900 transition-colors duration-300">
                    {title}
                  </h3>
                  
                  <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300 leading-relaxed">
                    {description}
                  </p>
                  
                  {/* Hover arrow */}
                  <div className={`flex items-center gap-2 text-sm font-semibold text-blue-600 transition-all duration-300 ${
                    hoveredIndex === idx ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                  }`}>
                    <span>Jelajahi</span>
                    <ArrowRight className="w-4 h-4 animate-pulse" />
                  </div>
                </div>

                {/* Shimmer effect */}
                <div className="absolute inset-0 -top-full bg-gradient-to-b from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:top-full transition-all duration-1000 transform rotate-12"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <button className="group inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-2xl transition-all duration-300 hover:from-blue-700 hover:to-purple-700 hover:scale-105 active:scale-95 relative overflow-hidden">
            {/* Button background animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            
            <span className="relative z-10">Mulai Berkontribusi</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
          </button>
        </div>
      </div>
    </section>
  );
}