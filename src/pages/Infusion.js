import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Modals from '../components/Modal'
import axios from 'axios'
import Swal from 'sweetalert2'
import View from '../components/View'
import Edit from '../components/Edit'
import Cookies from 'js-cookie'
import { useStateProvider } from '../utils/StateProvider'
import * as XLSX from 'xlsx/xlsx.mjs';
function Infusion() {
  const [modalShow, setModalShow] = useState(false)
  const [viewShow, setViewShow] = useState(false)
  const [editShow, setEditShow] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const [sortOption, setSortOption] = useState("")
  const [ID, setID] = useState("")
  const [list, setList] = useState([])
  const [defaultList, setDefault] = useState([])
  const textLength = 15
  const [{user},dispatch] = useStateProvider()
  const navigate = useNavigate()
  useEffect(() => {
    const token_ = Cookies.get("token")
    if(token_ || user.length > 0){
      const getData = async () => {
        try{
        const { data } = await axios.get("https://mongo-db-hfbboczai-cedricmanuel02-gmailcom.vercel.app/api/v1/list",{params: { UserID: user[0]._id  }, headers: { Authorization: `Bearer ${token_}` }})
        setList(data)
        setDefault(data)
        }
        catch(err){
            console.log("Something went wrong", err)
        }
    }
    getData()
    }
    else{
    navigate("/")
    }
  },[user, refresh, dispatch])
  const handleDelete = async (_id) => {
    const token_ = Cookies.get("token")
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await axios.delete("https://mongo-db-hfbboczai-cedricmanuel02-gmailcom.vercel.app/api/v1/delete", {params:{ _id }, 
          headers: {
            Authorization: `Bearer ${token_}`
          }
        })
        if(response){
          Swal.fire({
            icon: 'success',
            title: 'Succesfully deleted',
            confirmButtonText: 'Close',
          }).then((result) => {
            if (result.isConfirmed) {
             refresh ?  setRefresh(false) :  setRefresh(true)
            }
          })
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
    })
  }
  const handleView = (_id) => {
    setID(_id)
    setViewShow(true)
  }
  const handleEdit = (_id) => {
    setID(_id)
    setEditShow(true)
  }
  const ConvertDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true }
    const formattedDate = new Date(dateString).toLocaleString('en-US', options)
    return formattedDate
  }
  const DateFormatter = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric'}
    const formattedDate = new Date(dateString).toLocaleString('en-US', options)
    return formattedDate
  }
  const handleSort = (e) => {
    setSortOption(e)
    if (e === "") {
      setList(defaultList)
      return
    }
    let sortedList = [...list]
    switch (e) {
      case "date":
        sortedList.sort((a, b) => new Date(b.DateOfInfusion) - new Date(a.DateOfInfusion))
        break
      case "factor":
        sortedList.sort((a, b) => a.Factor.FactorManufacturer.localeCompare(b.Factor.FactorManufacturer))
        break
      case "IU":
        sortedList.sort((a, b) => a.QuantityInfuse - b.QuantityInfuse)
        break
      default:
        break
    }
    setList(sortedList)
  }
  const handleModalHide = () => {
    setModalShow(false)
    refresh ?  setRefresh(false) :  setRefresh(true)
  }
  const handleEditHide = () => {
    setEditShow(false)
    refresh ?  setRefresh(false) :  setRefresh(true)
  }
  const handleExport = () => {
    const wb = XLSX.utils.book_new()
    const ws = XLSX.utils.json_to_sheet(list)
    XLSX.utils.book_append_sheet(wb, ws, "InfusionLog")
    XLSX.writeFile(wb, "InfusionLog.xlsx")
  }

  return (
    <>
       <Modals
        show={modalShow}
        onHide={handleModalHide}
      />
     {viewShow ? <View ID={ID} show={viewShow} onHide={() => setViewShow(false)}/> : null}
     {editShow ? <Edit ID={ID} show={editShow} onHide={handleEditHide}/> : null}
    <div className="InfusionContainer">
      <div className="InfusionWrapper">
      <header>
        <h2>Review your Infusion Log</h2>
        <p>This page helps the hemophilia person to record their infusion session through online.</p>
        <section>
        <select value={sortOption} onChange={(e) => handleSort(e.target.value)}>
            <option value="">Sort By</option>
            <option value="date">Sort by date</option>
            <option value="factor">Sort by Factor</option>
            <option value="IU">Sort by IU</option>
        </select>
        <button onClick={handleExport}>Export</button>
        <button onClick={() => setModalShow(true)}>Add</button>
    </section>
      </header>
    <div className="TableContainer">
    <table>
            <thead>
                <tr>
                    <th>Date and Time</th>
                    <th>Factor</th>
                    <th>Reason for Treatment</th>
                    <th>Quantity Infuse</th>
                    <th>Infusion Site</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
              { list && list.length > 0 ?<>
                {list && list.map(item => (
                  <tr key={item._id}>
                  <td>{ConvertDate(item.DateOfInfusion)}</td>
                  <td>
                      <div className="FactorContainer">
                          <p><b>Product Name/Mfg:</b>{item.Factor.FactorManufacturer}</p>
                          <p><b>Lot Number:</b>{item.Factor.LotNumber}</p>
                          <p><b>Expiration Date:</b>{DateFormatter(item.Factor.ExpirationDate)}</p>
                      </div>
                  </td>
                  <td>{item.ReasonForTreatment.length > textLength ? `${item.ReasonForTreatment.slice(0, textLength)}...` : item.ReasonForTreatment}</td>
                  <td>{item.QuantityInfuse} IU</td>
                  <td>{item.InfusionSite}</td>
                  <td>
                     <Link onClick={() => handleView(item._id)}>View</Link> 
                     <Link onClick={() => handleEdit(item._id)}>Edit</Link> 
                     <Link onClick={() => handleDelete(item._id)}>Delete</Link> 
                  </td>
              </tr>
              ))} 
              </> : <tr>
                  <td colSpan={6}><p>No Data</p></td>
                </tr>}
            </tbody>
        </table>
    </div>
      </div>
    </div>
    </>
  
  )
}

export default Infusion
