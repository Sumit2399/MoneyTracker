import React, { useEffect } from 'react';
import styled from 'styled-components';
import { InnerLayout } from '../../styles/Layouts';
import { useGlobalContext } from '../../context/GlobalContext';
import Form from '../Form/Form';
import IncomeItem from '../IncomeItem/IncomeItem';


function Incomes(props) {
   const {addIncome,getIncomes,incomes,deleteIncomes,totalIncomes}= useGlobalContext()
   useEffect(()=>{
    getIncomes()
   },[])
    return (
        <IncomesStyled>
            <InnerLayout>
                <h1>Incomes</h1>
                <h2 className='total-income'>Total Income:<span>${totalIncomes()}</span></h2>
                <div className='income-content'>
                    <div className='form-container'>
                        <Form/>

                    </div>
                    <div className='incomes'>
                        {
                            incomes.map((income)=>{
                                const{_id,title,amount,date,category,description,type}=income;
                                return <IncomeItem 
                                        key={_id}
                                        id={_id}
                                        title={title}
                                        amount={amount}
                                        date={date}
                                        type={type}
                                        category={category}
                                        description={description}
                                        indicatorColor="var(--color-green)"
                                        deleteItem={deleteIncomes}/>

                               
                            })
                        }
                    </div>
                </div>
            </InnerLayout>
        </IncomesStyled>
    );
}

const IncomesStyled=styled.div`

overflow: auto;
.total-income{
    display: flex;
    justify-content: center;
    align-items: center;
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    padding: 1rem;
    margin: 1rem 0;
    font-size: 2rem;
    gap: .5rem;
    span{
        font-size: 2.5rem;
        font-weight: 800;
        color: var(--color-green);
    }
}
.income-content{
    display: flex;
    gap: 1rem;
    .incomes{
        flex:1;
    }
}



`;

export default Incomes;