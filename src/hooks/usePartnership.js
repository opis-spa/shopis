import { useContext } from 'react';
import { PartnershipContext } from '../contexts/PartnershipContext';

// ----------------------------------------------------------------------

const usePartnership = () => useContext(PartnershipContext);

export default usePartnership;
