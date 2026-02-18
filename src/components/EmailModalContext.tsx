import { createContext, useContext, useState, ReactNode } from "react";

interface EmailModalContextType {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const EmailModalContext = createContext<EmailModalContextType>({
  isOpen: false,
  open: () => {},
  close: () => {},
});

export const useEmailModal = () => useContext(EmailModalContext);

export const EmailModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <EmailModalContext.Provider value={{ isOpen, open: () => setIsOpen(true), close: () => setIsOpen(false) }}>
      {children}
    </EmailModalContext.Provider>
  );
};
