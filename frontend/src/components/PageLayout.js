import {Header, Sidebar, Footer} from '../services/Imports';

const PageLayout = ({ children, user }) => {
    return (
      <div className="app-layout">
        <Header  user={user}/>            
        <div className="main-layout">
          <Sidebar />
          <main className="main-content">{children}</main>
        </div>
        <Footer />
      </div>
    );
  };

export default PageLayout;