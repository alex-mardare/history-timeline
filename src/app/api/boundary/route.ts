import { NextResponse } from 'next/server'

import { URLs } from '@/constants'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const osmType = searchParams.get('osmType')
  const osmId = searchParams.get('osmId')

  if (!osmType && !osmId) {
    return NextResponse.json(
      { error: 'Missing search location' },
      { status: 400 }
    )
  }

  const osmUrl =
    URLs.NOMINATIM + `?osm_ids=${osmType}${osmId}&format=json&polygon_geojson=1`

  try {
    const response = await fetch(osmUrl, {
      headers: {
        'User-Agent': 'History timeline'
      }
    })
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: 'Failed to fetch boundary' },
      { status: 500 }
    )
  }
}
