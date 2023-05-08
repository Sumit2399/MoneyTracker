import styled from "styled-components"
import bg from "./img/bg.png"
import { MainLayout } from "./styles/Layouts";
import Orb from "./Components/Orb/Orb";
import Navigation from "./Components/Navigation/Navigation";
import { useMemo, useState } from "react";
import DashBoard from "./Components/Dashboard/DashBoard";
import Incomes from "./Components/incomes/Incomes";
import Expenses from "./Components/Expenses/Expenses";
import { useGlobalContext } from "./context/GlobalContext";



function App() {
  const[active,setActive]=useState(1);
  const global=useGlobalContext()
  console.log(global)
  const orbMemo=useMemo(()=>{
    return <Orb/>
  },[])

  const displayData=()=>{
     switch(active){
      case 1: 
         return <DashBoard/>
      case 2:
        return <DashBoard/>

      case 3:
        return <Incomes/>
        
      case 4:
        return <Expenses/>
        
      default:
         return <DashBoard/> 
     }
  }

  return (
    <AppStyled bg={bg} className="App">
      {orbMemo}
     <MainLayout>
        <Navigation active={active} setActive={setActive}/>
      <main>
        {displayData()}
      </main>
     </MainLayout>
    </AppStyled>
  );
}

const AppStyled=styled.div`
 height:100vh;
 background-image:url(${props=>props.bg});
 position:relative;

 main{
  flex:1;
  background: rgba(252, 246, 249, 0.78);
  border: 3px solid #FFFFFF;
  backdrop-filter: blur(4.5px);
  border-radius: 32px;
  overflow-x:hidden;
  &::-webkit-scrollbar{
    width:0;
  }

 }
`;

export default App;
