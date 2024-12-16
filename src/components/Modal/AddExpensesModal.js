import React, { useState } from "react";
import "./AddExpensesModal.css";

const AddExpenseModal = ({ isOpen, onClose }) => {
//   if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Add Expenses</h2>
        <form>
          <div className="form-group">
            <input type="text" placeholder="Title" />
            <input type="number" placeholder="Price" />
          </div>
          <div className="form-group">
            <select>
              <option value="" disabled selected>
                Select Category
              </option>
              <option value="food">Food</option>
              <option value="transport">Transport</option>
              <option value="utilities">Utilities</option>
              {/* Add more categories as needed */}
            </select>
            <input type="date" />
          </div>
          <div className="buttons">
            <button type="submit" className="add-btn">Add Expense</button>
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddExpenseModal;
