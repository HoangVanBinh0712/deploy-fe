import './spinner.css'

const Spinning = () => {

  return (<>
    <div id="loading-page">
      <div className="loader"></div>
      <div id="content" >
        Loading...
      </div>
    </div>
  </>
  )
};

export default Spinning;