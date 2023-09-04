interface Market {
  exchange: "CME",
  name: "ES" | "MES",
  tick: number,
}

export const MARKETS:Market[] = [
  {
    exchange: "CME",
    name: "ES",
    tick: 12.50,
  },
  {
    exchange: "CME",
    name: "MES",
    tick: 1.25,
  }
]