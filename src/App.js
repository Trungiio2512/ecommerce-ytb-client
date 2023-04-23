import { Route, Routes } from "react-router-dom";
import { Home, Login, Public } from "./pages/public";
import path from "./until/path";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import * as actions from "./app/actions/app";
function App() {
  // const { isLoading, categories } = useSelector((state) => state.categories);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.getAllCategories());
    dispatch(actions.getBanner());
  }, []);

  // console.log(isLoading);
  return (
    <div className="font-main h-screen">
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />}></Route>
          <Route path={path.LOGIN} element={<Login />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
