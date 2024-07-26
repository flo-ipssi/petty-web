import { FC, useEffect, useState } from 'react';

type Props = {
  showAlert: boolean;
};

const Alert: FC<Props> = ({ showAlert }) => {
  const [visible, setVisible] = useState(showAlert);

  useEffect(() => {
    if (showAlert) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 2000);
      return () => clearTimeout(timer); // Nettoyage du timer à la fin ou au changement de showAlert
    }
  }, [showAlert]);

  if (!visible) return null;

  return (
    <div className="fixed z-10 top-52 left-1/2 transform -translate-x-1/2 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded shadow-md" role="alert">
      <strong className="font-bold">Enregistrement réussi! </strong>
      <span className="block sm:inline">Vous pouvez maintenant vérifier votre adresse email.</span>
    </div>
  );
};

export default Alert;
