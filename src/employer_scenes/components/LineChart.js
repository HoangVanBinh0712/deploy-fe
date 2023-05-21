import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label } from 'recharts';
import Title from './Title';
import { useState, useEffect } from 'react';

export default function Chart({ arr, type, title }) {

  const theme = useTheme();

  const dataDefault = [
    { month: 'Jan', value: 0 },
    { month: 'Feb', value: 0 },
    { month: 'Mar', value: 0 },
    { month: 'April', value: 0 },
    { month: 'May', value: 0 },
    { month: 'Jun', value: 0 },
    { month: 'July', value: 0 },
    { month: 'Aug', value: 0 },
    { month: 'Sept', value: 0 },
    { month: 'Oct', value: 0 },
    { month: 'Nov', value: 0 },
    { month: 'Dec', value: 0 },
  ];

  const formatData = (arr) => {
    const m = ['Jan', 'Feb', 'Mar', 'April', 'May', 'Jun', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
    let newData = []
    let highMonth = false
    for (let i = 12; i > 0; i--) {
      const obj = arr.find((item) => item.month === i);
      if (obj === undefined) {
        if (!highMonth)
          newData.unshift({ month: m[i - 1], value: undefined })
        else newData.unshift({ month: m[i - 1], value: 0 })
      }
      else {
        newData.unshift({ month: m[i - 1], value: obj.value })
        highMonth = true
      }
    }
    return newData
  }

  const data = formatData(arr)

  return (
    <>
      {data.length > 0 ? (
        <div>
          <Title>{title}</Title>
          <LineChart height={360} width={1200} data={data}
            margin={{ top: 16, right: 16, bottom: 0, left: 24, }}
          >
            <XAxis
              dataKey="month"
              stroke={theme.palette.text.secondary}
              style={theme.typography.body2}
            />
            <YAxis
              allowDataOverflow
              interval="preserveStartEnd"
              tickFormatter={(value) => Math.round(value)}
              stroke={theme.palette.text.secondary}
              style={theme.typography.body2}
            >
              <Label
                angle={270}
                position="left"
                style={{
                  textAnchor: 'middle',
                  fill: theme.palette.text.primary,
                  ...theme.typography.body1,
                }}
              >
                (counts)
              </Label>
            </YAxis>

            <Line
              isAnimationActive={false}
              type="monotone"
              dataKey="value"
              stroke={theme.palette.primary.main}
              dot={true}
            />
          </LineChart>
        </div>
      ) : (<></>)}

    </>

  );
}