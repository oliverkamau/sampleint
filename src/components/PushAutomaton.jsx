import { useState } from 'react';
import styles from './styles/Groups.module.css';
export default function PushAutomaton(){

    const[expression, setExpression] = useState("");

    function handleExpression(){

        const expressionArray = expression.split(' ');
        const stack = [];
        console.log(expressionArray)
        expressionArray.forEach((value, index) => {
            try {
                
                if (!isNaN(Number(value))) {

                    if(Number(value) < 1048576){
                      
                        stack.push(value)
                        console.log(stack)

                    }else{
                        stack.push(-1)
                        return -1;
                    }
                    
                }else{

                    if(value === 'DUP'){

                        let dupValue = stack[stack.length - 1];
                        // stack.splice(Number(stack.length - 1), 1);
                        // dupValue = Number(dupValue) + Number(dupValue)
                        stack.push(dupValue)
                        console.log(stack)
                    }
                    else if(value === 'POP'){
                        let popValue = stack[stack.length - 1];
                        if(isNaN(popValue)){
                            console.log(-1)
                            stack.push(-1)
                            return -1;
                        }else{
                        stack.pop()
                        console.log(stack)
                        }
                    }else if(value === "+"){

                        let addValue1 = stack[stack.length - 1];
                        let addValue2 = stack[stack.length - 2];

                        if(isNaN(addValue1) || isNaN(addValue2)){
                            console.log(-1)
                            stack.push(-1)
                            return -1;
                        }else{

                            let fullValue = Number(addValue1) + Number(addValue2);
                            stack.pop()
                            stack.pop()
                            stack.push(fullValue);
                            console.log(stack)
                        }
                    }

                    else if(value === "-"){

                        let addValue1 = stack[stack.length - 1];
                        let addValue2 = stack[stack.length - 2];

                        if(isNaN(addValue1) || isNaN(addValue2)){
                            console.log(-1)
                            stack.push(-1)
                            return -1;
                        }else{

                            let fullValue = Number(addValue1) - Number(addValue2);
                            if(Number(fullValue) < 0){
                                console.log(-1)
                                stack.push(-1)
                                return -1;
                            }else{
                            stack.pop()
                            stack.pop()
                            stack.push(fullValue);
                            console.log(stack)
                            }
                        }
                    }
                }
              
            } catch (error) {
                console.log( -1)
                return -1;
            }
           
        

    })
    let finalValue = stack.pop()
    console.log(finalValue)
    if(Number(finalValue) < 1048576){

        console.log(finalValue)
        return finalValue;
    }else{
        console.log(-1)
        return -1;
    }
    }
    return (
        <div>
        <input type="text" onChange={(e) => setExpression(e.target.value)} value={expression} />
        <button className={styles.btnsub} type="button" onClick={handleExpression} >Compute</button>

        </div>
    )
}