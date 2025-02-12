import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import "./App.css";

const App = () => {
  const totalSeats = 50;
  const [seatsLeft, setSeatsLeft] = useState(50);
  const [reservations, setReservations] = useState([]);
  const [guestCount, setGuestCount] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleReservation = (e) => {
    e.preventDefault();
    if (guestCount > seatsLeft) {
      alert("Not enough seats available.");
      return;
    }

    const newReservation = {
      name,
      phone,
      checkIn: new Date().toLocaleString(),
      checkOut: null,
      guestCount: parseInt(guestCount),
    };

    setReservations([...reservations, newReservation]);
    setSeatsLeft(seatsLeft - guestCount);

    setGuestCount("");
    setName("");
    setPhone("");
  };

  const handleCheckout = (index) => {
    const updatedReservations = [...reservations];
    
    // Only update if not already checked out
    if (!updatedReservations[index].checkOut) {
      updatedReservations[index].checkOut = new Date().toLocaleString();
  
      // Update seats left
      setSeatsLeft(seatsLeft + updatedReservations[index].guestCount);
    }
  
    setReservations(updatedReservations);
  };
  

  const handleDelete = (index) => {
    const deletedGuests = reservations[index].guestCount;
    const updatedReservations = reservations.filter((_, i) => i !== index);
    setReservations(updatedReservations);
    setSeatsLeft(seatsLeft + deletedGuests);
  };

  // Data for Pie Chart
  const chartData = [
    { name: "Seats Taken", value: totalSeats - seatsLeft },
    { name: "Seats Left", value: seatsLeft },
  ];

  const COLORS = ["#FA721DFF", "#28A745"];

  return (
    <div>
      {/* Header Bar */}
      <header className="header-bar">
        <h1>Restaurant Reservation System</h1>
      </header>

      <div className="container">
        {/* Pie Chart and Tags */}
        <div className="chart-section">
          <div className="chart-container">
            <PieChart width={300} height={300}>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>

          {/* Tags Displaying Seat Numbers */}
          <div className="seat-tags">
            <div className="tag total">
              <span>Total Seats:</span> <strong>{totalSeats}</strong>
            </div>
            <div className="tag taken">
              <span>Seats Taken:</span> <strong>{totalSeats - seatsLeft}</strong>
            </div>
            <div className="tag left">
              <span>Seats Left:</span> <strong>{seatsLeft}</strong>
            </div>
          </div>
        </div>

        {/* Reservation Form */}
        <form onSubmit={handleReservation} className="reservation-form">
          <input
            type="number"
            value={guestCount}
            onChange={(e) => setGuestCount(e.target.value)}
            placeholder="Guest Count"
            min="1"
            max={seatsLeft}
            required
          />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
          />
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone Number"
            required
          />
          <button type="submit">Reserve</button>
        </form>

        {/* Reservations Table */}
        <table className="reservation-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Check-In</th>
              <th>Check-Out</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reservations.length > 0 ? (
              reservations.map((reservation, index) => (
                <tr key={index}>
                  <td>{reservation.name}</td>
                  <td>{reservation.phone}</td>
                  <td>{reservation.checkIn}</td>
                  <td>
                    {reservation.checkOut ? reservation.checkOut : "Not Checked Out"}
                  </td>
                  <td>
                    {!reservation.checkOut && (
                      <button onClick={() => handleCheckout(index)}>Checkout</button>
                    )}
                    <button onClick={() => handleDelete(index)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No Reservations</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
