"use client"
import WaterPredictionForm from '@/features/water-prediction/components/WaterPredictionForm';
import { Droplets, Sparkles } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-light-beige flex items-center justify-center py-8 px-6 relative overflow-hidden">
      <div className="absolute inset-0 z-0 aurora-background">
        <div className="aurora-gradient"></div>
      </div>
      
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 relative z-10">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-4 flex items-center justify-center">
          Welcome to Purametrics 
          <Droplets size={40} className="ml-2" />
        </h1>
        <p className="text-black-600 font-bold text-center mb-6 flex items-center justify-center">
          <Sparkles size={24} className="mr-1" />
          Your Gateway to Clean Water Confidence
          <Sparkles size={24} className="ml-1" />
        </p>
        <WaterPredictionForm />
      </div>


      <style jsx>{`
        .aurora-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .aurora-gradient {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(
            0deg, 
            rgba(0, 105, 148, 0.3) 0%, 
            rgba(64, 164, 180, 0.3) 25%, 
            rgba(255, 255, 255, 0.2) 50%, 
            rgba(0, 169, 204, 0.3) 75%, 
            rgba(0, 105, 148, 0.3) 100%
          );
          background-size: 100% 100%;
          animation: aurora-movement 15s ease infinite;
          filter: blur(100px);
          opacity: 0.7;
        }

        @keyframes aurora-movement {
          0% {
            transform: rotate(0deg) scale(1);
          }
          50% {
            transform: rotate(180deg) scale(1.2);
          }
          100% {
            transform: rotate(360deg) scale(1);
          }
        }
      `}</style>
    </main>
  );
}