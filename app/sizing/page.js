import React from 'react';

const Table = ({ data }) => {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', margin: '0 auto' }}>
      <thead>
        <tr style={{ backgroundColor: '#eee', textAlign: 'center' }}>
          <th>Circumference (mm)</th>
          <th>Circumference (inches)</th>
          <th>Ring size (mm)</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => {
          return (
            <tr key={row['Circumference (mm)']}>
              <td style={{ border: '1px solid #ccc', padding: '5px', textAlign: 'center' }}>
                {row['Circumference (mm)']}
              </td>
              <td style={{ border: '1px solid #ccc', padding: '5px', textAlign: 'center' }}>
                {row['Circumference (inches)']}
              </td>
              <td style={{ border: '1px solid #ccc', padding: '5px', textAlign: 'center' }}>
                {row['Ring size']}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default function RingSizeTable() {
  const data = [
    {
      "Circumference (mm)": 41.01,
      "Circumference (inches)": 1.61,
      "Ring size": 1
    },
    {
      "Circumference (mm)": 42.7,
      "Circumference (inches)": 1.64,
      "Ring size": 2
    },
    {
      "Circumference (mm)": 42.9,
      "Circumference (inches)": 1.69,
      "Ring size": 3
    },
    {
      "Circumference (mm)": 43.6,
      "Circumference (inches)": 1.72,
      "Ring size": 4
    },
    {
      "Circumference (mm)": 44.8,
      "Circumference (inches)": 1.76,
      "Ring size": 5
    },
    {
      "Circumference (mm)": 46.1,
      "Circumference (inches)": 1.81,
      "Ring size": 6
    },
    {
      "Circumference (mm)": 47.4,
      "Circumference (inches)": 1.87,
      "Ring size": 7
    },
    {
      "Circumference (mm)": 48,
      "Circumference (inches)": 1.89,
      "Ring size": 8
    },
    {
      "Circumference (mm)": 48.7,
      "Circumference (inches)": 1.92,
      "Ring size": 9
    },
    {
      "Circumference (mm)": 50,
      "Circumference (inches)": 1.97,
      "Ring size": 10
    },
    {
      "Circumference (mm)": 51.2,
      "Circumference (inches)": 2.02,
      "Ring size": 11
    },
    {
      "Circumference (mm)": 51.9,
      "Circumference (inches)": 2.04,
      "Ring size": 12
    },
    {
      "Circumference (mm)": 53.1,
      "Circumference (inches)": 2.09,
      "Ring size": 13
    },
    {
      "Circumference (mm)": 54.4,
      "Circumference (inches)": 2.14,
      "Ring size": 14
    },
    {
      "Circumference (mm)": 55.1,
      "Circumference (inches)": 2.16,
      "Ring size": 15
    },
    {
      "Circumference (mm)": 56.3,
      "Circumference (inches)": 2.22,
      "Ring size": 16
    },
    {
      "Circumference (mm)": 57,
      "Circumference (inches)": 2.24,
      "Ring size": 17
    },
    {
      "Circumference (mm)": 58.3,
      "Circumference (inches)": 2.3,
      "Ring size": 18
    },
    {
      "Circumference (mm)": 58.9,
      "Circumference (inches)": 2.32,
      "Ring size": 19
    },
    {
      "Circumference (mm)": 60.2,
      "Circumference (inches)": 2.37,
      "Ring size": 20
    },
    {
      "Circumference (mm)": 60.8,
      "Circumference (inches)": 2.39,
      "Ring size": 21
    },
    {
      "Circumference (mm)": 62.1,
      "Circumference (inches)": 2.44,
      "Ring size": 22
    },
    {
      "Circumference (mm)": 62.7,
      "Circumference (inches)": 2.47,
      "Ring size": 23
    },
    {
      "Circumference (mm)": 64,
      "Circumference (inches)": 2.52,
      "Ring size": 24
    },
    {
      "Circumference (mm)": 64.6,
      "Circumference (inches)": 2.54,
      "Ring size": 25
    },
    {
      "Circumference (mm)": 65.9,
      "Circumference (inches)": 2.59,
      "Ring size": 26
    },
    {
      "Circumference (mm)": 67.2,
      "Circumference (inches)": 2.65,
      "Ring size": 27
    },
    {
      "Circumference (mm)": 67.8,
      "Circumference (inches)": 2.67,
      "Ring size": 28
    },
    {
      "Circumference (mm)": 69.1,
      "Circumference (inches)": 2.72,
      "Ring size": 29
    },
    {
      "Circumference (mm)": 71,
      "Circumference (inches)": 2.8,
      "Ring size": 30
    }
  ]


  return (
    <div style={{ padding: "50px" }}>
      <h1 style={{ textAlign: 'center', marginBottom: "15px" }}>How to find your Diamour Ring Size?</h1>
      <Table data={data} />
    </div>
  );
}
