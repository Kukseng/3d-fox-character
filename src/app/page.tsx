import Scene3D from '../app/components/Scene3D'

export default function Home() {
  return (
    <main className="w-full h-screen">
      <div className="absolute top-4 left-4 z-10 bg-black bg-opacity-50 text-white p-4 rounded">
        <h1 className="text-xl font-bold mb-2">Stack-Quiz Character </h1>
        
      </div>
      <Scene3D />
    </main>
  )
}