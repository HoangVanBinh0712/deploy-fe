import "./PageNotFound.css";

const PageNotFound = () => {
  return (
    <div id="error-page">
      <div className="content">
        <h2 className="header" data-text="404">
          404
        </h2>
        <h4 className="title-in-notfound" data-text="Opps! Page not found">Opps! Page not found</h4>
        <p className="text-in-notfound">
          Sorry, the page you're looking for doesn't exist. If you think
          something is broken, report a problem.
        </p>
        <div className="btns">
          <a href="/user/home">return home</a>
          <a href="https://www.facebook.com/vanbinh0712">report problem</a>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
