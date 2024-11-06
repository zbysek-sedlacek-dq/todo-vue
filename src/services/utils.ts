export const formatDateTime = (d: string) => {
  d = new Date(d);
  const s = d.toLocaleString()
  console.log(s)
  return s
}
