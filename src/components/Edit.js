import axios from "axios"
import Cookies from "js-cookie"
import React, { useEffect, useState } from "react"
import Swal from 'sweetalert2'
import { useStateProvider } from "../utils/StateProvider"
function Edit(props) {
    const [_id, setID] = useState("")
    const [DateOfInfusion, setDateOfInfusion] = useState("")
    const [ReasonForTreatment, setReasonForTreatment] = useState("")
    const [FactorManufacturer, setFactorManufacturer] = useState("")
    const [LotNumber, setLotNumber] = useState("")
    const [ExpirationDate, setExpirationDate] = useState("")
    const [QuantityInfuse, setQuantityInfuse] = useState("")
    const [InfusionSite, setInfusionSite] = useState("")
    const [{user}] = useStateProvider()
    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const token_ = Cookies.get("token")
            const Factor = {
             FactorManufacturer,
             LotNumber,
             ExpirationDate
            }
            const response = await axios.post("http://localhost:3001/api/v1/update", 
            {"_id": {_id} ,
            "set": { DateOfInfusion, ReasonForTreatment, Factor, QuantityInfuse, InfusionSite}}, 
            {headers: {
              Authorization: `Bearer ${token_}`
            }})
            if(response.status === 200){
                setDateOfInfusion("")
                setReasonForTreatment("")
                setFactorManufacturer("")
                setLotNumber("")
                setExpirationDate("")
                setQuantityInfuse("")
                setInfusionSite("")
                Swal.fire({
                    icon: 'success',
                    title: 'Succesfully Updated',
                    confirmButtonText: 'Close',
                  }).then((result) => {
                    if (result.isConfirmed) {
                      props.onHide()
                    }
                  })
            }
            else{
                console.log("Something went wrong")
            }
        }
        catch(err){
            console.log(err)
        }
    }
    useEffect(() => {
        const getData = async () => {
            try{
                const token_ = Cookies.get("token")
                const response = await axios.get("http://localhost:3001/api/v1/view", {params:{_id: props.ID, UserID: user[0]._id}, 
                    headers: {
                      Authorization: `Bearer ${token_}`
                    }
                  })
                if(response.status === 200){
                    const localDate = new Date(response.data.response[0].DateOfInfusion);
                    const formattedDate = localDate.toISOString().slice(0, 16);
                    const localExpirationDate = new Date(response.data.response[0].Factor.ExpirationDate);
                    const formattedExpirationDate = localExpirationDate.toISOString().slice(0, 10);
                    setID(response.data.response[0]._id)
                    setDateOfInfusion(formattedDate)
                    setReasonForTreatment(response.data.response[0].ReasonForTreatment)
                    setFactorManufacturer(response.data.response[0].Factor.FactorManufacturer)
                    setLotNumber(response.data.response[0].Factor.LotNumber)
                    setExpirationDate(formattedExpirationDate)
                    setQuantityInfuse(response.data.response[0].QuantityInfuse)
                    setInfusionSite(response.data.response[0].InfusionSite)
                
                }
                else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                        footer: '<a href="">Why do I have this issue?</a>'
                      })
                }
            }
            catch(err){
                console.log("Something went wrong",err)
            }
        }
        getData()
    },[])
  
  return (
   <div className={props.show ? "ModalContainer Show" : "ModalContainer"}>
    <div className="ModalWrapper">
      <div className="Modal">
      <header>
            <h3>Update</h3>
        </header>
        <form onSubmit={handleSubmit}>
            <div className="RowContainer">
            <div className="ColumnContainer">
            <label>Date of infusion</label>
            <input type="datetime-local" value={DateOfInfusion} onChange={e => setDateOfInfusion(e.target.value)} required/>
            </div>
            </div>
            <div className="RowContainer">
            <div className="ColumnContainer">
            <label>Factor</label>
            <input type="text" placeholder="Ex. Griffols" value={FactorManufacturer} onChange={e => setFactorManufacturer(e.target.value)} required/>
            </div>
            <div className="ColumnContainer">
            <label>Lot #</label>
            <input type="text" placeholder="Ex. PB ####" value={LotNumber} onChange={e => setLotNumber(e.target.value)} required/>
            </div>
            <div className="ColumnContainer">
            <label>Exp Date</label>
            <input type="date" value={ExpirationDate} onChange={e => setExpirationDate(e.target.value)} required/>
            </div>
            </div>
            <div className="RowContainer">
            <div className="ColumnContainer">
            <label>Reason for treatment</label>
            <input type="text" placeholder="Ex. Iliopsoas Bleed" value={ReasonForTreatment} onChange={e => setReasonForTreatment(e.target.value)} required/>
            </div>
            </div>
            <div className="RowContainer">
            <div className="ColumnContainer">
            <label>Quantity infuse</label>
            <input type="number" placeholder="Ex. 250 IU" value={QuantityInfuse} onChange={e => setQuantityInfuse(e.target.value)} required/>
            </div>
            </div>
            <div className="RowContainer">
            <div className="ColumnContainer">
            <label>Infuse Site</label>
            <select value={InfusionSite} onChange={e => setInfusionSite(e.target.value)}>
                <option defaultValue={""}>Select</option>
                <option value={"Home"}>Home</option>
                <option value={"Hospital"}>Hospital</option>
                <option value={"Clinic"}>Clinic</option>
            </select>
            </div>
            </div>
            <footer>
                <button type="button" onClick={props.onHide}>Close</button>
                <button type="submit">Update</button>
            </footer>
        </form>
      </div>
    </div>
   </div>
  );
}

export default Edit