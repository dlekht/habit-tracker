import { useState } from "react";

function AddHabitForm({addHabit, toggleAddFormDisplay}){

    const [habitName, setHabitName] = useState("");
    const [habitGoal,setHabitGoal] = useState("daily");

    function saveHabitName(event){
        setHabitName(event.target.value);
    }

    function saveHabitGoal(event){
        setHabitGoal(event.target.value);
    }


    function submitForm(event){
        event.preventDefault();

        if(habitName.trim() !== ""){
            const newHabit = { id: crypto.randomUUID(), name: habitName, goal: habitGoal, completed: false, completedDates: [], streak: 0};

            addHabit(newHabit);
    
            setHabitName("");
        }
    }

    return(
       <form className="add-form" onSubmit={submitForm}>
            <div className="form-group">
                <label htmlFor="habit-name">Habit: </label>
                <textarea id="habit-name"
                value={habitName}
                onChange={saveHabitName}
                placeholder="...exercise, drink more water"
                rows="1" 
                style={{ resize: "none", overflow: "hidden", height: "2.5em" }}
                onInput={(event) => {
                    event.target.style.height = "2.5em";
                    event.target.style.height = event.target.scrollHeight + "px";
                }}>
                </textarea>
            </div>
            <div className="form-group">
                <label htmlFor="habit-goal">Goal: </label>
                <select id="habit-goal" onChange={saveHabitGoal}>
                    <option value="daily">daily</option>
                    <option value="every other day">every other day</option>
                    <option value="every two days">every two days</option>
                    <option value="weekly">weekly</option>
                </select>
            </div>
            <div className="add-form-btns">
                <button  type="submit">Add Habit</button>
                <button onClick={(isAddFormOpen) => toggleAddFormDisplay(isAddFormOpen)}>Close</button>
            </div>
       </form>
    );
}

export default AddHabitForm