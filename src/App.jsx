import { useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseTable from "./components/ExpenseTable";
import SearchBar from "./components/SearchBar";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState(""); 
  
  const handleAddExpense = (newExpense) => {
    setExpenses([...expenses, newExpense]);
  };

  const handleDelete = (indexToDelete) => {
    setExpenses(expenses.filter((_, index) => index !== indexToDelete));
  };

  
  const filteredExpenses = expenses.filter(
    (expense) =>
      expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  
  const sortedExpenses = filteredExpenses.sort((a, b) => {
    if (sortBy === "description") {
      return a.description.localeCompare(b.description);
    } else if (sortBy === "category") {
      return a.category.localeCompare(b.category);
    }
    return 0; 
  });

  return (
    <div>
      <h1>Expense Tracker</h1>
      
      {/* Sort Dropdown */}
      <div>
        <label>Sort By: </label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="">None</option>
          <option value="description">Description</option>
          <option value="category">Category</option>
        </select>
      </div>
      
      
      <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
      
      
      <ExpenseForm onAddExpense={handleAddExpense} />
      
     
      <ExpenseTable expenses={sortedExpenses} onDelete={handleDelete} />
    </div>
  );
}

export default App;
