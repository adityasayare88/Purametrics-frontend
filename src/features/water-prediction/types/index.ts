export interface WaterPredictionFormData {
    ph: string;
    Hardness: string;
    Solids: string;
    Chloramines: string;
    Sulfate: string;
    Conductivity: string;
    Organic_carbon: string;
    Trihalomethanes: string;
    Turbidity: string;
  }
  
  export interface PredictionResponse {
    prediction: number;
    message: string;
  }