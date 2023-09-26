import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import { useStateProvider } from "../utils/StateProvider"
import Swal from 'sweetalert2'

function View(props) {
    const [DateOfInfusion, setDateOfInfusion] = useState("")
    const [ReasonForTreatment, setReasonForTreatment] = useState("")
    const [FactorManufacturer, setFactorManufacturer] = useState("")
    const [LotNumber, setLotNumber] = useState("")
    const [ExpirationDate, setExpirationDate] = useState("")
    const [QuantityInfuse, setQuantityInfuse] = useState("")
    const [InfusionSite, setInfusionSite] = useState("")
    const [{user}] = useStateProvider()

    useEffect(() => {
       const getData = async () => {
        try
        {
          const token_ = Cookies.get("token")
            const response = await axios.get("https://sleepy-seal-sari.cyclic.cloud/api/v1/view", {params:{_id: props.ID, UserID: user[0]._id},headers: {
              Authorization: `Bearer ${token_}`
            }})
            if(response.status === 200){
                setDateOfInfusion(response.data.response[0].DateOfInfusion)
                setReasonForTreatment(response.data.response[0].ReasonForTreatment)
                setFactorManufacturer(response.data.response[0].Factor.FactorManufacturer)
                setLotNumber(response.data.response[0].Factor.LotNumber)
                setExpirationDate(response.data.response[0].Factor.ExpirationDate)
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
        catch(err)
        {
            console.log("Something went wrong",err)
        }
       }
       getData()
    },[])
    const ConvertDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
        const formattedDate = new Date(dateString).toLocaleString('en-US', options);
        return formattedDate;
      }
      const DateFormatter = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric'};
        const formattedDate = new Date(dateString).toLocaleString('en-US', options);
        return formattedDate;
      }
  return (
    <div className={props.show ? "ModalContainer Show" : "ModalContainer"}>
    <div className="ModalWrapper">
      <div className="Modal">
      <header>
            <h3>View</h3>
        </header>
        <form>
            <div className="RowContainer">
            <div className="ColumnContainer">
            <label>Date of infusion</label>
            <input type="text" value={ConvertDate(DateOfInfusion)} disabled/>
            </div>
            </div>
            <div className="RowContainer">
            <div className="ColumnContainer">
            <label>Factor</label>
            <input type="text"  value={FactorManufacturer} disabled/>
            </div>
            <div className="ColumnContainer">
            <label>Lot #</label>
            <input type="text"  value={LotNumber} disabled/>
            </div>
            <div className="ColumnContainer">
            <label>Exp Date</label>
            <input type="text" value={DateFormatter(ExpirationDate)} disabled/>
            </div>
            </div>
            <div className="RowContainer">
            <div className="ColumnContainer">
            <label>Reason for treatment</label>
            <input type="text"  value={ReasonForTreatment}  disabled/>
            </div>
            </div>
            <div className="RowContainer">
            <div className="ColumnContainer">
            <label>Quantity infuse</label>
            <input type="text" value={`${QuantityInfuse} IU`} disabled/>
            </div>
            </div>
            <div className="RowContainer">
            <div className="ColumnContainer">
            <label>Infuse Site</label>
            <input type="text" value={InfusionSite} disabled/>
            </div>
            </div>
            <footer>
                <button type="button" onClick={props.onHide}>Close</button>
            </footer>
        </form>
      </div>
    </div>
   </div>
  )
}

export default View
