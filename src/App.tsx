import { Provider } from "react-redux";
import { ModeToggle } from "./components/mode-toggle";
import { ThemeProvider } from "./components/theme-provider";
import { Button } from "./components/ui/button";
import { store } from "./store";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <ModeToggle />
        <Button>Clica ae otario</Button>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
