import './App.css';

import { useLayoutEffect, useState } from 'react'
import axios from 'axios';

function App () {

  const [dataShow, setDataShow] = useState([])
  const [rawData, setRawData] = useState([])

  const onSearch = (str) => {
    let newData = rawData.filter((item) => {
      return item.toLowerCase().includes(str.toLowerCase())
    })
    setDataShow(newData)
  };

  const getData = async () => {
    let response = await axios.get('https://api.publicapis.org/categories')
    setDataShow(response.data.categories)
    setRawData(response.data.categories)
  }

  useLayoutEffect(() => {
    getData()
  }, [])

  return (
    <>
      <div>
        <input type="text" onChange={(e) => { onSearch(e.target.value) }} />
      </div>
      <br />
      <table>
        <tbody>
          {dataShow ? dataShow.map((item) => {
            return (
              <tr key={item}>
                <td>
                  {item}
                </td>
              </tr>
            )
          }) : null}
        </tbody>
      </table>
    </>
  );
}

export default App;
