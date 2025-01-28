import WaterPredictionForm from '@/features/water-prediction/components/WaterPredictionForm';
import { Droplets, Sparkles } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-light-beige flex items-center justify-center py-8 px-6">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
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
    </main>
  );
}
