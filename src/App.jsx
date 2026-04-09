import { RouterProvider } from "react-router-dom";
import routes from "./Routes/Routes";

function App() {
  return (
    <div className="bg-[#161616] min-h-screen">
      <RouterProvider router={routes} />
    </div>
  );
}

export default App;