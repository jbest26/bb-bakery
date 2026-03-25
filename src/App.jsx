import bake from './data/bake.json'

function App() {
  return (
    <main className="min-h-screen bg-amber-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-amber-900">BB Bakery</h1>
        <p className="mt-2 text-amber-700">Today's bake: {bake.breadName}</p>
      </div>
    </main>
  )
}

export default App