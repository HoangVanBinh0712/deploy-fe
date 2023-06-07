import LineChart from './LineChart'
import '../css/statitic-page.css'
import { useContext, useEffect, useState } from 'react'
import { PostContext } from '../../contexts/PostContext'

const StatiticsPage = () => {

    const {getEmpStatiticsView,getEmpStatiticsSubmit,getEmpStatiticsTotalViewPost, } = useContext(PostContext)

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

    const [statiticsPostData, setStatitcsPostData] = useState(dataDefault)
    const [statiticsSubmitData, setStatitcsSubmitData] = useState(dataDefault)
    const [statiticsViewPageData, setStatitcsViewPageData] = useState(dataDefault)

    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()

    const getStaSubmitData = async() => {
        const res = await getEmpStatiticsSubmit(currentYear)
        if(res.status ===200){
            setStatitcsSubmitData(res.data)
        }
    }

    const getStaViewPageData = async() => {
        const res = await  getEmpStatiticsView(currentYear)
        if(res.status ===200){
            setStatitcsViewPageData(res.data)
        }
    }

    const getStaPostData = async() => {
        const res = await  getEmpStatiticsTotalViewPost(currentYear)
        if(res.status ===200){
            setStatitcsPostData(res.data)
        } 
    }

    useEffect(()=>{
        getStaSubmitData()
        getStaViewPageData()
        getStaPostData()
    },[])


    const [isPostSta, setIsPostSta] = useState(true)
    const [isViewSta, setIsViewSta] = useState(false)
    const [isSubmitSta, setIsSubmitSta] = useState(false)

    const onClickPost = () =>{
        setIsViewSta(false)
        setIsSubmitSta(false)
        setIsPostSta(true)
    }

    const onClickSubmit = () =>{
        setIsPostSta(false)
        setIsViewSta(false)
        setIsSubmitSta(true)
    }

    const onClickView = () =>{
        setIsPostSta(false)
        setIsSubmitSta(false)
        setIsViewSta(true)
    }

    return (
        <div style={{ width: "80%" }}>
            <div className="component-title">
                <span>Overview</span>
            </div>
            <div className="free-space" id="free-space" style={{ paddingTop: '20px' }} >
                <div className='overal-group-chose' style={{ paddingBottom: '40px' }}>
                    <div className='title-group-overal group-manager-post-title'>
                        Statitics:
                    </div>
                    <div className='title-group-overal group-manager-post button' onClick={() => { onClickPost() }}>
                        <div>
                            <p>View Post</p>
                        </div>
                    </div>
                    <div className='title-group-overal group-manager-post button' onClick={() => {  onClickView() }}>
                        <div>
                            <p>View Statistics</p>
                        </div>
                    </div>
                    <div className='title-group-overal group-manager-post button' onClick={() => {  onClickSubmit()  }}>
                        <div>
                            <p>Applications</p>
                        </div>
                    </div>
                </div>
                <div className='gr-chart' style={isPostSta?{display:'block'}:{display:'none'}} >
                    <div className='chart-frame-statitics'>
                        <LineChart arr={statiticsPostData} title={`Number of post's views  per month in ${currentYear}`} />
                    </div>
                    <div style={{display:'flex', justifyContent:'center'}}>Statistical chart of the number views of posts by month.</div>
                </div>
                <div className='gr-chart' style={isViewSta?{display:'block'}:{display:'none'}}>
                    <div className='chart-frame-statitics'>
                        <LineChart arr={statiticsViewPageData} title={`Number of Profile's view per month in ${currentYear}`} />
                    </div>
                    <div style={{display:'flex', justifyContent:'center'}}>Statistical chart of the number of views by month for your profiles.</div>
                </div>
                <div className='gr-chart' style={isSubmitSta?{display:'block'}:{display:'none'}}>
                    <div className='chart-frame-statitics'>
                        <LineChart arr={statiticsSubmitData} title={`Number of Post's submitted in ${currentYear}`} />
                    </div>
                    <div style={{display:'flex', justifyContent:'center'}}>Statistical chart of the number of submittions by month.</div>
                </div>
            </div>
        </div>
    )
}
export default StatiticsPage;