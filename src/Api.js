export const getDollar = async (coin) =>{
    try {
        let url = 'https://economia.awesomeapi.com.br/json/last/USD-BRL'
        const res = await fetch(url)
        return res.json
    } catch (error) {
        console.log(error)
    }
}