import { HighchartsReact } from "highcharts-react-official"
import Highcharts from "highcharts/highstock"

export type OHLCData = {
  date: Date
  open: number
  high: number
  low: number
  close: number
}

export type CoinHighchartProps = {
  data: OHLCData[]
}
export const CoinHighchart = ({ data }: CoinHighchartProps) => {
  const options: Highcharts.Options = {
    chart: { animation: false },
    title: {
      text: "",
    },
    time: {
      useUTC: true,
    },
    navigator: {
      enabled: false,
    },
    scrollbar: {
      enabled: false,
    },
    tooltip: {
      followPointer: true,
      shadow: false,
    },
    legend: { enabled: false },
    xAxis: {
      type: "datetime",
      crosshair: {
        label: { enabled: true },
      },
    },
    yAxis: {
      title: { text: "" },
      opposite: true,
      crosshair: {
        label: { enabled: true },
      },
    },
    series: [
      {
        type: "candlestick",
        name: "",
        data: data.map((d) => [d.date.getTime(), d.open, d.high, d.low, d.close]),
        dataGrouping: { enabled: true },
      },
    ],
  }

  return <HighchartsReact highcharts={Highcharts} options={options} />
}
