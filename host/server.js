const express = require ("express")
// const fs = require("fs")
// const {writeFile}=require("../module/module")
const company = require("../data/info.json")
const port = 4444

const app = express()
app.use(express.json())


app.get("/",(req, res)=>{
   res.json({message:"companies performance data"})
})
 app.get("/companyInfo",(req,res)=>{
    try {
        if(company.length< 1){
            res.json({message:"companoes data is empty"})
        }else{
            res.status(200).json({message:"companies performance data", data:company})
        }
    } catch (error) {
        console.log(error.message)
    }
 })
 // get one studenty each by id
 //steps:first get the id , get object of the id , valifdtae the id with if conditions
 app.get("/companyInfo/:id",(req, res)=>{
   
     try {
        const id =parseInt(req.params.id)

        const companie =company.find((el) =>el.id===id)

         if(!id){
             res.status(404).json({message:"id doesnt exit"})
         }else{
           res.status(200).json({message:"candidate selected by id", data:companie})
         }
     } catch (error) {
         console.log(error)
     }

 })

 // cfreate one
//do an instance of the daa and push
 app.post('/companyInfo',(req,res)=>{
   try {
  const newCompany={

    id:company.length+1,
    name:req.body.name,
    location:req.body.location,
    services:req.body.services,
    ratings:{
      transparency:req.body.transparency,
      exprience:req.body.exprience,
      professionalism:req.body.professionalism
  }
   }
   company.push(newCompany)
    //  writeFile("../data/info.json", JSON.stringify(company))

   res.status(200).json({message:"company succesfully created", data:newCompany})
   } catch (error) {
       console.log(error)
   }

 })

 //update

 app.patch("/companyInfo/:id",(req,res)=>{
    try {
        const id =parseInt(req.params.id)

        const companieId =company.find((de) =>de.id===id)
        //update the firlds of the company with id found in  the array
        

          
            companieId.name=req.body.name,
            companieId.location=req.body.location,
            companieId.services=req.body.services,
            companieId.transparency=req.body.transparency,
            companieId.exprience=req.body.exprience,
            companieId.professionalism=req.body.professionalism
    //  writeFile("../data/info.json", JSON.stringify(company))
          
           res.status(200).json({message:"updated data", data:companieId})
        
    } catch (error) {
        console.log(error)
        
    }
 })
 app.delete ("/companyInfo/:id",(req, res)=>{
     try {
         const id = parseInt(req.params.id)
        const companieId =company.find((de) =>de.id===id)
         if(!id){
             res.json({message:`invalid id number ${req.params.id}`})
         }else{
             const index = company.indexOf(companieId)
         }
     } catch (error) {
         console.log(error)
     }
 })







app.listen(port,()=>{
    console.log(`listening to ${port}`)
})