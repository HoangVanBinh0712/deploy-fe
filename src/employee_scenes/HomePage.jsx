import React, { useContext } from 'react'
import TopBar from '../components/global/TopBar';
import Banner from '../components/global/Baner';
import Footer from '../components/global/Footer';
import ListPostsHomepage from './components/ListPostsHomepage';
import TopEmployer from './components/TopEmployer';
import { PostContext } from '../contexts/PostContext';
import { GlobalContext } from '../contexts/GlobalContext';
import ChatBox from '../components/global/ChatBox';
import { AuthContext } from '../contexts/AuthContext';

const HomePage = () => {

  const { postState: { posts, postHot, postMostView, postsAi } } = useContext(PostContext)
  const { globalState: { highlightCompany } } = useContext(GlobalContext)
  const { authState: { user, authloading } } = useContext(AuthContext)

  return (
    <>
      {!authloading && user && <ChatBox />}

      <TopBar />
      <Banner />
      <ListPostsHomepage
        title={"Hot job"}
        isHaveAi={false}
        listPosts={postHot}
      />
      <TopEmployer listCompanies={highlightCompany} />
      <ListPostsHomepage
        title={"Suitable job"}
        isHaveAi={true}
        listPosts={postsAi}
      />
      <ListPostsHomepage
        title={"Attractive job"}
        isHaveAi={false}
        listPosts={postMostView}
      />
      <Footer/>
    </>
  )
}

export default HomePage;