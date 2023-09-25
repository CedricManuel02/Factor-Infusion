const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
require('dotenv').config()

const CreateService = require('../services/Create')
const RetrieveService = require('../services/Retrieve')
const UpdateServices = require('../services/Update')
const DeleteService = require('../services/Delete')
const ListService = require('../services/List')
const RegisterService = require('../services/Register')
const EmailService = require('../services/CheckEmail')

// * Generated Salt
const salt = bcrypt.genSaltSync(12)

// * Verification of token 
const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403)
      req.user = user
      next() 
    })
}
// * Api for CRUD operations
router.post("/create", authenticateToken, async (req, res) => {
    try
    {
     const {DateOfInfusion,UserID, ReasonForTreatment, FactorManufacturer, LotNumber, ExpirationDate, QuantityInfuse, InfusionSite} = req.body
     console.log(UserID)
     console.log(DateOfInfusion, ReasonForTreatment, FactorManufacturer, LotNumber, ExpirationDate, QuantityInfuse, InfusionSite)
     const Factor = {
        FactorManufacturer,
        LotNumber,
        ExpirationDate
     }
     const response = await CreateService(DateOfInfusion, UserID ,Factor, ReasonForTreatment, QuantityInfuse, InfusionSite)
     if(response){
        res.sendStatus(200).json({
            response: response,
            message: "Successfully created"
        })
     }
     else{
        res.sendStatus(401).json({
            response: response,
            message: "Something went wrong"
        })
     }
    }
    catch(err){
        console.log(err)
    }
})
router.delete("/delete",authenticateToken, async (req, res) => {
    try{
        const {_id} = req.query
        const response = await DeleteService(_id)
        if(response){
            res.sendStatus(200).json({
                response: response,
                message: "Successfully deleted"
            })
        }
        else{
            res.sendStatus(401).json({
                message: "Something went wrong"
            })
        }
    }
    catch(err){
        console.log("Something went wrong", err)
    }
})
router.get("/view", authenticateToken,async (req, res) => {
    try{
        const {_id, UserID} = req.query
        const response = await RetrieveService(_id, UserID)
        if(response.length > 0){
            res.status(200).json({
                response: response,
                message: "Successfully Retrieve"
            })
        }
        else{
            res.status(401).json({
                response: response,
                message: "Something went wrong"
            })
        }
    }
    catch(err){
        console.log("Something went wrong", err)
    }
})
router.post("/update", authenticateToken,async (req, res) => {
    try{
        const {_id, set} = req.body
        const response = await UpdateServices(_id, set)
        if(response){
            res.status(200).json({
                response: response,
                message: "Successfully updated"
            })
        }
        else{
            res.status(401).json({
                message: "Something went wrong"
            })
        }
    }
    catch(err){
        console.log("Something went wrong", err)
    }
})
router.get("/list", authenticateToken, async (req, res) => {
    try{
        const {UserID} = req.query
        const response = await ListService(UserID)
        res.send(response)
  }
    catch(err){
        console.log("Something went wrong", err)
    }
})

// * Api for creating a new user
const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}
router.post("/register", async (req, res) =>{
    try {
      const {FullName, Email, Password, Hemophilia, Severity, HasInhibitor} = req.body
      const HemophiliaDiagnosis = ["Hemophilia A", "Hemophilia B", "Von Willebrand"]
      const HemophiliaInhibitor = ["Have Inhibitor", "Don't have Inhibitor"]
      const HemophiliaSeverity = ["Mild", "Moderate", "Severe"]
      const response = await EmailService(Email)
        if(response.length <= 0){
            if (!validateEmail(Email)) {
                return res.status(400).json({ message: "Invalid email format"})
              }
              if (!HemophiliaDiagnosis.includes(Hemophilia) || !HemophiliaSeverity.includes(Severity) || !HemophiliaInhibitor.includes(HasInhibitor)) {
                return res.status(400).json({ message: "Invalid parameter values"})
              }
              const Diagnosis = {Hemophilia,Severity,HasInhibitor}
              const DateCreated = new Date()
              const isVerified = 0
              const hashPassword = bcrypt.hashSync(Password, salt)
              const response = await RegisterService(FullName, Email, hashPassword, Diagnosis, isVerified, DateCreated)
              if(response){
                return res.status(200).json({ message: "Successfully Registered"})
              }
              else{ 
                return res.status(401).json({ message: "Something went wrong"})
              }
        }
        else{
            return res.status(400).json({ message: "Email already registered"})
        }
    } catch(err) {
      console.log("Something went wrong", err)
      res.status(500).json({ message: "Internal server error" })
    }
})
router.post("/login", async(req, res) => {
    try{
        const {Email, Password} = req.body
        const response = await EmailService(Email)
        if(response.length > 0) {
            const hashPassword = bcrypt.compareSync(Password, response[0].Password)
            const user = {_id: response[0]._id, FullName: response[0].FullName}
            if(hashPassword){
                jwt.sign(user, process.env.ACCESS_TOKEN_SECRET,{}, (err, token) => {
                    if(err) throw err
                    res.status(200).cookie("token", token).json({response: user ,message: "Successfully signed in"})
                })
            }
            else{
                    res.status(422).json({ message: 'Invalid credentials' })
            }
        }
        else 
        {
            res.status(409).json({ message: 'Email Does not exists' })
        }

    }   
    catch(err){
        console.log("Something went wrong", err)
        res.status(500).json({ message: 'Server error' })
    }
})
router.get("/user",authenticateToken, async (req, res) => {
    try{
        res.json({ message: 'Access granted', user: req.user })
    }
    catch(err){
        console.log("Something went wrong", err)
    }
})
module.exports = router