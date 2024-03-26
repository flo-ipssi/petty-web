import React, { FC } from 'react';
import './Step4.scss';

interface Step4Props {
  data: any;
  onPrevious: () => void;
  onSubmit: (data: any) => void;
}

const Step4: FC<Step4Props> = ({ data, onPrevious, onSubmit }) => {
    const handleSubmit = () => {
      // Validation des données si nécessaire
      onSubmit(data);
    };
  
    return (
      <div>
        <h2>Étape 3 : Récapitulatif</h2>
        <p>Nom : {data.name}</p>
        <p>Email : {data.email}</p>
        <button onClick={onPrevious}>Précédent</button>
        <button onClick={handleSubmit}>Soumettre</button>
      </div>
    );
  };

export default Step4;