'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';
import type { WaterPredictionFormData } from '../types';

const initialFormData: WaterPredictionFormData = {
  ph: '',
  Hardness: '',
  Solids: '',
  Chloramines: '',
  Sulfate: '',
  Conductivity: '',
  Organic_carbon: '',
  Trihalomethanes: '',
  Turbidity: ''
};

const fieldLabels: Record<keyof WaterPredictionFormData, string> = {
  ph: 'pH Level',
  Hardness: 'Water Hardness',
  Solids: 'Total Dissolved Solids',
  Chloramines: 'Chloramines Level',
  Sulfate: 'Sulfate Content',
  Conductivity: 'Conductivity',
  Organic_carbon: 'Organic Carbon',
  Trihalomethanes: 'Trihalomethanes Level',
  Turbidity: 'Turbidity Level'
};

const fieldPlaceholders: Record<keyof WaterPredictionFormData, string> = {
  ph: '0-14',
  Hardness: '0-323',
  Solids: '0-61227',
  Chloramines: '0-13',
  Sulfate: '0-481',
  Conductivity: '0-753',
  Organic_carbon: '0-28.3',
  Trihalomethanes: '0-124',
  Turbidity: '1.45-6.74'
};

export default function WaterPredictionForm() {
  const [formData, setFormData] = useState<WaterPredictionFormData>(initialFormData);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setResult(null);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Convert string values to numbers
      const numericalFormData: Record<string, number> = Object.entries(formData).reduce(
        (acc, [key, value]) => ({
          ...acc,
          [key]: parseFloat(value),
        }),
        {}
      );

      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(numericalFormData),
      });

      if (!response.ok) {
        const errorBody = await response.text().catch(() => null);
        console.error('API Error Response:', errorBody);
        throw new Error(errorBody || 'Failed to get prediction');
      }

      const data = await response.json();
      setResult(data.message);
    } catch (err) {
      console.error('API Error:', err);
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to connect to the prediction service. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto p-8 shadow-lg rounded-lg bg-white border border-gray-200">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-4xl font-bold text-blue-600">🌊 Water Quality Prediction</CardTitle>
        <p className="text-gray-600 dark:text-gray-400">
          Enter water parameters to predict potability.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {Object.entries(formData).map(([field, value]) => (
              <div key={field} className="flex flex-col space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  {fieldLabels[field as keyof WaterPredictionFormData]}
                </label>
                <Input
                  type="number"
                  step="0.01"
                  name={field}
                  value={value}
                  onChange={handleInputChange}
                  required
                  placeholder={fieldPlaceholders[field as keyof WaterPredictionFormData]}
                  className="w-full border border-blue-300 rounded-lg p-2 focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200"
                />
              </div>
            ))}
          </div>
          <div className="flex gap-4">
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-200" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                'Predict Water Quality'
              )}
            </Button>
            <Button type="button" variant="outline" onClick={resetForm} className="w-1/3 border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition duration-200">
              Reset
            </Button>
          </div>
        </form>

        {error && (
          <Alert variant="destructive" className="mt-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {result && (
          <div className={`mt-6 p-4 rounded-lg shadow-md ${result === "Water is potable" ? "bg-green-100 text-green-800 border border-green-300" : "bg-red-100 text-red-800 border border-red-300"}`}>
            <h3 className="font-bold text-xl">Prediction Result</h3>
            <p className="mt-1 text-lg">{result === "Water is potable" ? "✅ The water is safe for drinking." : "❌ The water is not safe for drinking."}</p>
            {/* Displaying result in a more readable format */}
            <div className={`mt-2 p-2 rounded-md ${result === "Water is potable" ? "bg-green-50" : "bg-red-50"}`}>
              <strong>Summary:</strong>
              <ul className="list-disc pl-5 mt-1">
                <li><strong>Recommendation:</strong> {result === "Water is potable" ? "You can drink it!" : "Avoid consumption."}</li>
              </ul>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
