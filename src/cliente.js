    const host = 'localhost'
    const port = '7575'
    const path = '/productos'
    const query = '/celulares-y-dispositivos'


    const url = `http://${host}:${port}${path}?${query}`
    console.log(`URL: ${url}`)

    const response = await fetch(url)
    const content = await response.json()
    console.log(content)

export { }