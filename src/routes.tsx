import { createElement } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import App from "./App"
import NotFound from "./components/not-found"
import Layout from "./Layout"
import { componentMapper } from "./componentMapper"

const route = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<App />} />
          {componentMapper.map((route) => (
            <Route
              path={route.url}
              element={createElement(route.component, {
                ...route,
                component: null,
              })}
              key={route.name}
            />
          ))}
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default route
