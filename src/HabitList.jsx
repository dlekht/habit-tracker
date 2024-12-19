import {useState} from "react";
import HabitItem from "./HabitItem";

function HabitList({habits, setHabits, openEditForm}){

    const [selectedHabit, setSelectedHabit] = useState(null);

    function handleDragStart(event, index){
        event.dataTransfer.setData("text/plain", index);
    }
    
    function handleDrop(event, dropIndex){
        event.preventDefault();
        event.currentTarget.classList.remove("drag-over");

        const dragIndex = event.dataTransfer.getData("text/plain");
        if (dragIndex === dropIndex) return;
    
        const updatedHabits = [...habits];
        [updatedHabits[dragIndex], updatedHabits[dropIndex]] = [updatedHabits[dropIndex], updatedHabits[dragIndex]];
    
        setHabits(updatedHabits);
    }
    
    function handleDragOver(event){
        event.preventDefault();
        event.currentTarget.classList.add("drag-over");
    }

    function handleDragLeave(event){
        event.currentTarget.classList.remove("drag-over"); 
    }


    return(
        <ol className="habits-list">
            {habits.map((habit, index) => 
            
            <HabitItem key={habit.id} 
            habit={habit}
            habitIndex={index}
            selectedHabit={selectedHabit}
            handlers={{
                setHabits,
                openEditForm,
                handleDragStart,
                handleDragOver,
                handleDrop,
                handleDragLeave,
                setSelectedHabit
              }}>
            </HabitItem>
            )}
    </ol>
    );
}

export default HabitList