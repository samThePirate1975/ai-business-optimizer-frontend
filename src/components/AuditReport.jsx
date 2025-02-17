import React from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { FaCheckCircle, FaTimesCircle, FaLightbulb, FaRocket } from "react-icons/fa";

const AuditReport = ({ report }) => {
  console.log("Données reçues dans AuditReport :", report); // Ajoute ça
  console.log("Longueur de recommandation_finale :", report.recommandation_finale?.length);
  console.log("Valeur brute de recommandation_finale :", report.recommandation_finale);

  if (!report) return null;

  console.log("Données du rapport affichées :", report);

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 mt-6">
      <h2 className="text-2xl font-bold text-center mb-4">📊 Résultat de l'Audit</h2>

      <div className="mb-4 text-center">
        <p className="text-lg font-semibold">
          Score d'évaluation : <span className="text-blue-600">{report.score_evaluation}/100</span>
        </p>
        <p className="text-gray-500 italic">{report.recommandation_finale || "Aucune recommandation disponible."}</p>
      </div>

      <div className="space-y-4">
        <Section title="✅ Forces" icon={<FaCheckCircle className="text-green-600" />} items={report.forces} />
        <Section title="❌ Faiblesses" icon={<FaTimesCircle className="text-red-600" />} items={report.faiblesses} />
        <Section title="💡 Opportunités" icon={<FaLightbulb className="text-yellow-600" />} items={report.opportunites} />
        <Section title="🤖 Conseils IA" icon={<FaRocket className="text-blue-600" />} items={report.conseils_ia} />
      </div>
    </div>
  );
};

// ✅ Garde uniquement CE `export default`
export default AuditReport;

// ✅ Définit le composant `Section` ici, sans `export default`
const Section = ({ title, icon, items }) => (
  <div className="mb-6">
    <h3 className="text-xl font-semibold flex items-center gap-2 text-gray-800 mb-2">
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
