function App() {
    const env = import.meta.env.VITE_EXAMPLE_ENV

    return <h1>{env}</h1>
}

export default App
