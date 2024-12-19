import {useState, useEffect, useRef} from "react";

function EditHabitForm({habit, editHabit, closeForm}){

    const [habitName, setHabitName] = useState(habit.name);
    const [habitGoal,setHabitGoal] = useState(habit.goal);

    const textAreaRef = useRef(null);


    const adjustHeight = () => {
      if (textAreaRef.current) {
        textAreaRef.current.style.height = "1.5em";
        textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
      }
    };
  
    useEffect(() => {
      adjustHeight();
    }, [habitName]);

    function submitForm(event){
        event.preventDefault();

        const updatedHabit = { ...habit, name: habitName, goal: habitGoal};

        editHabit(updatedHabit);

        closeForm();
    }

    return(
        <>
        <div className="modal-overlay" onClick={closeForm}></div>
        <div className="modal-window">
        <h2>Edit Habit</h2>
        <form className="edit-form" onSubmit={submitForm}>
            <div className="form-group">
                <label htmlFor="habit-name">Habit: </label>
                <textarea id="habit-name"
                value={habitName} 
                ref={textAreaRef}
                onChange={event => setHabitName(event.target.value)}
                style={{ resize: "none", overflow: "hidden", height: "1.5em"}}
                onInput={adjustHeight}>
                </textarea>
            </div>
            
            <div className="form-group">
            <label htmlFor="habit-goal">Goal: </label>
            <select id="habit-goal" value={habitGoal} onChange={event => setHabitGoal(event.target.value)}>
                <option value="daily">daily</option>
                <option value="every other day">every other day</option>
                <option value="every two days">every two days</option>
                <option value="weekly">weekly</option>
            </select>
            </div>
            
            <div style={{ marginTop: "0.5em" }}>
                <button type="submit">Save Changes</button>
                <button onClick={closeForm} style={{ marginLeft: "10px" }}>Cancel</button>
            </div>
       </form>
    </div>
        </>
    );
}

export default EditHabitForm