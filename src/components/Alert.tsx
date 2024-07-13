import { FC } from 'react';
import { useLocation } from 'react-router-dom';

type Props = {
};

const Alert : FC<Props> = () => {
    const location = useLocation();

    // Check if the URL contains the parameter "WaitToConfirm"
    const searchParams = new URLSearchParams(location.search);
    const showAlert = searchParams.get('WaitToConfirm') === 'success';
  
    if (!showAlert) return null;
  
    return (
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded shadow-md" role="alert">
        <strong className="font-bold">Enregistrement réussi! </strong>
        <span className="block sm:inline">Vous pouvez maintenant vous connecter.</span>
      </div>
    );
};

export default Alert;
