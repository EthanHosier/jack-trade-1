import { PureComponent } from 'react';
import { PieChart, Pie, Cell } from 'recharts';

interface PieChartData{
  name: string,
    value: number,
    color: string,
}

interface PieChartProps{
  data: PieChartData[],
}

const RADIAN = Math.PI / 180;
const data = [
  { name: 'A', value: 25, color: '#eeeeee' }, // White
  { name: 'B', value: 25, color: '#cccccc' }, // Light Gray
  { name: 'C', value: 25, color: '#999999' }, // Medium Gray
  { name: 'D', value: 25, color: '#666666' }, // Dark Gray
];
const cx = 70;
const cy = 70;
const iR = 35;
const oR = 75;
const value = 50;

const needle = () => {
  let total = 0;
  data.forEach((v) => {
    total += v.value;
  });
  const ang = 180.0 * (1 - value / total);
  const length = (iR + 2 * oR) / 3;
  const sin = Math.sin(-RADIAN * ang);
  const cos = Math.cos(-RADIAN * ang);
  const r = 5;
  const x0 = cx + 5;
  const y0 = cy + 5;
  const xba = x0 + r * sin;
  const yba = y0 - r * cos;
  const xbb = x0 - r * sin;
  const ybb = y0 + r * cos;
  const xp = x0 + length * cos;
  const yp = y0 + length * sin;

  return [
    <circle cx={x0} cy={y0} r={r} fill={"#000000'"} stroke="none" />,
    <path d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`} stroke="#none" fill={"#000000"} />,
  ];
};

export default class Example extends PureComponent<PieChartProps> {
  render() {
    const { data } = this.props;

    return (
      <PieChart width={150} height={80}>
        <Pie
          dataKey="value"
          startAngle={180}
          endAngle={0}
          data={data}
          cx={cx}
          cy={cy}
          innerRadius={iR}
          outerRadius={oR}
          fill="#8884d8"
          stroke="none"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        {needle()}
      </PieChart>
    );
  }
}