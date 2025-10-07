import { useEffect, useState } from 'react'

export default function App() {
  const [msg, setMsg] = useState('')

  useEffect(() => {
    fetch("/api/hello")
    .then(res => res.json())
    .then(data => setMsg(data.message))
  }, [])

  return <p className='font-bold p-4'>{msg}</p>
}
