import { useEffect, useState } from "react";
import styles from "./styles/Groups.module.css";
export default function Groups(){


    const[success, setSuccess] = useState("Created Successfully")
    const[groups, setGroups] = useState([])
    const[members, setMembers] = useState([])
    const[selected, setSelected] = useState(0)
    const[group, setGroup] = useState({groupId:0,groupName:'',groupType:'',bankAccount:'',maxMembers:0,locality:''})
    const[member, setMember] = useState({memberId:0,name:'',idNo:'',phoneNumber:'',birthDate:'',email:'',groupId:''})
    const[memberCount, setMemberCount] = useState(0)
    const[groupCount, setGroupCount] = useState(0)


    const URL = 'http://localhost:8080/api/groups/';

    const key = '5ly$xc7mnvilpjfgshg&jkfll00wwwxvbnflop#1user';

    async function fetchGroups(){
     
        try{
        let fetchUrl = `${URL}getGroups`;

        const response = await fetch(fetchUrl,{
               method : "GET",
               headers: {
                'key': key
               }
        })
        let groupData = await response.json();
        setGroupCount(groupData.count);
        setGroups(groupData.groups);
    }catch(error){

        alert('An error has occured');
    }
        
    }


    async function fetchMembers(value){
     console.log(value)
     setSelected(value)
     setMember({...member,groupId:value})
        try{
        let fetchUrl = `${URL}getMembers?group=${value}`;

        const response = await fetch(fetchUrl,{
               method : "GET",
               headers: {
                'key': key
               }
        })
        let memberData = await response.json();
        setMemberCount(memberData.count);
        setMembers(memberData.members);
    }catch(error){

        alert('An error has occured');
    }
        
    }



    async function createGroups(){
     
        try{
        let fetchUrl = `${URL}createGroups`;

        const response = await fetch(fetchUrl,{
               method : "POST",
               headers: {
                'key': key,
                'Content-Type': 'application/json'
               },
               body: JSON.stringify(group)
        })
        if(!response.ok){
            alert('An error has occured');
        }
        let alertMessage = await response.json();
        setSuccess(alertMessage.message)
        fetchGroups();
        setGroup({groupName:'',groupType:'',bankAccount:'',maxMembers:'',locality:''})
        alert(success)
    }catch(error){

        alert('An error has occured');
    }
        
    }

    async function createMembers(){
     
        try{
        let fetchUrl = `${URL}createMembers`;

        const response = await fetch(fetchUrl,{
               method : "POST",
               headers: {
                'key': key,
                'Content-Type': 'application/json'

               },
               body: JSON.stringify(member)
        })
        if(!response.ok){
            alert('An error has occured');
        }
        let alertMessage = await response.json();
        setSuccess(alertMessage.message)
        fetchMembers(selected);
        alert(success)
    }catch(error){

        alert('An error has occured');
    }
        
    }

    useEffect( () =>{
       fetchGroups();
    },[]
    )

    return(

        <>

      <h1>Welcome to Group's App</h1>
      <div>

         <input type="hidden" value={group.groupId}/>
         <label>Group Name:</label>
         <input type="text" onChange={(e) => setGroup({...group,groupName:e.target.value})} value={group.groupName}/>

         <label>Group Type:</label>
         <select type="text" onChange={(e) => setGroup({...group,groupType:e.target.value})} value={group.groupType}>
            <option value="">Select Type</option>
            <option value="Local">Local</option>
            <option value="Urban">Urban</option>
            </select>

            <label>Bank Account:</label>
            <input type="text" onChange={(e) => setGroup({...group,bankAccount:e.target.value})} value={group.bankAccount}/>

            <label>Max Members:</label>
            <input type="text" onChange={(e) => setGroup({...group,maxMembers:e.target.value})} value={group.maxMembers}/>
</div>
<div>
            <label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Locality:</label>
            <input type="text" onChange={(e) => setGroup({...group,locality:e.target.value})} value={group.locality}/>

            <button className={styles.btnsub} type="button" onClick={createGroups} >Save</button>
      </div>
      <p></p>
      <table>
        <thead>
            <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Account</th>
            <th>Size</th>
            <th>Locality</th>
            <th></th>
            </tr>
        </thead>
        <tbody>
            {groups.map((value,index) => (
             <tr>
            <td>{value.groupName}</td>
            <td>{value.groupType}</td>
            <td>{value.bankAccount}</td>
            <td>{value.maxMembers}</td>
            <td>{value.locality}</td>
            <td><button className={styles.btnsub} type="button" onClick={() => fetchMembers(value.groupId)}>Members</button>
            </td>
             </tr>


            ))}
        </tbody>
      </table>

      <p></p>

      <div>

<input type="hidden" value={member.memberId}/>
<input type="hidden" value={selected}/>

<label>Member Name:</label>
<input type="text" onChange={(e) => setMember({...member,name:e.target.value})} value={member.name}/>

<label>Id No:</label>
<input type="text" onChange={(e) => setMember({...member,idNo:e.target.value})} value={member.idNo}/>

   <label>Phonenumber:</label>
   <input type="text" onChange={(e) => setMember({...member,phoneNumber:e.target.value})} value={member.phoneNumber}/>

   <label>D.O.B:</label>
   <input type="text" onChange={(e) => setMember({...member,birthDate:e.target.value})} value={member.birthDate}/>
</div>
<div>
   <label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Email:</label>
   <input type="text" onChange={(e) => setMember({...member,email:e.target.value})} value={member.email}/>

   <button className={styles.btnsub} type="button" onClick={createMembers} >Save</button>
</div>

<p></p>
<table>
        <thead>
            <tr>
            <th>Name</th>
            <th>ID No.</th>
            <th>Phone number</th>
            <th>Email</th>
            <th>Created Date</th>
            </tr>
        </thead>
        <tbody>
            {members.map((value,index) => (
             <tr>
            <td>{value.name}</td>
            <td>{value.idNo}</td>
            <td>{value.phoneNumber}</td>
            <td>{value.email}</td>
            <td>{value.dateCreated}</td>
             </tr>


            ))}
        </tbody>
      </table>
        </>

    )

}