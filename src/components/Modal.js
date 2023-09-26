import axios from "axios"
import { useState } from "react"
import Swal from 'sweetalert2'
import { useStateProvider } from "../utils/StateProvider"
import Cookies from "js-cookie"
function Modals(props) {
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
            const UserID = user[0]._id
            const token_ = Cookies.get("token")
            const response = await axios.post("/create", 
            {DateOfInfusion, UserID, ReasonForTreatment, FactorManufacturer, LotNumber, ExpirationDate, QuantityInfuse, InfusionSite}, {
              headers: {
                Authorization: `Bearer ${token_}`
              }
            })
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
                    title: 'Succesfully Added',
                    confirmButtonText: 'Close',
                  }).then((result) => {
                    if (result.isConfirmed) {
                      props.onHide()
                    }
                  })
            }
            else{
              Swal.fire({
                icon: 'error',
                title: 'Something went wrong pls try again',
                confirmButtonText: 'Close',
              }).then((result) => {
                if (result.isConfirmed) {
                  props.onHide()
                }
              })
            }
        }
        catch(err){
            console.log(err)
        }
    }
  return (
   <div className={props.show ? "ModalContainer Show" : "ModalContainer"}>
    <div className="ModalWrapper">
      <div className="Modal">
      <header>
            <h3>Add a log</h3>
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
                <button type="submit">Add</button>
            </footer>
        </form>
      </div>
    </div>
   </div>
  );
}

export default Modals
