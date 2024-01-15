import React from 'react'

const DetailsSection = () => {
  return (
    <section className="border border-black w-[300px]">
      <div id="otherprofile">
        <div>
          <div className="w-[108px] h-[108px] rounded-full overflow-hidden text-center">
          <img src="https://img.freepik.com/free-photo/young-woman-with-round-glasses-yellow-sweater_273609-7091.jpg?size=626&ext=jpg&ga=GA1.1.2058463804.1704785941&semt=ais" alt="" className="res-img" />
          </div>
          <h3>Kierra McAdams</h3>
          <p>Co-founder @ Coffee Country</p>
        </div>
      </div>
      <div id="otherfiles"></div>
      <div id="options"></div>
    </section>
  )
}

export default DetailsSection