import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import publicRoute from "./routes/routes";
import DefaultLayout from "./components/layouts/DefaultLayout/DefaultLayout";
import { Fragment, useContext } from "react";
import Loadding from "./components/layouts/Loadding/Loadding";
import { Context } from "./contexts/Context";

function App() {
  const { loadding } = useContext(Context);
  return (
    <Router>
      <div className="App">
        {loadding == true ? <Loadding /> : <></>}
        <Routes>
          {publicRoute.map((item, index) => {
            let Layout = DefaultLayout;
            if (item.layout) {
              Layout = item.layout;
            } else {
              if (item.layout === null) {
                Layout = Fragment;
              }
            }
            const Page = item.component;
            return (
              <Route key={index}>
                <Route
                  key={index}
                  path={item.path}
                  element={
                    <Layout>
                      <Page data={item.path}></Page>
                    </Layout>
                  }
                ></Route>
              </Route>
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
