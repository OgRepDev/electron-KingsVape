import { Route, MemoryRouter as Router, Routes } from 'react-router-dom'
import { Content, Navbar, RootLayout } from './components'
import AddProduct from './pages/AddProduct'
import Dashboards from './pages/Dashboards'
import Raports from './pages/Raports'
import Sells from './pages/Sells'
import Warehouse from './pages/Warehouse'

// IMPORT LOGO

function App(): JSX.Element {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <RootLayout>
              <Navbar />
              <Content>
                <Warehouse />
              </Content>
            </RootLayout>
          }
        />
        <Route
          path="/addproduct"
          element={
            <RootLayout>
              <Navbar />
              <Content>
                <AddProduct />
              </Content>
            </RootLayout>
          }
        />
        <Route
          path="/dashboards"
          element={
            <RootLayout>
              <Navbar />
              <Content>
                <Dashboards />
              </Content>
            </RootLayout>
          }
        />
        <Route
          path="/raports"
          element={
            <RootLayout>
              <Navbar />
              <Content>
                <Raports />
              </Content>
            </RootLayout>
          }
        />
        <Route
          path="/sells"
          element={
            <RootLayout>
              <Navbar />
              <Content>
                <Sells />
              </Content>
            </RootLayout>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
