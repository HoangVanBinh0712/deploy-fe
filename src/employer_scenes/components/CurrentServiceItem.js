import '../css/order-page.css'

const CurrentServiceItem = ({ user }) => {

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
        <div className="row-data-single-item" style={{height:'200px'}}>
            <div className='time-and-state-oder'>
                <div className='create-time-order'>
                    Name: <p>{user.name}</p>
                    - Email: <p>{user.email}</p>
                </div>
                <div className='state-order-paid-wait' style={{color:'green'}}>
                    Expiration Date: {getPostDate(user.serviceExpirationDate, false)}
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
            <div className='col-item-data-order-content' style={{padding:'25px 0'}}>
                <div style={{ width: '25%', paddingLeft: '20px' }}> {user.service.name}</div>
                <div style={{ width: '13%' }} className='title-item upper-letter'> {user.service.type}</div>
                <div style={{ width: '13%' }} className='title-item'>
                    {user.service.postDuration > 1 ? `${user.service.postDuration}${' '}months` : `${user.service.postDuration}${' '}month`}
                </div>
                <div style={{ width: '13%' }} className='title-item'>
                    {checkProfit(user.service.canSearchCV)}
                </div>
                <div style={{ width: '13%' }} className='title-item'>
                    {checkProfit(user.service.canFilterCVSubmit)}
                </div>
                <div style={{ width: '12%', color: "#0c62ad" }} className='title-item'>
                    {user.service.price}{' '}{user.service.currency}
                </div>
            </div>
        </div>
    )
}
export default CurrentServiceItem