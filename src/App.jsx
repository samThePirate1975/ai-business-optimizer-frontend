import React, { useState } from "react";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Button } from "./components/ui/button";
import AuditReport from "./components/AuditReport";
import { FaSpinner } from "react-icons/fa";
import "./App.css";



const App = () => {
  const [businessName, setBusinessName] = useState("");
  const [description, setDescription] = useState("");
  const [challenges, setChallenges] = useState("");
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setReport(null);

  const response = await fetch("https://ai-business-optimizer-backend-production.up.railway.app/api/audit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        business_name: businessName,
        description: description,
        challenges: challenges,
    }),
   });
    

      if (!response.ok) {
        throw new Error("Erreur lors de la génération de l’audit.");
      }

      const data = await response.json();
      setReport(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      {/* 🔥 Loader Overlay en Avant-Plan */}
      {loading && (
        <div className="loading-overlay">
          <FaSpinner className="text-white text-4xl animate-spin" />
        </div>
      )}

      <div className="bg-white shadow-lg rounded-xl p-6 max-w-lg w-full relative z-10">
        <h1 className="text-3xl font-bold text-center">🧠 AI Business Optimizer 🧠</h1>
        <p className="text-center text-gray-600 my-3">
          Découvrez en <b>30 secondes</b> comment améliorer votre business grâce à l'IA.
        </p>

        <div className="space-y-4">
          <div>
            <Label>Nom du Business</Label>
            <Input
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="Ex: Startup GreenTech, Agence WebBoost..."
            />
          </div>
          <div>
            <Label>Description</Label>
            <Input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ex: Vente de café bio, création de sites web..."
            />
          </div>
          <div>
            <Label>Défis</Label>
            <Input
              type="text"
              value={challenges}
              onChange={(e) => setChallenges(e.target.value)}
              placeholder="Ex: Trouver plus de clients, automatiser certaines tâches..."
            />
          </div>

          <Button onClick={handleSubmit} disabled={loading} className="w-full">
            {loading ? (
              <span className="flex items-center">
                <FaSpinner className="animate-spin mr-2" /> Analyse en cours...
              </span>
            ) : (
              "Générer l'Audit"
            )}
          </Button>
        </div>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        {report && <AuditReport report={report} />}
      </div>
    </div>
  );
};

export default App;
