import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "./Navbar";

const Leavepermission = () => {
  const [id,setempid]=useState("");
  const [date, setDate] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [leaveType, setLeaveType] = useState("full");
  const [reason, setReason] = useState("");
  const [leaveDifference, setLeaveDifference] = useState(0);

  const object = { id,date, fromDate, toDate, leaveType, reason };

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  const countWorkingDays = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    let count = 0;
    let current = start;

    while (current <= end) {
      const day = current.getDay();
      if (day !== 0 && day !== 6) {
        // Exclude weekends (Saturday and Sunday)
        count++;
      }
      current.setDate(current.getDate() + 1);
    }

    return count;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate empid in db.json
    fetch(`http://localhost:8000/user/${id}`)
      .then((res) => res.json())
      .then((userData) => {
        if (!userData || Object.keys(userData).length === 0) {
          toast.error("Invalid empid");
          return;
        }

        const applyingDate = new Date(date);
        const fromDateObj = new Date(fromDate);
        const toDateObj = new Date(toDate);
        const differenceInTime = toDateObj.getTime() - fromDateObj.getTime();
        const differenceInDays1 = Math.ceil(differenceInTime / (2 * 1000 * 3600 * 24));
        const currentDate = new Date();
        const differenceInDays = countWorkingDays(fromDate, toDate);

        setLeaveDifference(Math.max(0, differenceInDays));

        if (differenceInDays1 < 0) {
          alert("Please select a 'To' date that is after or the same as the 'From' date.");
          return;
        }
        if (applyingDate < currentDate) {
          alert("Please select a date after or the same as the current date.");
          return;
        }

        // Proceed with leave submission and show success message
        fetch("http://localhost:3000/posts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(object),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data); // The response from the server
            const phoneNumber = "+919710087209";
            const message = `Leave Details:\nFrom: ${fromDate}\nTo: ${toDate}\nNumber of Leave Days: ${differenceInDays}\nReason: ${reason}`;
            const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
              message
            )}`;
            window.open(whatsappLink);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <Navbar />
      <div>
        <h2 style={{ textAlign: "center", color: "white" }} className="bg-dark">
          Leave Application
        </h2>
      </div>
      
      <div className="container">
        <form onSubmit={handleSubmit}>

        <div className="row">
            <div className="form-group col-md-3">
              <label className="form-label">enter your Emp ID:</label>
              <input
                required
                type="text"
                value={id}
                onChange={(e) => setempid(e.target.value)}
                className="form-control"
              />
            </div>
          </div>


          <div className="row">
            <div className="form-group col-md-3">
              <label className="form-label">Applying Date:</label>
              <input
                required
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="form-control"
              />
            </div>
          </div>

          <div className="row">
            <div className="form-group col-md-3">
              <label>from:</label>
              <input
                required
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="form-control"
              />
            </div>

            <div className="form-group col-md-3">
              <label>To:</label>
              <input
                required
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="form-control"
              />
            </div>
          </div>

          <div className="row">
            <div className="form-group col-md-3">
              <label>Leave type:</label>
              <select
                className="form-control"
                value={leaveType}
                onChange={(e) => setLeaveType(e.target.value)}
              >
                <option>full day</option>
                <option>half day</option>
              </select>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-8">
              <label>Reason for leave:</label>
              <br />
              <textarea
                required
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
              <br />
              <button className="btn btn-primary">submit</button>
            </div>
          </div>
        </form>

        <div className="row">
          <div className="col-lg-8">
            <label>Leave Difference:</label>
            <h2>
              <span>
                {leaveDifference > 0
                  ? leaveDifference + " working days"
                  : "0 working days"}
              </span>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leavepermission;