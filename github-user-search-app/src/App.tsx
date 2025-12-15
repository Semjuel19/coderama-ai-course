import { ThemeProvider } from '@/store/themeContext';
import { HomePage } from '@/pages/HomePage';

function App() {
  return (
    <ThemeProvider>
      <HomePage />
    </ThemeProvider>
  );
}

export default App;
