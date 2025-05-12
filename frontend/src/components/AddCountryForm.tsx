import { useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { ADD_COUNTRY } from "../api/mutations";

type Props = {
  onSuccess?: () => void;
};

export function AddCountryForm({ onSuccess }: Props) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    emoji: "",
  });

  const [addCountry, { loading, error }] = useMutation(ADD_COUNTRY);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await addCountry({
        variables: { data: formData },
      });

      if (onSuccess) {
        onSuccess();
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-6 max-w-md">
      <div>
        <label className="block">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border px-2 py-1 rounded"
          required
        />
      </div>

      <div>
        <label className="block">Code</label>
        <input
          type="text"
          name="code"
          value={formData.code}
          onChange={handleChange}
          className="w-full border px-2 py-1 rounded"
          required
        />
      </div>

      <div>
        <label className="block">Emoji</label>
        <input
          type="text"
          name="emoji"
          value={formData.emoji}
          onChange={handleChange}
          className="w-full border px-2 py-1 rounded"
          required
        />
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Adding..." : "Add Country"}
      </button>

      {error && <p className="text-red-600">Error: {error.message}</p>}
    </form>
  );
}
