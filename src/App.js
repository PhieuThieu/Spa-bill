import {useState, useRef, useEffect} from "react"
import './App.css';
import {useReactToPrint} from "react-to-print";
import dayjs from "dayjs";
import cashArr from './Data/cashList.json'

import freeArr from './Data/freeList.json'
const discountsNumb = ['none', 10, 20, 50, 100]

function App() {
  const [items, setItems] = useState()
  const [cash, setCash] = useState(0)
  const [change, setChange] = useState(0)
  const [checkRender, setCheckRender] = useState(false)
  const [checkChange, setCheckChange] = useState(false)
  const [sum, setSum] = useState(0)
  const [finalSum, setFinalSum] = useState(0)
  const [discount, setDiscount] = useState(undefined)
  const [discountPrice, setDiscountPrice] = useState(undefined)
  const checkList = useRef([])
  const number = useRef([])
  const componentRef = useRef()
  const formatter = new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'})
  const time = () => dayjs().format("DD/MM/YYYY HH:mm")


  useEffect(() => {
    const sumNumb = number.current.reduce((result, cur) => {
      return result + cur
    }, 0)
    setSum(sumNumb)
    setCheckChange(!checkChange)
  }, [checkRender])

  useEffect(() => {
    const discountPercent = sum * (100 - discount) / 100
    if (discount === undefined) {
      setChange((sum === 0) ? 0 : cash - sum)
    } else {
      setDiscountPrice(sum - discountPercent)
      setChange(cash - discountPercent)
    }
    setFinalSum(sum - (sum - discountPercent))

  }, [checkChange])

  const handleDiscount = e => {
    setDiscount(e.target.value)
    setCheckChange(!checkChange)
  }

  const handleCashChange = e => {
    const cash = Number(e.target.value)
    setCash(cash)
    setCheckChange(!checkChange)
  }

  const handleAddItem = () => {
    if (items === undefined) {
      checkList.current.push(cashArr[0])
      number.current.push(Number(Object.values(cashArr[0])))
    } else {
      cashArr.forEach(item => {
        if (Object.keys(item) == items) {
          checkList.current.push(item)
          number.current.push(Number(Object.values(item)))
        }
      })
    }
    setChange(cash - (sum + Number(number.current.slice(-1))))
    setCheckRender(!checkRender)
  }

  const handleAddFreeItem = () => {
    if (items === undefined) {
      freeArr[0][(Object.keys(freeArr[0]))[0]] = 0
      checkList.current.push(freeArr[0])
      number.current.push(0)
    } else {
      freeArr.forEach((item, index) => {
        item[(Object.keys(item)[0])] = 0
        if (Object.keys(item) == items) {
          item[(Object.keys(item)[0])] = 0
          checkList.current.push(item)
          number.current.push(0)
        }
      })
    }
    setCheckRender(!checkRender)
  }

  const handleRemoveItem = index => {
    checkList.current.splice(index, 1)
    number.current.splice(index, 1)
    setChange((number.current.length === 0) ? 0 : cash - (sum - Number(number.current.slice(-1))))
    setCheckRender(!checkRender)
  }

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })

  return (<div className='grid grid-cols-1 md:grid-cols-2'>
    <div id='print'
         className=' my-5 mx-4 cursor-default' ref={componentRef}>
      <h4 className="font-bold text-center text-2xl  ">TIỂU MẪN BEAUTY & ACADEMY</h4>
      <p className='text-base text-center'>29 Lò Siêu Phường 16 Quận 11</p>
      <p className='text-base text-center'>SĐT: 0766369445</p>
      {/*<h2 className='text-center text-xl'>HOÁ ĐƠN THANH TOÁN</h2>*/}
      <div className='flex justify-between hr'>
        <p className='text-base'>Ngày Giờ</p>
        <p className='text-base'>{time()}</p>
      </div>
      <table className='mt-5 table-fixed border-collapse border-spacing-5 relative flex flex-col mt-4'>
        <tbody>
        <tr className='grid grid-cols-2'>
          <th className='font-semibold text-base text-left leading-tight'>Dịch Vụ</th>
          <th className='font-semibold text-base text-right leading-tight'>Thành Tiền</th>
        </tr>
        {checkList.current.map((item, index) => {
          return (<tr className='grid grid-cols-2 mt-2' key={index}>
            <td className='text-base text-left leading-tight'> {Object.keys(item)}</td>
            <td className='text-base text-right leading-tight cursor-pointer'
                onClick={() => handleRemoveItem(index)}
            >{formatter.format(Object.values(item))}</td>
          </tr>)
        })}
        <tr className=' grid hr '/>
        {discount ? <tr className='grid grid-cols-2 mb-2'>
          <td className='text-sm text-left leading-tight'>Tiền Chưa Giảm</td>
          <td className='text-base text-right leading-tight'>{formatter.format(sum)}</td>
        </tr> : ''}
        {discount ? <tr className='grid grid-cols-2 mb-2'>
          <td className='text-sm text-left leading-tight'>Giảm Giá {discount + '%'} </td>
          <td className='text-base text-right leading-tight'>-{formatter.format(discountPrice)}</td>
        </tr> : ''}
        <tr className='grid grid-cols-2 mb-2'>
          <td className='font-bold text-left leading-tight text-xl '>Tổng</td>
          <td
            className='font-bold text-lg text-right leading-tight'>{discount ? formatter.format(finalSum) : formatter.format(sum)}</td>
        </tr>
        <tr className='grid grid-cols-2 mb-2'>
          <td className='text-base text-left leading-tight'>Tiền Khách Đưa</td>
          <td className='text-base text-right leading-tight'>{formatter.format(cash)}</td>
        </tr>
        <tr className='grid grid-cols-2 mb-2'>
          <td className='text-base text-left leading-tight'>Tiền Thối Lại</td>
          <td className='text-base text-right leading-tight'>{formatter.format(change)}</td>
        </tr>
        </tbody>
      </table>
      <h6 className="mt-12 text-center font-medium leading-tight text-base ">Xin Cảm Ơn Quý Khách</h6>
      <h6 className="mt-1 text-center font-medium leading-tight text-base ">Hẹn Gặp Lại</h6>
    </div>
    <div id='noPrint'
         className='grid grid-rows-5 border border-solid border-4 rounded-2xl border-indigo-400 w-11/12 md:w-[350px] mt-4 h-[500px] bg-indigo-50 mx-auto my-5 md:mx-0'>
            <span className='mx-auto w-11/12'>
                <p className='p-txt'>Giảm Giá</p>
            <select className='selected' name="" id="" onChange={handleDiscount}>
                <optgroup label='Giảm Giá'>
                    {discountsNumb.map(numb => {
                      if (numb === 'none') {
                        return (<option key={numb} value=''>{''}</option>)
                      } else {
                        return (<option key={numb} value={numb}>{numb}</option>)
                      }
                    })}
                </optgroup>
            </select>
            </span>
      <span className='mx-auto w-11/12'>
                <p className='p-txt'>Dịch Vụ</p>
                <select className='selected' name="" id="" onChange={e => setItems(e.target.value)}>
                  <optgroup label='Gội Đầu'>
                    {cashArr.map((item, i) => {
                      if (i <= 2) {
                        return (
                          <option key={i} value={Object.keys(item)}>{Object.keys(item)}</option>)
                      }
                    })}
                </optgroup>
                <optgroup label='Chăm Sóc Da'>
                    {cashArr.map((item, i) => {
                      if (i > 2 && i <= 28) {
                        return (
                          <option key={i} value={Object.keys(item)}>{Object.keys(item)}</option>)
                      }
                    })}
                </optgroup>
                <optgroup label='Chăm Sóc Body'>
                    {cashArr.map((item, i) => {
                      if (i > 28 && i <= 34) {
                        return (<option key={i} value={Object.keys(item)}>{Object.keys(item)}</option>)
                      }
                    })}
                </optgroup>
                <optgroup label='Nối Mi'>
                    {cashArr.map((item, i) => {
                      if (i > 34 && i <= 46) {
                        return (<option key={i} value={Object.keys(item)}>{Object.keys(item)}</option>)
                      }
                    })}
                </optgroup>
                <optgroup label='Triệt Lông'>
                    {cashArr.map((item, i) => {
                      if (i > 46 && i <= 68) {
                        return (<option key={i} value={Object.keys(item)}>{Object.keys(item)}</option>)
                      }
                    })}
                </optgroup>
                <optgroup label='Waxing'>
                    {cashArr.map((item, i) => {
                      if (i > 68 && i <= 73) {
                        return (<option key={i} value={Object.keys(item)}>{Object.keys(item)}</option>)
                      }
                    })}
                </optgroup>
                <optgroup label='Liệu Trình'>
                    {cashArr.map((item, i) => {
                      if (i > 73) {
                        return (<option key={i} value={Object.keys(item)}>{Object.keys(item)}</option>)
                      }
                    })}
                </optgroup>
            </select>
            </span>
      <div className=' h-2/3 flex w-11/12 mx-auto my-auto mt-5 justify-center' role='group'>
        <button
          className='btn w-2/3 h-full mr-0 text-2xl rounded-r-none hover:bg-indigo-500 active:button-active'
          onClick={handleAddItem}>ADD
        </button>
        <button
          className=' btn w-1/3 h-full ml-0 text-xl text-indigo-600 rounded-l-none bg-indigo-50 border boder-solid border-l-0 border-2 border-indigo-600 hover:button-hover hover:border-0 hover:text-indigo-50 active:button-active'
          onClick={handleAddFreeItem}>FREE
        </button>
      </div>
      <input
        className='focus:hover:focused-input flex mx-auto my-auto mt-5 border border-solid border-2 border-indigo-400 h-2/3 rounded-xl w-11/12 placeholder-slate-400 pl-4'
        type="text"
        onChange={handleCashChange}
        placeholder='Nhập Số tiền khách Trả'
      />
      <button className='flex items-center btn h-2/3 justify-center' onClick={handlePrint}>Print</button>
    </div>

  </div>);
}

export default App;
