import {useState, useRef, useEffect} from "react"
import './App.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {solid, regular, brands} from '@fortawesome/fontawesome-svg-core/import.macro'
import {useReactToPrint} from "react-to-print";

const obj1 = [{'Nặn Mụn': 200000}, {'Gội Đầu': 50}, {'Massage': 150},]


function App() {
    const [items, setItems] = useState()
    const [addItem, setAddItem] = useState()
    const [sum, setSum] = useState(0)
    const checkList = useRef([])
    const number = useRef([])
    const componentRef = useRef()

    console.log(sum)

    useEffect(() => {
        const sumNumb = number.current.reduce((result, cur) => {
            return result + cur
        }, 0)
        setSum(sumNumb)
    }, [addItem])

    const handleAddItem = () => {
        if (items === undefined) {
            checkList.current.push(obj1[0])
            number.current.push(Number(Object.values(obj1[0])))
        } else {
            obj1.forEach(item => {
                if (Object.keys(item) == items) {
                    checkList.current.push(item)
                    number.current.push(Number(Object.values(item)))
                }
            })
        }
        setAddItem(checkList.current.length)
    }

    const handleRemoveItem = index => {
        checkList.current.splice(index, 1)
        console.log('remove')
        setAddItem(checkList.current.length)
    }

    const handlePrint = useReactToPrint({
        content: () => componentRef.current
    })


    return (<div>
        <div id='print' ref={componentRef}>
            <h1 className='text-center text-5xl'>TIỂU MẪN BEAUTY & ACADEMY</h1>
            <h3 className='text-center text-1xl'>20 Lò Siêu. Phường 16. Quận 11</h3>
            <h3 className='text-center text-1xl'>SĐT: 0999010101</h3>
            <h2 className='text-center text-3xl'>HOÁ ĐƠN THANH TOÁN</h2>
            <h3 className='text-center text-1xl'>Ngày Giờ</h3>
            <table className='text-center table-auto border border-spacing-2 border-slate-900'>
                <tbody>
                <tr className='border border-slate-900'>
                    <th className='border border-slate-900'>STT</th>
                    <th className='border border-slate-900'>Dịch Vụ</th>
                    <th className='border border-slate-900'>Thành Tiền</th>
                </tr>
                {checkList.current.map((item, index) => {
                    return (<tr className='border border-slate-900' key={index}>
                        <td className='border border-slate-900'>{index + 1}</td>
                        <td className='border border-slate-900'>{Object.keys(item)}</td>
                        <td className='border border-slate-900'>{Object.values(item)}</td>
                        <td onClick={() => handleRemoveItem(index)}><FontAwesomeIcon icon={solid('xmark')}/></td>
                    </tr>)
                })}
                <tr>
                    <td>Tổng Hoá Đơn</td>
                    <td></td>
                    <td className='border border-slate-900'>{sum}</td>
                </tr>
                </tbody>
            </table>
        </div>
        <select name="" id="" onChange={e => setItems(e.target.value)}>
            <optgroup label='Chăm Sóc Da'>
                {obj1.map((item, i) => {
                    return (<option key={i} value={Object.keys(item)}>{Object.keys(item)}</option>)
                })}
            </optgroup>
        </select>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full' onClick={handleAddItem}>ADD</button>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full' onClick={handlePrint}>Print</button>
    </div>)
        ;
}

export default App;
