import { useSelector } from 'react-redux'
import { RootState } from '../store'

const useManager = () => {
    const details = useSelector((state:RootState) => state.tasks)
    
    const tasks = details.tasks
    const boards = details.boards
    const user = details.user

    const getTasksByBoardId = (boardId: string) => {
        return tasks.filter((task) => task.boardId === boardId)
    }
    
    return { tasks, boards, getTasksByBoardId, user}
}

export default useManager