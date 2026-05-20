import React, { createContext, useState, useCallback } from 'react';

export interface ServiceFlowState {
  selectedService: string | null;
  selectedTemples: string[];
  formData: {
    fullName: string;
    email: string;
    phone: string;
    dateOfVisit: string;
    numberOfPeople: number;
    specialRequirements: string;
  };
}

export interface ServiceFlowContextType {
  state: ServiceFlowState;
  setSelectedService: (service: string) => void;
  addTemple: (templeId: string) => void;
  removeTemple: (templeId: string) => void;
  clearTemples: () => void;
  updateFormData: (data: Partial<ServiceFlowState['formData']>) => void;
  resetFlow: () => void;
}

const initialState: ServiceFlowState = {
  selectedService: null,
  selectedTemples: [],
  formData: {
    fullName: '',
    email: '',
    phone: '',
    dateOfVisit: '',
    numberOfPeople: 1,
    specialRequirements: '',
  },
};

export const ServiceFlowContext = createContext<ServiceFlowContextType | undefined>(undefined);

export const ServiceFlowProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<ServiceFlowState>(initialState);

  const setSelectedService = useCallback((service: string) => {
    setState(prev => ({
      ...prev,
      selectedService: service,
    }));
  }, []);

  const addTemple = useCallback((templeId: string) => {
    setState(prev => ({
      ...prev,
      selectedTemples: prev.selectedTemples.includes(templeId)
        ? prev.selectedTemples
        : [...prev.selectedTemples, templeId],
    }));
  }, []);

  const removeTemple = useCallback((templeId: string) => {
    setState(prev => ({
      ...prev,
      selectedTemples: prev.selectedTemples.filter(id => id !== templeId),
    }));
  }, []);

  const clearTemples = useCallback(() => {
    setState(prev => ({
      ...prev,
      selectedTemples: [],
    }));
  }, []);

  const updateFormData = useCallback((data: Partial<ServiceFlowState['formData']>) => {
    setState(prev => ({
      ...prev,
      formData: {
        ...prev.formData,
        ...data,
      },
    }));
  }, []);

  const resetFlow = useCallback(() => {
    setState(initialState);
  }, []);

  return (
    <ServiceFlowContext.Provider
      value={{
        state,
        setSelectedService,
        addTemple,
        removeTemple,
        clearTemples,
        updateFormData,
        resetFlow,
      }}
    >
      {children}
    </ServiceFlowContext.Provider>
  );
};

export const useServiceFlow = () => {
  const context = React.useContext(ServiceFlowContext);
  if (!context) {
    throw new Error('useServiceFlow must be used within ServiceFlowProvider');
  }
  return context;
};
