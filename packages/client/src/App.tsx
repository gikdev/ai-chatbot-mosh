import { useEffect, useState } from 'react'
import { Button } from './components/ui/button'

export default function App() {
  const [msg, setMsg] = useState('')

  useEffect(() => {
    fetch("/api/hello")
    .then(res => res.json())
    .then(data => setMsg(data.message))
  }, [])

  return (
    <div className='p-4'>
      <p className='font-bold'>{msg}</p>
      <Button>Click me</Button>
    </div>
  )
}
