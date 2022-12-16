import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Chart from '../../components/chart/Chart'
import "./single.scss"
import List from '../../components/table/Table'


const Single = () => {
  return (
    <div className='single'>
      <Sidebar />
      <div className='singleContainer'>
        <Navbar />
     
        <div className='top'>
          <div className='left'>
            <div className='editButton'>Edit</div>

            <h1 className='title'>Information</h1>
            <div className='item'>
              <img src='https://cdn2.f-cdn.com/files/download/42274758/bcb1c5.jpg' alt='' className='itemImg' />
              <div className="details">

                <h1 className="itemTitle"> John Deo</h1>
                <div className="detailItem">
                  <span className="itemKey"> Email :</span>
                  <span className="itemValue"> johndeo@gmail.com</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey"> Phone :</span>
                  <span className="itemValue"> +91 227 5959</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey"> Address :</span>
                  <span className="itemValue"> Palroad surat</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey"> Country :</span>
                  <span className="itemValue"> INDIA</span>
                </div>
              </div>
            </div>
          </div>
          <div className='right'>

            <Chart aspect={3/1} title="User Spending (Last 6 Months)"/>
          </div>
        </div>
        <div className='bottom'>
        <h1 className='title'>Last Transcation</h1>
          <List/>
        </div>

      </div>

    </div>
  )
}

export default Single
