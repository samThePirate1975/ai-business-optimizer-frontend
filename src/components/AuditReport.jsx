import React from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { FaCheckCircle, FaTimesCircle, FaLightbulb, FaRocket } from "react-icons/fa";
import { useEffect } from "react";

const AuditReport = ({ report }) => {
  if (!report) {
    return <p>Chargement des résultats...</p>;
  }

  if (!report || Object.keys(report).length === 0) {
    return <p className="text-left text-gray-500">Chargement des résultats...</p>;
  }
  
  let parsedReport = report;

  try {
    if (typeof report === "string") {
        parsedReport = JSON.parse(report);
    }
  } catch (error) {
    console.error("❌ Erreur JSON.parse :", error.message);
    parsedReport = null;
  }

  if (!parsedReport || typeof parsedReport !== "object") {
    return <p className="text-red-500">⚠️ Erreur de chargement des données.</p>;
  }

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 mt-6 text-left">
      <h2 className="text-2xl font-bold text-left mb-4">📊 Résultat de l'Audit</h2>

      <div className="mb-4 text-center">
        <p className="text-lg font-semibold">
          Score d'évaluation : 
          <span className="text-blue-600">
            {typeof report.score_evaluation !== "undefined" ? `${report.score_evaluation}/100` : "⚠️ Non reçu"}
          </span>
        </p>
        <p className="text-gray-500 italic text-left">
          {parsedReport.recommandation_finale || "Aucune recommandation disponible."}
        </p>
      </div>

      <div className="space-y-4">
        <Section title="✅ Forces" icon={<FaCheckCircle className="text-green-600" />} items={parsedReport.forces || []} />
        <Section title="❌ Faiblesses" icon={<FaTimesCircle className="text-red-600" />} items={parsedReport.faiblesses || []} />
        <Section title="💡 Opportunités" icon={<FaLightbulb className="text-yellow-600" />} items={parsedReport.opportunites || []} />
        <Section title="🤖 Conseils IA" icon={<FaRocket className="text-blue-600" />} items={parsedReport.conseils_ia || []} />
      </div>
    </div>
  );
};

export default AuditReport;

const Section = ({ title, icon, items }) => {
  return (
    <div className="mb-6 text-left">
      <h3 className="text-xl font-semibold flex items-center gap-2 text-gray-800 mb-2 justify-center">
        {icon} {title}
      </h3>
      <ul className="list-disc list-inside text-gray-700 space-y-1">
        {items && items.length > 0 ? (
          items.map((item, index) => <li key={index}>{item}</li>)
        ) : (
          <p className="text-gray-500 italic">Aucune donnée disponible.</p>
        )}
      </ul>
    </div>
  );
};
