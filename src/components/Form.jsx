import { useState } from "react";

const Form = ({ onSubmit }) => {
  const [business, setBusiness] = useState("");

  const handleChange = (e) => {
    setBusiness(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (business.trim() !== "") {
      onSubmit(business);
      setBusiness(""); // Reset après soumission
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 p-5 rounded-lg shadow-md mt-5 w-full max-w-lg mx-auto"
    >
      <label className="block text-white text-lg mb-2 font-semibold">
        Décrivez votre business :
      </label>
      <input
        type="text"
        value={business}  // ⚡ Ici, il doit bien être lié à useState
        onChange={handleChange}  // ⚡ Met à jour le state
        placeholder="Ex: Agence marketing spécialisée en IA..."
        className="w-full p-2 rounded-lg border-2 border-gray-600 focus:border-blue-500 focus:outline-none bg-white text-black"
      />
      <button
        type="submit"
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg mt-3 w-full transition-all"
      >
        Générer un audit IA 🚀
      </button>
    </form>
  );
};

export default Form;
