import smCrypto from 'sm-crypto'

const PUBLIC_KEY =
  '04a1f81df1dbd45c2931b4fefed32f544d596f7e8e2326f2c1f4629d5fd8a614bdaafc6ab8a3b18d9545b6ab1d8999d2b778743fdc4e817a67f2d9a08034d51756'

export function encrypt(data: string): string {
  try {
    return smCrypto.sm2.doEncrypt(data, PUBLIC_KEY, 0)
  } catch {
    return ''
  }
}
