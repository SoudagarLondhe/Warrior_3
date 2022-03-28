
// import './App.css';
import ChatRoom from './Pages/Chatbot';
import Chat from './Pages/Chat';
import Header from './Pages/header';
import Footer from './Pages/footer';
import SiteInfo from './Pages/main';
import './Pages/main.css';

function App() { 
  return (   
       <div>
           <div className="body">
             {/* <Header /> */}
             <SiteInfo />
             <Footer />
           </div>
           <Chat/>
       </div>
       
         
  );
}
export default App;


