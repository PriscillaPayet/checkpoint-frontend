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
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Code</label>
        <input
          type="text"
          name="code"
          value={formData.code}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Emoji</label>
        <input
          type="text"
          name="emoji"
          value={formData.emoji}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add Country"}
      </button>

      {error && <p>Error: {error.message}</p>}
    </form>
  );
}
