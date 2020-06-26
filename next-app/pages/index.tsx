import React from 'react'
import Link from 'next/link'

export default function Index () {
  return <div>
    <h1>VS Project</h1>
    <Link href="/weather">
      <a>Weather Forecasts</a>
    </Link>
  </div>
}
