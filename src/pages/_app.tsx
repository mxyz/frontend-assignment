import type { AppProps } from "next/app";
import "~/styles/globals.css";

export interface IPageControllerProps {
  ssgProps?: unknown;
}

function App({ Component, pageProps }: AppProps<IPageControllerProps>) {
  return (
    <main className="min-h-screen">
      <Component ssgProps={pageProps} />
    </main>
  );
}
export default App;
