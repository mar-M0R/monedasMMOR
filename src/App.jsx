import { useState } from "react"
import { Layout } from "./components/Layout"
import { BrowserRouter } from "react-router"

function App() {
    return (
      <div>
        <BrowserRouter>
          <Layout></Layout>
        </BrowserRouter>
        
      </div>
      
    )
}

export default App