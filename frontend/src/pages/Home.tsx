import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { GET_COUNTRIES } from "../api/queries";

export function HomePage() {
  const { data, loading, error } = useQuery(GET_COUNTRIES);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error.message}</p>;

  return (
    <div className="grid gap-4">
      {data.countries.map((country: any) => (
        <Link
          to={`/country/${country.code}`}
          key={country.id}
          className="block p-4 border rounded shadow hover:bg-gray-50 transition"
        >
          <h2 className="text-xl">
            {country.emoji} {country.name}
          </h2>
        </Link>
      ))}
    </div>
  );
}
