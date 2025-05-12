import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_COUNTRY } from "../api/queries";

export function CountryDetailPage() {
  const { code } = useParams();
  console.log(code);

  const { data, loading, error } = useQuery(GET_COUNTRY, {
    variables: { code },
    skip: !code,
  });

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error.message}</p>;
  if (!data?.country) return <p>Pays introuvable</p>;

  const country = data.country;

  return (
    <div className="country-detail-container">
      <div className="country-detail-card">
        <div className="country-detail-emoji">{country.emoji}</div>
        <div className="country-detail-info">
          <p>
            <strong>Name :</strong> {country.name} ({country.code})
          </p>
          {country.continent && (
            <p>
              <strong>Continent :</strong> {country.continent.name}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
