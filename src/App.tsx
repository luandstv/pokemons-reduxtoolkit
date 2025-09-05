import { Provider } from "react-redux";
import { ModeToggle } from "./components/mode-toggle";
import { ThemeProvider } from "./components/theme-provider";
import { store } from "./store";
import { PokemonList } from "./components/PokemonList";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <ModeToggle />
        <PokemonList />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
