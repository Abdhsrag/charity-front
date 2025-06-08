import React,{useState} from "react";
import './ContactUs.css'


const ContactUs= () =>{
    const[formdata,setformdata]=useState(
        {
            name:'',
            email:'',
            message:''
        }
    );


const[status,setstatus]=useState("");

const[selectquestion,setselectquestion]=useState([]);


 const questions = [
    {
    question:"How can I do donation?",
    answer: "You can donate through our website using the 'Donate' button or by contacting us directly."
    },
    {
    question:"What programs do you offer?",
      answer: "We offer a variety of community support, educational, and volunteering programs."
    },
    {
     question: "How can I volunteer?",
    answer: "Simply fill out our volunteer application form or contact us for more details."
    }
  ];


const Change=(e)=>{
    setformdata(
        {
            ...formdata,
            [e.target.name]:e.target.value
        }
    );
};

const handlequestion=(question)=>{ 
setselectquestion((pre)=>
pre.includes(question)? pre.filter((q)=>q!==question):[...pre,question]);
};




const Submit=(e)=>{
    e.preventDefault();
    console.log("Form Data Submitted:",formdata)
    console.log("select Questions :",selectquestion);
    setstatus('Thx! your message has been received. ');
    setformdata({name:"",email:"",message:""});
    setselectquestion([])
};
return(
    <div className="container">

    <div className="questions">
         <h1 className="header">Help Center</h1>
         <p className="text1">find answers to common questions or contact us for assistance</p>
         <br/>
         <br/>

         <h2>Frequently Asked Questions</h2>
         {
            questions.map(({question,answer},index) => (
                <div className="qitem" key={index}>
                    <label onClick={()=>handlequestion(question)} className="questionlab">
                    <input type="checkbox" checked={selectquestion.includes(question)}readOnly  style={{ marginRight: "8px" }}/>{question}
                    </label>
                    {selectquestion.includes(question) && <p className="answer">{answer}</p>}
</div> 
))}
</div>
<div className="section">
    <h2>ContactUs</h2>
    <p>if you have any other questions or need further assintance,please contact us using the form below</p>
    <form onSubmit={Submit} className="form">
        <input type="text" name="name" placeholder="Enter your name" value={formdata.name} onChange={Change} required className="input"/>
        <input type="email" name="email" placeholder="Enter your email" value={formdata.email} onChange={Change} required className="input"/>
        <textarea name="message" placeholder="Enter your message" value={formdata.message} onChange={Change} required className="textarea"/>
        <button type="submit" className="btn">Send</button>
    </form>
     {status && <p className="status">{status}</p>}
     <footer/>
    </div>
</div>
);
};


export default ContactUs;






