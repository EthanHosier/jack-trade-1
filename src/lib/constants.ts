interface Market {
  name: "ES" | "MES",
  tick: number,
}

export const MARKETS:Market[] = [
  {
    name: "ES",
    tick: 12.50,
  },
  {
    name: "MES",
    tick: 1.25,
  }
]