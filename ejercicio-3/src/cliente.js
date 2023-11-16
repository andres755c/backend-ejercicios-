//async function main() {
    const domain = 'localhost'
    const port = '4545'
    const path = '/productos'
    const query = 'id'
    const url = `http://${domain}:${port}${path}?${query}`
    console.log(`URL: ${url}`)
    const response = await fetch(url)
    const content  = await response.json()
    console.log(content)
//}
//main()

export {}