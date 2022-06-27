import {useState, useRef, useEffect, useMemo} from "react"
import './App.css';
import {useReactToPrint} from "react-to-print";

const cashArr = [{'Chăm sóc da cơ bản': 200000}, {'Chăm sóc da nâng cơ': 250000}, {'Hút chì thải độc tố': 200000}, {'Thải độc Corticord': 400000}, {'Lấy mụn cơ bản': 200000}, {'Lấy mụn chuyên sâu': 300000}, {'Lấy mụn vùng lưng': 350000}, {'Giảm quần thâm mắt': 200000}, {'Hấp trắng face': 300000}, {'Chạy vitamin C': 300000}, {'Phun Oxy tươi': 350000}, {'Cấy HA căng bóng': 350000}, {'Cấy nano B5 phục hồi': 350000}, {'Cấy chỉ nano collagen': 400000}, {'Điện di chống lão hóa': 300000}, {'Phi kim tế bào gốc': 1000000}, {'Vi kim tảo biển': 1500000}, {'Cấy máu tự thân PRP': 2000000}, {'Laser Carbon': 1000000}, {'Đốt hột ruồi, tàn nhang': 50000}, {'Tẩy tế bào chết body': 200000}, {'Tắm dưỡng thiên nhiên': 350000}, {'Tắm dưỡng độc quyền': 500000}, {'Tắm Face+Body': 600000}, {'Massage bụng': 200000}, {'Massage body': 250000}, {'Nối mi tự nhiên': 180000}, {'Nối mi volume 1': 200000}, {'Nối mi volume 2': 250000}, {'Nối mi thiết kế': 300000}, {'Dặm mi tự nhiên 50': 90000}, {'Dặm mi tự nhiên 70': 126000}, {'Dặm mi volume 1 50': 100000}, {'Dặm mi volume 1 70': 140000}, {'Dặm mi volume 2 50': 125000}, {'Dặm mi volume 2 70': 175000}, {'Dặm mi thiết kế 50': 150000}, {'Dặm mi thiết kế 70': 210000}, {'Triệt nách 1 lần': 79000}, {'Triệt nách 10 lần': 649000}, {'Triệt nách vĩnh viễn': 949000}, {'Triệt mép 1 lần': 79000}, {'Triệt mép 10 lần': 649000}, {'Triệt mép vĩnh viễn': 949000}, {'Triệt mặt 1 lần': 128000}, {'Triệt mặt 10 lần': 1099000}, {'Triệt mặt vĩnh viễn': 1399000}, {'Triệt tay 1 lần': 139000}, {'Triệt tay 10 lần': 1099000}, {'Triệt tay vĩnh viễn': 1399000}, {'Triệt chân 1 lần': 169000}, {'Triệt chân 10 lần': 1299000}, {'Triệt chân vĩnh viễn': 1599000}, {'Triệt lưng 1 lần': 249000}, {'Triệt lưng 10 lần': 1599000}, {'Triệt lưng vĩnh viễn': 1899000}, {'Triệt bikini 1 lần': 399000}, {'Triệt bikini 10 lần': 1999000}, {'Triệt bikini vĩnh viễn': 2999000}, {'Triệt lông toàn thân vv': 10000000}, {'Điều trị mụn tận gốc': 6000000}, {'Điều trị mụn + thâm': 7000000}, {'Điều trị mụn+thâm+lcl': 8000000}, {'Điều trị mụn+thâm+sẹo1': 10000000}, {'Điều trị mụn+thâm+sẹo2': 15000000}, {'Điều trị tàn nhang, nám 1': 10000000}, {'Điều trị tàn nhang, nám 2': 15000000}, {'Điều trị tàn nhang, nám 3': 20000000}, {'Điều trị tàn nhang, nám 4': 25000000}, {'Điều trị tàn nhang, nám 5': 30000000}, {'Điều trị mụn lưng 1': 10000000}, {'Điều trị mụn lưng 2': 15000000}, {'Điều trị mụn lưng,viêm nl1': 10000000}, {'Điều trị mụn lưng,viêm nl2': 15000000}, {'Điều trị mụn lưng viêm nl3': 20000000},]
const freeArr = [{'Chăm sóc da cơ bản': 200000}, {'Chăm sóc da nâng cơ': 250000}, {'Hút chì thải độc tố': 200000}, {'Thải độc Corticord': 400000}, {'Lấy mụn cơ bản': 200000}, {'Lấy mụn chuyên sâu': 300000}, {'Lấy mụn vùng lưng': 350000}, {'Giảm quần thâm mắt': 200000}, {'Hấp trắng face': 300000}, {'Chạy vitamin C': 300000}, {'Phun Oxy tươi': 350000}, {'Cấy HA căng bóng': 350000}, {'Cấy nano B5 phục hồi': 350000}, {'Cấy chỉ nano collagen': 400000}, {'Điện di chống lão hóa': 300000}, {'Phi kim tế bào gốc': 1000000}, {'Vi kim tảo biển': 1500000}, {'Cấy máu tự thân PRP': 2000000}, {'Laser Carbon': 1000000}, {'Đốt hột ruồi, tàn nhang': 50000}, {'Tẩy tế bào chết body': 200000}, {'Tắm dưỡng thiên nhiên': 350000}, {'Tắm dưỡng độc quyền': 500000}, {'Tắm Face+Body': 600000}, {'Massage bụng': 200000}, {'Massage body': 250000}, {'Nối mi tự nhiên': 180000}, {'Nối mi volume 1': 200000}, {'Nối mi volume 2': 250000}, {'Nối mi thiết kế': 300000}, {'Dặm mi tự nhiên 50': 90000}, {'Dặm mi tự nhiên 70': 126000}, {'Dặm mi volume 1 50': 100000}, {'Dặm mi volume 1 70': 140000}, {'Dặm mi volume 2 50': 125000}, {'Dặm mi volume 2 70': 175000}, {'Dặm mi thiết kế 50': 150000}, {'Dặm mi thiết kế 70': 210000}, {'Triệt nách 1 lần': 79000}, {'Triệt nách 10 lần': 649000}, {'Triệt nách vĩnh viễn': 949000}, {'Triệt mép 1 lần': 79000}, {'Triệt mép 10 lần': 649000}, {'Triệt mép vĩnh viễn': 949000}, {'Triệt mặt 1 lần': 128000}, {'Triệt mặt 10 lần': 1099000}, {'Triệt mặt vĩnh viễn': 1399000}, {'Triệt tay 1 lần': 139000}, {'Triệt tay 10 lần': 1099000}, {'Triệt tay vĩnh viễn': 1399000}, {'Triệt chân 1 lần': 169000}, {'Triệt chân 10 lần': 1299000}, {'Triệt chân vĩnh viễn': 1599000}, {'Triệt lưng 1 lần': 249000}, {'Triệt lưng 10 lần': 1599000}, {'Triệt lưng vĩnh viễn': 1899000}, {'Triệt bikini 1 lần': 399000}, {'Triệt bikini 10 lần': 1999000}, {'Triệt bikini vĩnh viễn': 2999000}, {'Triệt lông toàn thân vv': 10000000}, {'Điều trị mụn tận gốc': 6000000}, {'Điều trị mụn + thâm': 7000000}, {'Điều trị mụn+thâm+lcl': 8000000}, {'Điều trị mụn+thâm+sẹo1': 10000000}, {'Điều trị mụn+thâm+sẹo2': 15000000}, {'Điều trị tàn nhang, nám 1': 10000000}, {'Điều trị tàn nhang, nám 2': 15000000}, {'Điều trị tàn nhang, nám 3': 20000000}, {'Điều trị tàn nhang, nám 4': 25000000}, {'Điều trị tàn nhang, nám 5': 30000000}, {'Điều trị mụn lưng 1': 10000000}, {'Điều trị mụn lưng 2': 15000000}, {'Điều trị mụn lưng,viêm nl1': 10000000}, {'Điều trị mụn lưng,viêm nl2': 15000000}, {'Điều trị mụn lưng viêm nl3': 20000000},]
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


    const getDate = () => {
        const date = new Date();
        return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
    }

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
            freeArr.forEach((item,index) => {
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
        content: () => componentRef.current
    })

    return (<div className='grid grid-cols-2'>
        <div id='print'
             className=' my-5 mx-4 cursor-default' ref={componentRef}>
            <h4 className="font-bold text-center text-2xl  ">TIỂU MẪN BEAUTY & ACADEMY</h4>
            <p className='text-base text-center'>20 Lò Siêu Phường 16 Quận 11</p>
            <p className='text-base text-center'>SĐT: 0999010101</p>
            {/*<h2 className='text-center text-xl'>HOÁ ĐƠN THANH TOÁN</h2>*/}
            <div className='flex justify-between hr'>
                <p className='text-base'>Ngày Giờ</p>
                <p className='text-base'>{getDate()}</p>
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
                    <td className='font-bold text-lg text-right leading-tight'>{discount ? formatter.format(finalSum) : formatter.format(sum)}</td>
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
             className='grid grid-rows-5 border border-solid border-4 rounded-2xl border-indigo-400 w-[350px] mt-4 h-[500px] bg-indigo-50 '>
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
                <optgroup label='Chăm Sóc Da'>
                    {cashArr.map((item, i) => {
                        if (i <= 19) {
                            return (<option key={i} value={Object.keys(item)}>{Object.keys(item)}</option>)
                        }
                    })}
                </optgroup>
                <optgroup label='Chăm Sóc Body'>
                    {cashArr.map((item, i) => {
                        if (i > 19 && i <= 25) {
                            return (<option key={i} value={Object.keys(item)}>{Object.keys(item)}</option>)
                        }
                    })}
                </optgroup>
                <optgroup label='Nối Mi'>
                    {cashArr.map((item, i) => {
                        if (i > 25 && i <= 37) {
                            return (<option key={i} value={Object.keys(item)}>{Object.keys(item)}</option>)
                        }
                    })}
                </optgroup>
                <optgroup label='Triệt Lông'>
                    {cashArr.map((item, i) => {
                        if (i > 37 && i <= 59) {
                            return (<option key={i} value={Object.keys(item)}>{Object.keys(item)}</option>)
                        }
                    })}
                </optgroup>
                <optgroup label='Liệu Trình'>
                    {cashArr.map((item, i) => {
                        if (i > 59) {
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
