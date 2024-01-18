export function formatAddress(address: string) {
  if (!address?.length) return ''
  return (
    address.toLowerCase().slice(0, 4) + '...' + address.toLowerCase().slice(-4)
  )
}

export async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<any> {
  const res = await fetch(input, init)
    .then((res) => res.json())
    .catch((err) => console.error(err))
  return res
}

export function getFuncParams(func: string) {
  // Start parameter names after first '('
  let start = func.indexOf('(') + 1

  // End parameter names is just before last ')'
  let end = func.length - 1

  let result = func.substring(start, end).split(',')

  let params: string[] = []

  for (let i = 0; i < result.length; i++) {
    const element = result[i]
    if (element.includes('(')) {
      const _params: string[] = []
      result.slice(i).forEach((el) => {
        if (el.includes(')')) {
          _params.push(el)
          i++
          return
        }
        _params.push(el)
        i++
      })

      params.push(_params.join(','))
    } else {
      params.push(element)
    }
  }

  return params
}

export function isValidEmail(email: string) {
  var re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  return re.test(email)
}
