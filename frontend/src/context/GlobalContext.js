import React,{ createContext, useContext, useState } from "react";
import axios from 'axios'

const BASE_URL='http://localhost:5000/api/v1/';

const GlobalContext=createContext()
export const GlobalProvider=({children})=>{

    const[incomes,setIncomes]=useState([])
    const[expenses,setExpenses]=useState([])
    const[error,setError]=useState(null)

    //income
    const addIncome=async(income)=>{
        const response=await axios.post(`${BASE_URL}add-income`,income)
        .then((res)=>console.log("success"))
                        .catch((err)=>{
                            setError(err.response.data.message)
                        })
                        getIncomes()

                    }

    const getIncomes=async(income)=>{
        const res=await axios.get(`${BASE_URL}get-incomes`)
        setIncomes(res.data);
        
        console.log(res.data);
    }
    
    const deleteIncomes=async(id)=>{
        const res=await axios.delete(`${BASE_URL}delete-income/${id}`)
        getIncomes()

    }

    const totalIncomes=()=>{
        let totalIncome=0;
        incomes.map((income)=>{
            totalIncome+=income.amount
        })
        return totalIncome;


    }

    //expenses

    const addExpense=async(expense)=>{
        const response=await axios.post(`${BASE_URL}add-expense`,expense)
        .then((res)=>console.log("success"))
                        .catch((err)=>{
                            setError(err.response.data.message)
                        })
                        getExpenses()

                    }

    const getExpenses=async(expense)=>{
        const res=await axios.get(`${BASE_URL}get-expenses`)
        setExpenses(res.data);
        
        console.log(res.data);
    }
    
    const deleteExpenses=async(id)=>{
        const res=await axios.delete(`${BASE_URL}delete-expense/${id}`)
        getExpenses()

    }

    const totalExpenses=()=>{
        let totalExpense=0;
        expenses.map((expense)=>{
            totalExpense+=expense.amount
        })
        return totalExpense;


    }

    const totalBalance=()=>{
        return totalIncomes()-totalExpenses();
    }

    const transactionHistory=()=>{
            const history=[...incomes,...expenses]
            history.sort((a,b)=>{
                return new Date(b.createdAt)-new Date(a.createdAt)
            })
            return history



    }
    
    return(
        <GlobalContext.Provider
        value={{
            addIncome,getIncomes,incomes,deleteIncomes,totalIncomes,
            addExpense,getExpenses,expenses,deleteExpenses,totalExpenses,
            totalBalance,transactionHistory,error,setError
        }
        }>
            {children}
        </GlobalContext.Provider>
    );
}

export const useGlobalContext=()=>{
    return useContext(GlobalContext)
}