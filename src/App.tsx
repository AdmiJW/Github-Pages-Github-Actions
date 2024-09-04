function App() {
    const secret = import.meta.env.VITE_EXAMPLE_SECRET
    const variable = import.meta.env.VITE_EXAMPLE_VAR

    return (
        <main>
            <h1>{secret}</h1>
            <h2>{variable}</h2>
        </main>
    )
}

export default App
