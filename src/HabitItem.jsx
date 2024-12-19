import HabitCalendar from "./HabitCalendar";

function HabitItem({habit, habitIndex, selectedHabit, handlers}){

  const {setHabits, openEditForm, handleDragStart, handleDragOver, handleDrop, handleDragLeave, setSelectedHabit} = handlers;
  
  function toggleHabit(id, completed) {
    setHabits((habits) =>
      habits.map((habit) =>
        habit.id === id ? updateHabit(habit, completed) : habit
      )
    );
  }

  function updateHabit(habit, completed) {
    const today = new Date().toDateString();
    const updatedDates = completed
                        ? [...habit.completedDates, today]
                        : habit.completedDates.filter((date) => date !== today);
  
    return {
      ...habit,
      completed,
      completedDates: updatedDates,
      streak: habit.goal === "daily" ? calculateStreak(updatedDates) : 0,
    };
  }

  function calculateStreak(completedDates) {
    if (!completedDates.length) return 0;
      
    const sortedDates = [...completedDates].map((date) => 
      new Date(date).toDateString()).sort((a, b) => new Date(a) - new Date(b));

    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 1000 * 60 * 60 * 24).toDateString();
    const hasToday = sortedDates.includes(today);
    const datesToCheck = hasToday ? sortedDates.slice(0, -1) : sortedDates;

    if (!datesToCheck.length) return hasToday ? 1 : 0;
    
    const lastDate = datesToCheck[datesToCheck.length - 1];
    if (new Date(lastDate).toDateString() !== yesterday){
      return hasToday ? 1 : 0;
    }

    let streak = hasToday ? 1 : 0;
    for (let i = datesToCheck.length - 1; i > 0; i--){
      const currentDate = new Date(datesToCheck[i]);
      const previousDate = new Date(datesToCheck[i - 1]);

      if ((currentDate - previousDate) / (1000 * 60 * 60 * 24) === 1) {
        streak++;
      } else {
        break;
      }
    }
    return streak + 1;
  }

  function deleteHabit(id){
    setHabits(habits => habits.filter(habit => habit.id !== id));
  }

  function toggleCalendarVisibility(habit) {
    setSelectedHabit((selectedHabit) =>
      selectedHabit && selectedHabit.name === habit.name ? null : habit);
  }


  return(
    <li className={`habit-item ${habit.completed ? "completed" : ""}`} draggable
    onDragStart={(event) => handleDragStart(event, habitIndex)}
    onDragOver={handleDragOver}
    onDragLeave={handleDragLeave}
    onDrop={(event) => handleDrop(event, habitIndex)}>
      <p> 
          <span className="habit-name">
          {habit.name}
          </span>
          <span className="habit-goal"> 
              Goal: {habit.goal}
          </span>
          <span className="habit-streak">
          {habit.goal === "daily" && `Streak: ${habit.streak} days`}
          </span>
        </p>
      <input type="checkbox" checked={habit.completed} onChange={(event) => toggleHabit(habit.id, event.target.checked)}></input>
      <div className="habit-item-btns">
          <button onClick={() => deleteHabit(habit.id)}>Delete</button>
          <button onClick={() => 
              openEditForm(habit)
          }>Edit</button>
          <button onClick={() => toggleCalendarVisibility(habit)}>
              Calendar
          </button>
      </div>
      
      {selectedHabit && selectedHabit.name === habit.name && (
          <div className="calendar-container">
          <HabitCalendar habit={habit} />
          </div>
      )}
    </li>
  );
}

export default HabitItem