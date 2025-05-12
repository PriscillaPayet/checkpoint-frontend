import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { GET_COUNTRIES } from "../api/queries";
import { AddCountryForm } from "../components/AddCountryForm";

export function HomePage() {
  const { data, loading, error, refetch } = useQuery(GET_COUNTRIES);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error.message}</p>;

  return (
    <div className="container">
      <AddCountryForm onSuccess={refetch} />
      <div className="countries-list">
        {data.countries.map((country: any) => (
          <Link
            to={`/country/${country.code}`}
            key={country.id}
            className="country-item"
          >
            <div className="country-name">{country.name}</div>
            <div className="country-emoji">{country.emoji}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
