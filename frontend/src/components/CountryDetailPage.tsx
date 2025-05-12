import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_COUNTRY } from "../api/queries";

export function CountryDetailPage() {
  const { code } = useParams();

  const { data, loading, error } = useQuery(GET_COUNTRY, {
    variables: { code },
    skip: !code,
  });

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error.message}</p>;
  if (!data?.country) return <p>Pays introuvable</p>;

  const country = data.country;

  return (
    <div className="p-4 space-y-2">
      <h1 className="text-2xl font-bold">
        {country.emoji} {country.name}
      </h1>
      <p>
        <strong>Code :</strong> {country.code}
      </p>
      {country.continent && (
        <p>
          <strong>Continent :</strong> {country.continent.name}
        </p>
      )}
    </div>
  );
}
