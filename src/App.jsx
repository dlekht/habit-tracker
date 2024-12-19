import {useState, useEffect} from 'react'
import HabitList from './HabitList'
import AddHabitForm from './AddHabitForm'
import EditHabitForm from './EditHabitForm'

function App() {

  const [isAddFormOpen, setAddFormOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState(null);


  const [habits, setHabits] = useState(() => {
    const localValue = localStorage.getItem("habits")

    if (localValue == null) return [];

    const savedHabits = JSON.parse(localValue);
    return savedHabits.map((habit) => ({
      ...habit,
      completedDates: habit.completedDates.map((date) => new Date(date)),
      }));
  });
  

  const [currentDate, setCurrentDate] = useState(() => {
    const savedDate = localStorage.getItem("currentDate");
    return savedDate ? new Date(savedDate) : new Date();
  });

  


  useEffect(() => {
      localStorage.setItem("habits", JSON.stringify(habits))
    }, [habits]);


  useEffect(() => {
    const today = new Date();
    const savedDate = new Date(localStorage.getItem("currentDate"));
  
    if (savedDate.toDateString() !== today.toDateString()) {
      resetHabits();
      localStorage.setItem("currentDate", today);
      setCurrentDate(today);
    }
  }, []);



  function handleNewDayClick(){
    const today = new Date();
    const savedDate = new Date(localStorage.getItem("currentDate"));
  
    if (savedDate.toDateString() !== today.toDateString()) {
      resetHabits();
      localStorage.setItem("currentDate", today);
      setCurrentDate(today);
    }
  }


  function resetHabits(){
    setHabits((prevHabits) =>
      prevHabits.map((habit) => ({ ...habit, completed: false }))
    );
  }



  function toggleAddFormDisplay(){
    setAddFormOpen(isAddFormOpen => !isAddFormOpen);
  }

  function addHabit(newHabit){
    setHabits([...habits, newHabit]);
  }  

  
  function openEditForm(habit) {
    setEditingHabit(habit);
  }

  function closeEditForm() {
    setEditingHabit(null);
  }

  function editHabit(editedHabit){
    setHabits(habits => habits.map(habit => 
      habit.id === editedHabit.id ? {...editedHabit} : habit
    ))
  }
  

  return (
    <>
      <h1>Habit Tracker</h1>
      <p className='current-date'>Current Date: {currentDate.toDateString()}</p>

      {isAddFormOpen && <AddHabitForm addHabit={addHabit} toggleAddFormDisplay={toggleAddFormDisplay} isAddFormOpen={isAddFormOpen}/>}
      
      <button className={`toggle-add-form-btn ${isAddFormOpen ? "form-open" : ""}`} onClick={() => toggleAddFormDisplay(isAddFormOpen)}>
        Add New Habit
      </button>

      <button className='new-day-btn' onClick={handleNewDayClick}>New Day</button>
      
      {editingHabit && <EditHabitForm habit={editingHabit} editHabit={editHabit} closeForm={closeEditForm}/>}
      
      <HabitList habits={habits} setHabits={setHabits} openEditForm={openEditForm}></HabitList>
    </>
  )
}

export default App
