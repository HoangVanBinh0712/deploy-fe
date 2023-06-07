import '../css/order-page.css'

const SinglePurchareRow = ({ order }) => {

    const data = order

    const getPostDate = (date, isGetTime) => {
        const myDate = new Date(date);
        const day = ("0" + myDate.getDate()).slice(-2);
        const month = ("0" + (myDate.getMonth() + 1)).slice(-2);
        const year = myDate.getFullYear();
        const hour = myDate.getHours()
        const min = myDate.getMinutes()
        if (isGetTime)
            return (`${hour}:${min}${' '}${day}/${month}/${year}`)
        else return (`${day}/${month}/${year}`)
    }

    const getExpiryDate = (date, numMonth) => {
        const myDate = new Date(date);
        const day = ("0" + myDate.getDate()).slice(-2);
        myDate.setMonth(myDate.getMonth()+numMonth)
        const month = ("0" + (myDate.getMonth() + 1)).slice(-2);
        const year = myDate.getFullYear();
        
        return (`${day}/${month}/${year}`)
    }

    const orderState = (state) => {
        let body
        if (state === 'PAID') {
            body = (
                <div style={{color:'green'}}>Paid at: {getPostDate(data.paidDate, true)}</div>
            )
        }
        if (state === 'WAIT_FOR_PAYMENT') {
            body = (
                <div className='pay-order-btn' onClick={()=>{
                    window.open(data.paymentUrl);
                }}>
                    <i className="fa fa-paypal" aria-hidden="true"
                        style={{ marginRight: '5px', color: "#0c62ad" }}></i>
                    Pay now
                </div>
            )
        }
        return body
    }

    const checkProfit = (i) => {
        let body
        if (i === true) {
            body = (
                <i className="fa fa-check-square-o" aria-hidden="true" style={{ color: "#0c62ad" }}></i>
            )
        }
        else {
            body = (
                <i className="fa fa-square-o" aria-hidden="true" style={{ color: "rgb(255, 187, 0)" }}></i>
            )
        }
        return body
    }

    return (
        <div className="row-data-single-item">
            <div className='time-and-state-oder'>
                <div className='create-time-order'>
                    Innitiated date: <p>{getPostDate(data.createdDate, false)}</p>
                    {data.paidDate !== null ? (<>
                        - Expiry: <p>{getExpiryDate(data.paidDate, data.duration)}</p>
                    </>) : (
                        <></>
                    )}
                    {data.paidDate === null ? (<>
                        {' '}
                        <p style={{color:'rgb(255, 187, 0)'}}>
                            <i className="fa fa-exclamation-triangle" aria-hidden="true" style={{ margin:'0 5px' }}></i>
                            Waiting for payment
                        </p>
                    </>) : (
                        <></>
                    )}

                </div>
                <div className='state-order-paid-wait'>
                    {orderState(data.status)}
                </div>
            </div>
            <div className='col-item-data-order-title'>
                <div style={{ width: '25%', paddingLeft: '20px' }}> Service Name</div>
                <div style={{ width: '13%' }} className='title-item'> Service Type</div>
                <div style={{ width: '13%' }} className='title-item'> Post Duration</div>
                <div style={{ width: '13%' }} className='title-item'> Search CV</div>
                <div style={{ width: '13%' }} className='title-item'> Filter CV submit</div>
                <div style={{ width: '12%' }} className='title-item'> Service prices</div>
            </div>
            <div className='col-item-data-order-content'>
                <div style={{ width: '25%', paddingLeft: '20px' }}> {data.service.name}</div>
                <div style={{ width: '13%' }} className='title-item upper-letter'> {data.service.type}</div>
                <div style={{ width: '13%' }} className='title-item'>
                    {data.duration > 1 ? `${data.duration}${' '}months` : `${data.duration}${' '}month`}
                </div>
                <div style={{ width: '13%' }} className='title-item'>
                    {checkProfit(data.service.canSearchCV)}
                </div>
                <div style={{ width: '13%' }} className='title-item'>
                    {checkProfit(data.service.canFilterCVSubmit)}
                </div>
                <div style={{ width: '12%', color: "#0c62ad" }} className='title-item'>
                    {data.service.price}{' '}{data.service.currency}
                </div>
            </div>
        </div>
    )
}
export default SinglePurchareRow