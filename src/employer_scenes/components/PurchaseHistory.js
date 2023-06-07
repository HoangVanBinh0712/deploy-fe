import { useContext, useEffect, useState } from "react"
import SinglePurchareRow from "./SinglePurchareRow";
import leftArrow from "../../assets/icons/left-arow-icon.png"
import rightArrow from "../../assets/icons/right-arow-grey-icon.png"
import { AuthContext } from "../../contexts/AuthContext";

const PurchaseHistory = () => {

    const { getEmployerService } = useContext(AuthContext)

    const [listServiceDisplay, setListServiceDisplay] = useState([])
    const [listAllServices, setListAllServices] = useState([])
    const [listServicesPaid, setListServicesPaid] = useState([])
    const [listServicesNotPaid, setListServicesNotPaid] = useState([])

    const getAllSv = async () => {
        const resNotPay = await getEmployerService('WAIT_FOR_PAYMENT')
        const resPaid = await getEmployerService('PAID')
        if (resPaid.success) {
            setListServicesPaid(resPaid.data)
        }
        if (resNotPay.success) {
            setListServicesNotPaid(resNotPay.data)
        }
        setListAllServices([...resPaid.data, ...resNotPay.data])
        setListServiceDisplay([...resPaid.data, ...resNotPay.data])
    }

    useEffect(() => {
        getAllSv()
    }, [])

    function chuckPosts(arr, length) {
        const chunks = [];
        let i = 0;
        while (i < arr.length) {
            chunks.push(arr.slice(i, i + length));
            i += length;
        }
        return chunks;
    }

    const allPost = chuckPosts(listServiceDisplay, 4)

    const [currentPage, setCurrentPage] = useState(0)

    const toPreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1)
        }
    }
    const toNextPage = () => {
        if (currentPage < allPost.length - 1) {
            setCurrentPage(currentPage + 1)
        }
    }

    const toAnyPage = (page) => {
        setCurrentPage(page)
    }

    const onClickAllService = () => {
        setListServiceDisplay(listAllServices)
    }
    const onClickPaidService = () => {
        setListServiceDisplay(listServicesPaid)
    }
    const onClickPendingPayService = () => {
        setListServiceDisplay(listServicesNotPaid)
    }

    const onChangeSelectPost = (event) => {
        if (event.target.value === '') {
            setListServiceDisplay(listAllServices)
        }
        else if (event.target.value === 'PAID') {
            setListServiceDisplay(listServicesPaid)
        }
        else if (event.target.value === 'WAIT_FOR_PAYMENT') {
            setListServiceDisplay(listServicesNotPaid)
        }
    }

    return (
        <div style={{ width: "80%" }}>
            <div className="component-title">
                <span>Purchase history</span>
            </div>
            <div className="free-space" id="free-space">
                <div className='overal-group-chose'>
                    <div className='title-filter title-group-overal group-manager-post-title '>
                        Overall:
                    </div>
                    <div className='title-group-overal group-manager-post over-all' onClick={() => { onClickAllService() }}>
                        <div>
                            <p>Total Oders</p>
                            <span style={{ color: "#0c62ad", fontFamily: " Roboto-Medium" }}>{listAllServices.length}</span>
                        </div>
                    </div>
                    <div className='title-group-overal group-manager-post over-all' onClick={() => { onClickPaidService() }}>
                        <div>
                            <p>Paid</p>
                            <span style={{ color: "#0c62ad", fontFamily: " Roboto-Medium" }}>
                                {listServicesPaid.length}
                            </span>
                        </div>
                    </div>
                    <div className='title-group-overal group-manager-post over-all' onClick={() => { onClickPendingPayService() }}>
                        <div>
                            <p>Waiting payment</p>
                            <span style={{ color: "#0c62ad", fontFamily: " Roboto-Medium" }}>
                                {listServicesNotPaid.length}
                            </span>
                        </div>
                    </div>
                </div>
                <div className='select-filer-row'>
                    <div className='select-filer-group'>
                        <div className='title-filter'>
                            Filter:
                        </div>
                        <div className='select-item'>
                            <select onChange={onChangeSelectPost} defaultValue={''}>
                                <option value={''} > All Purchases</option>
                                <option value={'PAID'} > Paid</option>
                                <option value={'WAIT_FOR_PAYMENT'} > Waiting for payment</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="content-wrapper" style={{ height: "780px", padding: "0px", gap: "0", boxShadow:'none', borderBottom:'1px solid #cfcfcf' }}>
                    {listAllServices.length === 0 ? (
                        <div style={{ display: "flex", justifyContent: "center" }}> You have not made any transactions yet!</div>)
                        : (allPost[currentPage].map((o, id) => (
                            <SinglePurchareRow order={o} key={id} />))
                        )
                    }
                </div>
                <div className="paging-post" style={{ marginTop: '-10px' }}>
                    <div className="circle-round" onClick={toPreviousPage}>
                        <img src={leftArrow} alt='icon' style={{ height: "95%" }} />
                    </div>
                    {allPost.map((p, id) => (
                        <div className="page-num-round" onClick={() => { toAnyPage(id) }} key={id}
                            style={currentPage === id ? { backgroundColor: "#0c62ad", border: "2px solid #0c62ad" } : { backgroundColor: "#cfcfcf", border: "2px solid #cfcfcf" }}
                        >

                        </div>
                    ))}
                    <div className="circle-round" onClick={toNextPage}>
                        <img src={rightArrow} alt='icon' style={{ height: "95%" }} />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default PurchaseHistory