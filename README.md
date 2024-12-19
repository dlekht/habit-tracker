# **Habit Tracker**
This is a simple web application (built with React) that helps you build and maintain positive habits. You can track your goals, monitor streaks and stay consistent with an intuitive design and user-friendly interface optimized for desktop and mobile devices. 

## **Features** ##
- Add and Manage Habits
  * You can create new habits with custom goals.
  * You can edit or delete existing habits if needed.

- Daily Tracking
  * You can mark habits as completed for the day.
  * You can manually reset the daily completion status at midnight with a button or by refreshing the web page.

- Progress Monitoring
  * You can view streaks for daily habits based on completion days (available only for daily habits).
  * You have a dedicated calendar view for each habit to visualize progress over time.

- Reorder Habits
  * You can drag-and-drop habits to rearrange them based on priority.

- Dynamic UI
  * Adaptive layout for desktop and mobile devices.

## **Technologies Used**
- **Frontend**: React.js, CSS
- **State Management**:
  * React's useState and useEffect for dynamic updates
  * LocalStorage for persistent habit data across sessions
- **Key Functionalities**:
  * Streak calculation logic for daily habits
  * Drag-and-drop API for reordering habits
  * React Calendar for detailed habit progress tracking

## **How It Works**
- Adding Habits:
  * Click the "Add New Habit" button, fill in the form and submit. Each habit can have a goal like "daily," "weekly," etc.

- Mark as Completed:
  * Use the checkbox to mark a habit as completed for the day. The app automatically tracks your streak for daily habits.

- Calendar View:
  * Click the "Calendar" button for a habit to see a visual representation of completed days and the same button to close the calendar.

- Reordering Habits:
  * Drag and drop habits to rearrange them according to your preferences.

- New Day Button:
  * Use the "New Day" button to reset all habits manually if required.

## Screenshots
![image](https://github.com/user-attachments/assets/d8e42351-ea18-40f6-afdc-2ea149d7114e)
![image](https://github.com/user-attachments/assets/143418a8-24bd-4e03-bf19-52ead355b96c)
![image](https://github.com/user-attachments/assets/fa522181-4ee6-488f-b7a0-072f94c4d473)
