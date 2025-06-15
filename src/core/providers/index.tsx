import StoreProvider from './StoreProvider';
import ThemeProvider from './ThemeProvider';
import ToastProvider from './ToastProvider';


const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreProvider>
      <ThemeProvider>
        <ToastProvider>{children}</ToastProvider>
      </ThemeProvider>
    </StoreProvider>
  );
};

export default Providers;
