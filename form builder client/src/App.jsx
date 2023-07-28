import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Parent from "./layout/parent";
import QuestionForm from "./pages/questionForm";
import FormRespond from "./pages/formRespond";
import Landing from "./pages/landing";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Parent />,
      children: [
        { path: "/", element: <Landing /> },
        { path: "/questionform", element: <QuestionForm /> },
        { path: "/formrespond", element: <FormRespond /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
